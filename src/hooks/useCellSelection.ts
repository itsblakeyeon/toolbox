"use client";

import { useState, useEffect, useRef } from "react";
import type { UTMRow, UTMField, CellPosition, CellRange } from "@/types";

interface UseCellSelectionReturn {
  selectedCell: CellPosition | null;
  selectedCellRange: CellRange | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CellPosition | null>>;
  setSelectedCellRange: React.Dispatch<React.SetStateAction<CellRange | null>>;
  handleCellSelectionKeyDown: (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => void;
}

/**
 * Hook for managing cell selection state
 */
export const useCellSelection = (
  rows: UTMRow[],
  setRows: (updater: (prev: UTMRow[]) => UTMRow[]) => void,
  fields: UTMField[],
  showToast: (message: string, type: "success" | "warning" | "error") => void,
  setEditingCell: (cell: CellPosition | null) => void
): UseCellSelectionReturn => {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [selectedCellRange, setSelectedCellRange] = useState<CellRange | null>(
    null
  );
  const selectedCellRangeRef = useRef(selectedCellRange);

  useEffect(() => {
    selectedCellRangeRef.current = selectedCellRange;
  }, [selectedCellRange]);

  const handleCellSelectionKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => {
    if (!e || !e.key) return;

    // Cmd/Ctrl + A: Select all cells
    if ((e.metaKey || e.ctrlKey) && e.key === "a") {
      e.preventDefault();
      if (rows.length === 0) return;
      setSelectedCellRange({
        start: { rowIndex: 0, field: fields[0] },
        end: { rowIndex: rows.length - 1, field: fields[fields.length - 1] },
      });
      setSelectedCell({ rowIndex: 0, field: fields[0] });
      return;
    }

    // Shift + Arrow: Cell range selection
    if (
      e.shiftKey &&
      (e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight")
    ) {
      e.preventDefault();
      const currentRange = selectedCellRangeRef.current;
      const startCell: CellPosition = currentRange
        ? currentRange.start
        : { rowIndex, field };
      let endCell: CellPosition = { rowIndex, field };

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
      return;
    }

    // Delete or Backspace: Delete cell values
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      const currentRange = selectedCellRangeRef.current;
      if (currentRange) {
        const minRow = Math.min(
          currentRange.start.rowIndex,
          currentRange.end.rowIndex
        );
        const maxRow = Math.max(
          currentRange.start.rowIndex,
          currentRange.end.rowIndex
        );
        const startFieldIndex = fields.indexOf(currentRange.start.field);
        const endFieldIndex = fields.indexOf(currentRange.end.field);
        const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
        const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);

        setRows((prevRows) =>
          prevRows.map((row, idx) => {
            if (idx >= minRow && idx <= maxRow) {
              const updatedRow = { ...row };
              for (let i = minFieldIndex; i <= maxFieldIndex; i++) {
                (updatedRow as Record<string, unknown>)[fields[i]] = "";
              }
              return updatedRow;
            }
            return row;
          })
        );
      } else {
        setRows((prevRows) =>
          prevRows.map((row, idx) =>
            idx === rowIndex
              ? { ...row, [field]: "" }
              : row
          )
        );
      }
      return;
    }

    // Cmd/Ctrl + C: Copy cell values
    if ((e.metaKey || e.ctrlKey) && e.key === "c") {
      e.preventDefault();
      const currentRange = selectedCellRangeRef.current;
      if (currentRange) {
        const minRow = Math.min(
          currentRange.start.rowIndex,
          currentRange.end.rowIndex
        );
        const maxRow = Math.max(
          currentRange.start.rowIndex,
          currentRange.end.rowIndex
        );
        const startFieldIndex = fields.indexOf(currentRange.start.field);
        const endFieldIndex = fields.indexOf(currentRange.end.field);
        const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
        const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);

        const cellValues: string[] = [];
        for (let r = minRow; r <= maxRow; r++) {
          const rowValues: string[] = [];
          for (let f = minFieldIndex; f <= maxFieldIndex; f++) {
            const fieldKey = fields[f];
            const row = rows[r];
            rowValues.push(row[fieldKey] || "");
          }
          cellValues.push(rowValues.join("\t"));
        }
        const textToCopy = cellValues.join("\n");
        navigator.clipboard.writeText(textToCopy);
        showToast("Cell range copied to clipboard!", "success");
      } else {
        const cellValue = rows[rowIndex][field] || "";
        navigator.clipboard.writeText(cellValue);
        showToast("Cell value copied to clipboard!", "success");
      }
      return;
    }

    // Cmd/Ctrl + V: Paste cell values
    if ((e.metaKey || e.ctrlKey) && e.key === "v") {
      e.preventDefault();
      navigator.clipboard
        .readText()
        .then((text) => {
          if (!text) return;

          const lines = text.split("\n").filter((line) => line.trim());
          if (lines.length === 0) return;

          const currentRange = selectedCellRangeRef.current;
          // 시작 위치: 범위의 가장 왼쪽 위 셀
          const startRow = currentRange
            ? Math.min(currentRange.start.rowIndex, currentRange.end.rowIndex)
            : rowIndex;
          const startFieldIdx = currentRange
            ? Math.min(
                fields.indexOf(currentRange.start.field),
                fields.indexOf(currentRange.end.field)
              )
            : fields.indexOf(field);
          const startField = fields[startFieldIdx];
          const startFieldIndex = startFieldIdx;

          // 붙여넣을 영역의 끝 위치 계산
          const maxColCount = Math.max(
            ...lines.map((line) => line.split("\t").length)
          );
          const endRowIndex = startRow + lines.length - 1;
          const endFieldIndex = Math.min(
            startFieldIndex + maxColCount - 1,
            fields.length - 1
          );

          setRows((prevRows) => {
            const newRows = [...prevRows];
            lines.forEach((line, lineIndex) => {
              const values = line.split("\t");
              const targetRowIndex = startRow + lineIndex;

              if (targetRowIndex < newRows.length) {
                values.forEach((value, colIndex) => {
                  const targetFieldIndex = startFieldIndex + colIndex;
                  if (targetFieldIndex < fields.length) {
                    newRows[targetRowIndex] = {
                      ...newRows[targetRowIndex],
                      [fields[targetFieldIndex]]: value.trim(),
                    };
                  }
                });
              }
            });
            return newRows;
          });

          // 붙여넣은 영역 전체를 선택 상태로 설정
          const isMultipleCells = lines.length > 1 || maxColCount > 1;
          if (isMultipleCells) {
            setSelectedCellRange({
              start: { rowIndex: startRow, field: startField },
              end: { rowIndex: endRowIndex, field: fields[endFieldIndex] },
            });
            setSelectedCell({ rowIndex: startRow, field: startField });
          } else {
            setSelectedCell({ rowIndex: startRow, field: startField });
            setSelectedCellRange(null);
          }

          showToast("Pasted!", "success");
        })
        .catch(() => {
          showToast("Failed to read clipboard!", "error");
        });
      return;
    }

    // Arrow keys: Navigate to adjacent cells
    const arrowKeys: Record<
      string,
      {
        rowDelta: number;
        fieldDelta: number;
        rowBoundCheck?: (r: number) => boolean;
        fieldBoundCheck?: (f: number) => boolean;
      }
    > = {
      ArrowUp: { rowDelta: -1, fieldDelta: 0, rowBoundCheck: (r) => r > 0 },
      ArrowDown: {
        rowDelta: 1,
        fieldDelta: 0,
        rowBoundCheck: (r) => r < rows.length - 1,
      },
      ArrowLeft: {
        rowDelta: 0,
        fieldDelta: -1,
        fieldBoundCheck: (f) => f > 0,
      },
      ArrowRight: {
        rowDelta: 0,
        fieldDelta: 1,
        fieldBoundCheck: (f) => f < fields.length - 1,
      },
    };

    const arrowConfig = arrowKeys[e.key];
    if (arrowConfig) {
      e.preventDefault();
      const currentRange = selectedCellRangeRef.current;

      if (currentRange) {
        const startRow = currentRange.start.rowIndex;
        const startField = currentRange.start.field;
        const startFieldIndex = fields.indexOf(startField);

        const newRow = startRow + arrowConfig.rowDelta;
        const newFieldIndex = startFieldIndex + arrowConfig.fieldDelta;

        const canMoveRow = arrowConfig.rowBoundCheck
          ? arrowConfig.rowBoundCheck(startRow)
          : true;
        const canMoveField = arrowConfig.fieldBoundCheck
          ? arrowConfig.fieldBoundCheck(startFieldIndex)
          : true;

        if (canMoveRow && canMoveField) {
          setSelectedCell({
            rowIndex: newRow,
            field:
              arrowConfig.fieldDelta !== 0 ? fields[newFieldIndex] : startField,
          });
          setSelectedCellRange(null);
        }
      } else {
        const currentFieldIndex = fields.indexOf(field);
        const newRow = rowIndex + arrowConfig.rowDelta;
        const newFieldIndex = currentFieldIndex + arrowConfig.fieldDelta;

        const canMoveRow = arrowConfig.rowBoundCheck
          ? arrowConfig.rowBoundCheck(rowIndex)
          : true;
        const canMoveField = arrowConfig.fieldBoundCheck
          ? arrowConfig.fieldBoundCheck(currentFieldIndex)
          : true;

        if (canMoveRow && canMoveField) {
          setSelectedCell({
            rowIndex: newRow,
            field: arrowConfig.fieldDelta !== 0 ? fields[newFieldIndex] : field,
          });
          setSelectedCellRange(null);
        }
      }
      return;
    }

    // Enter or character input: Switch to edit mode
    if (e.key === "Enter" || (e.key.length === 1 && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();

      if (e.key.length === 1 && e.key !== "Enter") {
        setRows((prevRows) =>
          prevRows.map((row, idx) =>
            idx === rowIndex ? { ...row, [field]: e.key } : row
          )
        );
      }

      setSelectedCell(null);
      setSelectedCellRange(null);
      setEditingCell({ rowIndex, field });

      return;
    }
  };

  return {
    selectedCell,
    selectedCellRange,
    setSelectedCell,
    setSelectedCellRange,
    handleCellSelectionKeyDown,
  };
};
