"use client";

import { useState, useEffect } from "react";
import { useRowClipboard } from "./useRowClipboard";
import type { UTMRow, UTMField, RowRange } from "@/types";

interface UseRowSelectionReturn {
  selectedRowIndex: number | null;
  selectedRange: RowRange | null;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedRange: React.Dispatch<React.SetStateAction<RowRange | null>>;
  handleRowSelectionKeyDown: (e: React.KeyboardEvent, rowIndex: number) => void;
}

/**
 * Hook for managing row selection state
 */
export const useRowSelection = (
  rows: UTMRow[],
  setRows: (updater: UTMRow[] | ((prev: UTMRow[]) => UTMRow[])) => void,
  onDeleteRow: (id: string) => void,
  onToggleSelect: (id: string) => void,
  showToast: (message: string, type: "success" | "warning" | "error") => void,
  focusCell: (rowIndex: number, field: UTMField) => void,
  lastFocusedField: UTMField
): UseRowSelectionReturn => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedRange, setSelectedRange] = useState<RowRange | null>(null);

  const { copyRow, copyRows, pasteRows } = useRowClipboard();

  useEffect(() => {
    if (selectedRowIndex !== null) {
      requestAnimationFrame(() => {
        const rowElement = document.querySelector(
          `tr[data-row-index="${selectedRowIndex}"]`
        );
        if (rowElement) {
          (rowElement as HTMLElement).focus();
        }
      });
    }
  }, [selectedRowIndex, selectedRange]);

  const handleRowSelectionKeyDown = (e: React.KeyboardEvent, rowIndex: number) => {
    if (!e || !e.key) return;

    // Shift + ArrowUp/Down: Range selection
    if (e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      const startIndex = selectedRange ? selectedRange.start : rowIndex;
      let endIndex = rowIndex;

      if (e.key === "ArrowUp") {
        endIndex = Math.max(0, rowIndex - 1);
      } else if (e.key === "ArrowDown") {
        endIndex = Math.min(rows.length - 1, rowIndex + 1);
      }

      setSelectedRange({ start: startIndex, end: endIndex });
      setSelectedRowIndex(endIndex);
      return;
    }

    // Space: Toggle checkbox
    if (e.key === " ") {
      e.preventDefault();
      if (onToggleSelect) {
        if (selectedRange) {
          const minIndex = Math.min(selectedRange.start, selectedRange.end);
          const maxIndex = Math.max(selectedRange.start, selectedRange.end);
          const rangeRows = rows.slice(minIndex, maxIndex + 1);
          const allSelected = rangeRows.every((row) => row.selected);

          rangeRows.forEach((row) => {
            if (allSelected && row.selected) {
              onToggleSelect(row.id);
            } else if (!allSelected && !row.selected) {
              onToggleSelect(row.id);
            }
          });
        } else {
          onToggleSelect(rows[rowIndex].id);
        }
      }
      return;
    }

    // ArrowUp/Down: Move rows
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const delta = e.key === "ArrowUp" ? -1 : 1;
      const boundCheck =
        e.key === "ArrowUp"
          ? (idx: number) => idx > 0
          : (idx: number) => idx < rows.length - 1;

      if (selectedRange) {
        const startIndex = selectedRange.start;
        if (boundCheck(startIndex)) {
          setSelectedRowIndex(startIndex + delta);
          setSelectedRange(null);
        }
      } else if (boundCheck(rowIndex)) {
        setSelectedRowIndex(rowIndex + delta);
      }
    }
    // Delete or Backspace: Delete rows
    else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      if (selectedRange) {
        const minIndex = Math.min(selectedRange.start, selectedRange.end);
        const maxIndex = Math.max(selectedRange.start, selectedRange.end);
        const deleteCount = maxIndex - minIndex + 1;

        // If deleting all rows, clear content of first row instead
        if (rows.length - deleteCount < 1) {
          setRows((prevRows: UTMRow[]) => [{
            ...prevRows[0],
            baseUrl: "",
            source: "",
            medium: "",
            campaign: "",
            term: "",
            content: "",
            selected: false,
          }]);
          setSelectedRange(null);
          setSelectedRowIndex(0);
          return;
        }

        setRows((prevRows: UTMRow[]) =>
          prevRows.filter((_, idx) => idx < minIndex || idx > maxIndex)
        );

        showToast(`${deleteCount} row(s) deleted!`, "success");

        setSelectedRange(null);
        const newRowCount = rows.length - deleteCount;
        if (newRowCount > 0) {
          const newIndex = Math.min(minIndex, newRowCount - 1);

          requestAnimationFrame(() => {
            setSelectedRowIndex(newIndex);
            setTimeout(() => {
              const rowElement = document.querySelector(
                `tr[data-row-index="${newIndex}"]`
              );
              if (rowElement) {
                (rowElement as HTMLElement).focus();
              }
            }, 0);
          });
        } else {
          setSelectedRowIndex(null);
        }
      } else {
        // Call onDeleteRow - it handles clearing content for last row
        onDeleteRow(rows[rowIndex].id);

        if (rows.length > 1) {
          showToast("Row deleted!", "success");

          const newFocusIndex = rowIndex > 0 ? rowIndex - 1 : 0;

          requestAnimationFrame(() => {
            setSelectedRowIndex(newFocusIndex);
            setTimeout(() => {
              const rowElement = document.querySelector(
                `tr[data-row-index="${newFocusIndex}"]`
              );
              if (rowElement) {
                (rowElement as HTMLElement).focus();
              }
            }, 0);
          });
        }
      }
    }
    // Cmd/Ctrl + C: Copy rows
    else if ((e.metaKey || e.ctrlKey) && e.key === "c") {
      e.preventDefault();
      if (selectedRange) {
        const minIndex = Math.min(selectedRange.start, selectedRange.end);
        const maxIndex = Math.max(selectedRange.start, selectedRange.end);
        const rowsToCopy = rows.slice(minIndex, maxIndex + 1);
        if (copyRows(rowsToCopy)) {
          showToast(`${rowsToCopy.length} row(s) copied!`, "success");
        }
      } else {
        if (copyRow(rows[rowIndex])) {
          showToast("Row copied!", "success");
        }
      }
    }
    // Cmd/Ctrl + V: Paste rows
    else if ((e.metaKey || e.ctrlKey) && e.key === "v") {
      e.preventDefault();
      const result = pasteRows(rows, rowIndex);
      if (result.success && result.newRows) {
        setRows(result.newRows);
        if (result.insertedIndex !== undefined) {
          setSelectedRowIndex(result.insertedIndex);
        }
        showToast("Row(s) pasted!", "success");
      }
    }
    // Enter or other keys: Exit row selection mode
    else if (e.key === "Enter" || e.key.length === 1) {
      e.preventDefault();
      setSelectedRowIndex(null);
      focusCell(rowIndex, lastFocusedField);
    }
    // ESC: Exit row selection mode
    else if (e.key === "Escape") {
      e.preventDefault();
      setSelectedRowIndex(null);
      setSelectedRange(null);
      focusCell(rowIndex, lastFocusedField);
    }
  };

  return {
    selectedRowIndex,
    selectedRange,
    setSelectedRowIndex,
    setSelectedRange,
    handleRowSelectionKeyDown,
  };
};
