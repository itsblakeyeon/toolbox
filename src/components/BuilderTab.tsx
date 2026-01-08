"use client";

import { useEffect, useCallback } from "react";
import { buildUTMUrl } from "@/utils/urlBuilder";
import { createEmptyRow } from "@/utils/rowFactory";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useToast } from "@/hooks/useToast";
import { useHistory } from "@/hooks/useHistory";
import BuilderTableHeader from "./BuilderTableHeader";
import UTMTableRow from "./UTMTableRow";
import Toast from "./Toast";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { STORAGE_KEYS, DEBOUNCE_DELAY, FIELDS } from "@/constants";
import type { UTMRow, UTMField, CellPosition, HistoryState, SavedItem } from "@/types";

interface BuilderTabProps {
  onSave: (items: SavedItem[]) => void;
}

function BuilderTab({ onSave }: BuilderTabProps) {
  const fields = FIELDS;

  const { toast, showToast, hideToast } = useToast();

  const [historyState, setHistoryState, { undo, redo, canUndo, canRedo }] =
    useHistory<HistoryState>(
      () => {
        if (typeof window === "undefined") {
          return {
            rows: [createEmptyRow(), createEmptyRow(), createEmptyRow()],
            editingCell: null,
          };
        }
        const saved = localStorage.getItem(STORAGE_KEYS.ROWS);
        const initialRows = (() => {
          if (saved) {
            try {
              return JSON.parse(saved) as UTMRow[];
            } catch {
              return [createEmptyRow(), createEmptyRow(), createEmptyRow()];
            }
          }
          return [createEmptyRow(), createEmptyRow(), createEmptyRow()];
        })();

        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              return {
                rows: parsed as UTMRow[],
                editingCell: null,
              };
            }
            return {
              rows: initialRows,
              editingCell: null,
            };
          } catch {
            return {
              rows: initialRows,
              editingCell: null,
            };
          }
        }
        return {
          rows: initialRows,
          editingCell: null,
        };
      },
      {
        maxHistory: 50,
        debounceMs: 500,
      }
    );

  const { rows, editingCell } = historyState;

  const setRows = (
    updaterOrValue: UTMRow[] | ((prev: UTMRow[]) => UTMRow[]),
    preserveEditingCell = true
  ) => {
    setHistoryState((prev) => {
      const prevRows = prev.rows;
      const nextRows =
        typeof updaterOrValue === "function"
          ? updaterOrValue(prevRows)
          : updaterOrValue;
      return {
        ...prev,
        rows: nextRows,
        editingCell: preserveEditingCell ? prev.editingCell : null,
      };
    });
  };

  const setEditingCell = (nextEditingCell: CellPosition | null) => {
    setHistoryState((prev) => ({
      ...prev,
      editingCell: nextEditingCell,
    }));
  };

  const deleteRow = (id: string) => {
    if (rows.length === 1) {
      showToast("At least 1 row is required!", "warning");
      return;
    }

    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) return;

    const rowsAfter = rows.filter((row) => row.id !== id);

    let targetIndex: number;
    if (index > 0) {
      targetIndex = index - 1;
    } else {
      targetIndex = 0;
    }

    if (targetIndex >= rowsAfter.length) {
      targetIndex = rowsAfter.length - 1;
    }

    setHistoryState((prev) => ({
      ...prev,
      editingCell: { rowIndex: index, field: fields[0] },
    }));

    setHistoryState((prev) => ({
      ...prev,
      rows: rowsAfter,
      editingCell: { rowIndex: targetIndex, field: fields[0] },
    }));
  };

  const toggleSelect = (id: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row
      )
    );
  };

  const {
    selectedCell,
    selectedCellRange,
    selectedRowIndex,
    selectedRange,
    setSelectedCell,
    setSelectedCellRange,
    setSelectedRowIndex,
    setSelectedRange,
    handleCellSelectionKeyDown,
    handleRowSelectionKeyDown,
    handleInputFocus,
    handleKeyDown,
    isComposing,
    onCompositionStart,
    onCompositionEnd,
  } = useKeyboardNavigation(
    rows,
    setRows,
    fields,
    deleteRow,
    toggleSelect,
    editingCell,
    setEditingCell
  );

  const handleUndo = useCallback(() => {
    undo();
    setSelectedCell(null);
    setSelectedCellRange(null);
    setSelectedRowIndex(null);
    setSelectedRange(null);
  }, [
    undo,
    setSelectedCell,
    setSelectedCellRange,
    setSelectedRowIndex,
    setSelectedRange,
  ]);

  const handleRedo = useCallback(() => {
    redo();
    setSelectedCell(null);
    setSelectedCellRange(null);
    setSelectedRowIndex(null);
    setSelectedRange(null);
  }, [
    redo,
    setSelectedCell,
    setSelectedCellRange,
    setSelectedRowIndex,
    setSelectedRange,
  ]);

  const handleCellClick = (rowIndex: number, field: UTMField) => {
    setEditingCell({ rowIndex, field });
  };

  const handleChange = (id: string, field: UTMField, value: string) => {
    let processedValue = value;
    if (
      field === "baseUrl" &&
      value &&
      !value.startsWith("http://") &&
      !value.startsWith("https://")
    ) {
      const trimmedValue = value.trim();
      if (
        trimmedValue &&
        !trimmedValue.startsWith("http://") &&
        !trimmedValue.startsWith("https://")
      ) {
        processedValue = `https://${trimmedValue}`;
      }
    }

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: processedValue } : row
      )
    );
  };

  const addRow = () => {
    const newRow = createEmptyRow();
    setHistoryState((prev) => {
      const nextRows = [...prev.rows, newRow];
      return {
        ...prev,
        rows: nextRows,
        editingCell: { rowIndex: nextRows.length - 1, field: fields[0] },
      };
    });
  };

  const handleReset = () => {
    setRows([createEmptyRow()]);
  };

  const toggleSelectAll = () => {
    const allSelected = rows.every((row) => row.selected);
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, selected: !allSelected }))
    );
  };

  const saveSelected = useCallback(() => {
    const selectedRows = rows.filter((row) => row.selected);

    if (selectedRows.length === 0) {
      showToast("Please select items to save!", "warning");
      return;
    }

    const savedItems = selectedRows
      .map((row) => {
        const fullUrl = buildUTMUrl(row);
        if (!fullUrl) return null;

        return {
          id: Date.now() + Math.random(),
          campaignName: `${row.source}-${row.medium}-${row.campaign}`,
          savedAt: Date.now(),
          comment: "",
          params: {
            source: row.source,
            medium: row.medium,
            campaign: row.campaign,
            term: row.term,
            content: row.content,
          },
          fullUrl: fullUrl,
        };
      })
      .filter((item): item is SavedItem => item !== null);

    if (savedItems.length === 0) {
      showToast("Items without URLs cannot be saved!", "warning");
      return;
    }

    onSave(savedItems);

    if (savedItems.length < selectedRows.length) {
      const skippedCount = selectedRows.length - savedItems.length;
      showToast(
        `${savedItems.length} item(s) saved. (${skippedCount} item(s) excluded due to missing URL)`,
        "success"
      );
    } else {
      showToast(`${savedItems.length} item(s) saved!`, "success");
    }
  }, [rows, onSave, showToast]);

  const copyUrl = (row: UTMRow) => {
    const url = buildUTMUrl(row);
    if (url) {
      navigator.clipboard.writeText(url);
      showToast("URL copied to clipboard!", "success");
    }
  };

  const openUrlInNewTab = (row: UTMRow) => {
    const url = buildUTMUrl(row);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      showToast("Opened in new tab!", "success");
    }
  };

  const deleteSelectedRows = () => {
    const selectedRows = rows.filter((row) => row.selected);

    if (selectedRows.length === 0) {
      showToast("Please select rows to delete!", "warning");
      return;
    }

    if (rows.length === selectedRows.length) {
      showToast("At least 1 row is required!", "warning");
      return;
    }

    const remainingRows = rows.filter((row) => !row.selected);
    setRows(remainingRows);
    showToast(`${selectedRows.length} row(s) deleted!`, "success");
  };

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.ROWS, JSON.stringify(rows));
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [rows]);

  // Focus management after undo/redo
  useEffect(() => {
    if (!editingCell) return;
    const { rowIndex, field } = editingCell;
    if (rowIndex == null || !field) return;

    requestAnimationFrame(() => {
      const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
      const input = document.querySelector(selector) as HTMLInputElement;
      if (input) {
        input.focus();
        const length = input.value?.length ?? 0;
        input.setSelectionRange(length, length);
      }
    });
  }, [editingCell]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDownGlobal = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        if (canUndo) {
          handleUndo();
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        if (canRedo) {
          handleRedo();
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        e.stopPropagation();
        saveSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDownGlobal, true);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal, true);
  }, [canUndo, canRedo, handleUndo, handleRedo, saveSelected]);

  const hasSelectedRows = rows.some((row) => row.selected);
  const allSelected = rows.length > 0 && rows.every((row) => row.selected);

  return (
    <div className="max-w-full mx-auto p-6">
      {/* Control buttons */}
      <div className="mb-4 flex gap-3 items-center">
        <button
          onClick={handleReset}
          className="glass-button text-gray-300 hover:text-white px-4 py-2 rounded-xl font-medium shadow-lg"
          title="Delete all data"
        >
          Reset All
        </button>

        <div className="flex-1"></div>

        <button
          onClick={toggleSelectAll}
          className="glass-button glass-button-purple text-white px-4 py-2 rounded-xl font-medium shadow-lg"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <button
          onClick={saveSelected}
          disabled={!hasSelectedRows}
          className={`glass-button text-white px-4 py-2 rounded-xl font-medium shadow-lg ${
            !hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Save selected items (⌘S)"
        >
          Save Selected
        </button>

        <button
          onClick={deleteSelectedRows}
          disabled={!hasSelectedRows}
          className={`glass-button glass-button-red text-white px-4 py-2 rounded-xl font-medium shadow-lg ${
            !hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Delete selected rows (Delete)"
        >
          Delete Selected
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl glass-strong shadow-2xl">
        <table className="w-full table-fixed">
          <BuilderTableHeader
            allSelected={rows.length > 0 && rows.every((row) => row.selected)}
            onToggleSelectAll={toggleSelectAll}
          />
          <tbody>
            {rows.map((row, index) => (
              <UTMTableRow
                key={row.id}
                row={row}
                index={index}
                editingCell={editingCell}
                selectedCell={selectedCell}
                selectedCellRange={selectedCellRange}
                selectedRowIndex={selectedRowIndex}
                selectedRange={selectedRange}
                onToggleSelect={toggleSelect}
                onChange={handleChange}
                onInputFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                onCellSelectionKeyDown={handleCellSelectionKeyDown}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onCopyUrl={copyUrl}
                onTestUrl={openUrlInNewTab}
                onRowSelectionKeyDown={handleRowSelectionKeyDown}
                onCellClick={handleCellClick}
              />
            ))}
          </tbody>
        </table>

        {/* Add row button */}
        <button
          onClick={addRow}
          className="w-full py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-b-2xl flex items-center justify-center border-t border-white/10"
          aria-label="Add row"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Keyboard shortcuts guide */}
      <KeyboardShortcuts
        shortcuts={[
          {
            category: "Edit",
            items: [
              { key: "⌘/Ctrl + Z", description: "Undo" },
              { key: "⌘/Ctrl + Shift + Z", description: "Redo" },
              { key: "⌘/Ctrl + C", description: "Copy row" },
              { key: "⌘/Ctrl + V", description: "Paste row" },
            ],
          },
          {
            category: "Navigation",
            items: [
              { key: "← → ↑ ↓", description: "Move cells" },
              { key: "Enter", description: "Move to row below" },
              { key: "ESC", description: "Switch mode" },
            ],
          },
          {
            category: "Selection & Actions",
            items: [
              { key: "Shift + Arrow keys", description: "Range selection" },
              { key: "Space", description: "Toggle checkbox" },
              { key: "Delete", description: "Delete selected rows" },
              { key: "⌘/Ctrl + S", description: "Save selected items" },
            ],
          },
        ]}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default BuilderTab;
