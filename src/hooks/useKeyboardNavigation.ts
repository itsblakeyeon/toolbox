"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { createEmptyRow } from "@/utils/rowFactory";
import { useRowClipboard } from "./useRowClipboard";
import { useToast } from "./useToast";
import { useCellSelection } from "./useCellSelection";
import { useRowSelection } from "./useRowSelection";
import type { UTMRow, UTMField, CellPosition, CellRange, RowRange } from "@/types";

interface UseKeyboardNavigationReturn {
  selectedCell: CellPosition | null;
  selectedCellRange: CellRange | null;
  selectedRowIndex: number | null;
  selectedRange: RowRange | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CellPosition | null>>;
  setSelectedCellRange: React.Dispatch<React.SetStateAction<CellRange | null>>;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedRange: React.Dispatch<React.SetStateAction<RowRange | null>>;
  handleCellSelectionKeyDown: (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => void;
  handleRowSelectionKeyDown: (e: React.KeyboardEvent, rowIndex: number) => void;
  handleInputFocus: (field: UTMField, rowIndex: number) => void;
  handleKeyDown: (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => void;
  isComposing: boolean;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  focusCell: (rowIndex: number, field: UTMField) => void;
}

/**
 * Custom hook for keyboard navigation logic
 */
export const useKeyboardNavigation = (
  rows: UTMRow[],
  setRows: (updater: UTMRow[] | ((prev: UTMRow[]) => UTMRow[])) => void,
  fields: UTMField[],
  onDeleteRow: (id: string) => void,
  onToggleSelect: (id: string) => void,
  editingCell: CellPosition | null,
  setEditingCell: (cell: CellPosition | null) => void
): UseKeyboardNavigationReturn => {
  const [lastFocusedField, setLastFocusedField] = useState<UTMField>("baseUrl");
  const [isComposing, setIsComposing] = useState(false);

  const { showToast } = useToast();
  const { copyRow } = useRowClipboard();

  const focusCell = (rowIndex: number, field: UTMField) => {
    if (rowIndex < 0) return;

    const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
    const nextInput = document.querySelector(selector) as HTMLInputElement;

    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  };

  const {
    selectedCell,
    selectedCellRange,
    setSelectedCell,
    setSelectedCellRange,
    handleCellSelectionKeyDown,
  } = useCellSelection(rows, setRows, fields, showToast, setEditingCell);

  const {
    selectedRowIndex,
    selectedRange,
    setSelectedRowIndex,
    setSelectedRange,
    handleRowSelectionKeyDown,
  } = useRowSelection(
    rows,
    setRows,
    onDeleteRow,
    onToggleSelect,
    showToast,
    focusCell,
    lastFocusedField
  );

  const wrappedCellSelectionKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setSelectedCell(null);
      setSelectedCellRange(null);
      setSelectedRowIndex(rowIndex);
      setSelectedRange(null);

      requestAnimationFrame(() => {
        const rowElement = document.querySelector(
          `tr[data-row-index="${rowIndex}"]`
        );
        if (rowElement) {
          (rowElement as HTMLElement).focus();
        }
      });
      return;
    }

    handleCellSelectionKeyDown(e, rowIndex, field);
  };

  const handleInputFocus = (field: UTMField, rowIndex: number) => {
    setSelectedRowIndex(null);
    setSelectedCell(null);
    setSelectedCellRange(null);
    setEditingCell({ rowIndex, field });
    setLastFocusedField(field);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => {
    if (!e || !e.target) return;

    const input = e.target as HTMLInputElement;
    const cursorAtStart = input.selectionStart === 0;
    const cursorAtEnd = input.selectionStart === input.value.length;

    // ESC: Exit edit mode → Cell selection mode
    if (e.key === "Escape") {
      e.preventDefault();

      const isEditingMode =
        editingCell &&
        editingCell.rowIndex === rowIndex &&
        editingCell.field === field;

      const isCurrentCellSelected =
        selectedCell &&
        selectedCell.rowIndex === rowIndex &&
        selectedCell.field === field;

      if (isEditingMode) {
        setEditingCell(null);
        setSelectedCell({ rowIndex, field });
        setSelectedCellRange(null);
        setSelectedRowIndex(null);
        setSelectedRange(null);
      } else if (isCurrentCellSelected) {
        setSelectedCell(null);
        setSelectedCellRange(null);
        setSelectedRowIndex(rowIndex);
        setSelectedRange(null);
      }
      return;
    }

    // Shift + Arrow: Cell range selection
    if (
      e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey &&
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      const hasSelection = input.selectionStart !== input.selectionEnd;
      if (hasSelection) {
        if (e.key === "ArrowLeft" && !cursorAtStart) {
          return;
        }
        if (e.key === "ArrowRight" && !cursorAtEnd) {
          return;
        }
      }

      if (e.key === "ArrowLeft" && !cursorAtStart) {
        return;
      }
      if (e.key === "ArrowRight" && !cursorAtEnd) {
        return;
      }

      e.preventDefault();

      setEditingCell(null);

      const startCell: CellPosition = { rowIndex, field };
      let endCell: CellPosition = { ...startCell };

      if (e.key === "ArrowUp") {
        endCell = { rowIndex: Math.max(0, rowIndex - 1), field };
      } else if (e.key === "ArrowDown") {
        endCell = { rowIndex: Math.min(rows.length - 1, rowIndex + 1), field };
      } else if (e.key === "ArrowLeft") {
        const currentFieldIndex = fields.indexOf(field);
        if (currentFieldIndex > 0) {
          endCell = { rowIndex, field: fields[currentFieldIndex - 1] };
        }
      } else if (e.key === "ArrowRight") {
        const currentFieldIndex = fields.indexOf(field);
        if (currentFieldIndex < fields.length - 1) {
          endCell = { rowIndex, field: fields[currentFieldIndex + 1] };
        }
      }

      setSelectedCellRange({ start: startCell, end: endCell });
      setSelectedCell(endCell);

      setSelectedRowIndex(null);
      setSelectedRange(null);

      return;
    }

    // Cmd/Ctrl + C: Copy row
    if ((e.metaKey || e.ctrlKey) && e.key === "c") {
      const hasSelection = input.selectionStart !== input.selectionEnd;
      if (hasSelection) {
        return;
      }
      e.preventDefault();
      if (copyRow(rows[rowIndex])) {
        showToast("Row copied!", "success");
      }
      return;
    }

    // Enter: Move to next row
    if (e.key === "Enter") {
      if (isComposing) return;

      e.preventDefault();

      if (rowIndex === rows.length - 1) {
        flushSync(() => {
          const newRow = createEmptyRow();
          setRows((prevRows: UTMRow[]) => [...prevRows, newRow]);
        });

        requestAnimationFrame(() => {
          focusCell(rowIndex + 1, field);
        });
      } else {
        focusCell(rowIndex + 1, field);
      }
    }
    // ArrowDown: Move to row below
    else if (e.key === "ArrowDown") {
      if (isComposing) return;

      e.preventDefault();
      focusCell(rowIndex + 1, field);
    }
    // ArrowUp: Move to row above
    else if (e.key === "ArrowUp") {
      if (isComposing) return;

      e.preventDefault();
      focusCell(rowIndex - 1, field);
    }
    // ArrowRight: Move to right column
    else if (e.key === "ArrowRight" && cursorAtEnd) {
      e.preventDefault();
      const currentFieldIndex = fields.indexOf(field);
      if (currentFieldIndex < fields.length - 1) {
        focusCell(rowIndex, fields[currentFieldIndex + 1]);
      }
    }
    // ArrowLeft: Move to left column
    else if (e.key === "ArrowLeft" && cursorAtStart) {
      e.preventDefault();
      const currentFieldIndex = fields.indexOf(field);
      if (currentFieldIndex > 0) {
        focusCell(rowIndex, fields[currentFieldIndex - 1]);
      }
    }
  };

  return {
    selectedCell,
    selectedCellRange,
    selectedRowIndex,
    selectedRange,
    setSelectedCell,
    setSelectedCellRange,
    setSelectedRowIndex,
    setSelectedRange,
    handleCellSelectionKeyDown: wrappedCellSelectionKeyDown,
    handleRowSelectionKeyDown,
    handleInputFocus,
    handleKeyDown,
    isComposing,
    onCompositionStart: () => setIsComposing(true),
    onCompositionEnd: () => setIsComposing(false),
    focusCell,
  };
};
