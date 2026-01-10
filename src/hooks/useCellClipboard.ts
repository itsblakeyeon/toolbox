"use client";

import type { UTMRow, UTMField, CellPosition, CellRange } from "@/types";

interface CopyCellsParams {
  rows: UTMRow[];
  range: CellRange | null;
  singleCell: CellPosition | null;
  fields: UTMField[];
}

interface PasteCellsParams {
  text: string;
  rows: UTMRow[];
  startPosition: CellPosition;
  range: CellRange | null;
  fields: UTMField[];
}

interface PasteCellsResult {
  newRows: UTMRow[];
  pastedRange: CellRange;
}

interface DeleteCellsParams {
  rows: UTMRow[];
  range: CellRange | null;
  singleCell: CellPosition | null;
  fields: UTMField[];
}

/**
 * Type-safe getter for UTMRow field value
 */
function getFieldValue(row: UTMRow, field: UTMField): string {
  return row[field];
}

/**
 * Type-safe setter for UTMRow field value
 */
function setFieldValue(row: UTMRow, field: UTMField, value: string): UTMRow {
  return { ...row, [field]: value };
}

/**
 * Copy cells to clipboard (tab-separated values)
 */
export function copyCells({ rows, range, singleCell, fields }: CopyCellsParams): string {
  if (range) {
    const minRow = Math.min(range.start.rowIndex, range.end.rowIndex);
    const maxRow = Math.max(range.start.rowIndex, range.end.rowIndex);
    const startFieldIndex = fields.indexOf(range.start.field);
    const endFieldIndex = fields.indexOf(range.end.field);
    const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
    const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);

    const cellValues: string[] = [];
    for (let r = minRow; r <= maxRow; r++) {
      const rowValues: string[] = [];
      for (let f = minFieldIndex; f <= maxFieldIndex; f++) {
        const fieldKey = fields[f];
        rowValues.push(getFieldValue(rows[r], fieldKey) || "");
      }
      cellValues.push(rowValues.join("\t"));
    }
    return cellValues.join("\n");
  } else if (singleCell) {
    return getFieldValue(rows[singleCell.rowIndex], singleCell.field) || "";
  }
  return "";
}

/**
 * Parse clipboard text and paste into cells
 */
export function pasteCells({
  text,
  rows,
  startPosition,
  range,
  fields,
}: PasteCellsParams): PasteCellsResult | null {
  if (!text) return null;

  const lines = text.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return null;

  const startRow = range
    ? Math.min(range.start.rowIndex, range.end.rowIndex)
    : startPosition.rowIndex;
  const startFieldIdx = range
    ? Math.min(fields.indexOf(range.start.field), fields.indexOf(range.end.field))
    : fields.indexOf(startPosition.field);
  const startField = fields[startFieldIdx];

  const maxColCount = Math.max(...lines.map((line) => line.split("\t").length));
  const endRowIndex = Math.min(startRow + lines.length - 1, rows.length - 1);
  const endFieldIndex = Math.min(startFieldIdx + maxColCount - 1, fields.length - 1);

  const newRows = [...rows];
  lines.forEach((line, lineIndex) => {
    const values = line.split("\t");
    const targetRowIndex = startRow + lineIndex;

    if (targetRowIndex < newRows.length) {
      values.forEach((value, colIndex) => {
        const targetFieldIndex = startFieldIdx + colIndex;
        if (targetFieldIndex < fields.length) {
          newRows[targetRowIndex] = setFieldValue(
            newRows[targetRowIndex],
            fields[targetFieldIndex],
            value.trim()
          );
        }
      });
    }
  });

  return {
    newRows,
    pastedRange: {
      start: { rowIndex: startRow, field: startField },
      end: { rowIndex: endRowIndex, field: fields[endFieldIndex] },
    },
  };
}

/**
 * Delete values in selected cells
 */
export function deleteCells({
  rows,
  range,
  singleCell,
  fields,
}: DeleteCellsParams): UTMRow[] {
  if (range) {
    const minRow = Math.min(range.start.rowIndex, range.end.rowIndex);
    const maxRow = Math.max(range.start.rowIndex, range.end.rowIndex);
    const startFieldIndex = fields.indexOf(range.start.field);
    const endFieldIndex = fields.indexOf(range.end.field);
    const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
    const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);

    return rows.map((row, idx) => {
      if (idx >= minRow && idx <= maxRow) {
        let updatedRow = { ...row };
        for (let i = minFieldIndex; i <= maxFieldIndex; i++) {
          updatedRow = setFieldValue(updatedRow, fields[i], "");
        }
        return updatedRow;
      }
      return row;
    });
  } else if (singleCell) {
    return rows.map((row, idx) =>
      idx === singleCell.rowIndex
        ? setFieldValue(row, singleCell.field, "")
        : row
    );
  }
  return rows;
}
