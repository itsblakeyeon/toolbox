"use client";

import { useState } from "react";
import { createRowFromCopied } from "@/utils/rowFactory";
import type { UTMRow } from "@/types";

interface PasteResult {
  success: boolean;
  newRows?: UTMRow[];
  insertedIndex?: number;
}

/**
 * Hook for row copy/paste functionality
 */
export const useRowClipboard = () => {
  const [copiedRow, setCopiedRow] = useState<UTMRow | null>(null);
  const [copiedRows, setCopiedRows] = useState<UTMRow[] | null>(null);

  /**
   * Copy a single row to clipboard
   */
  const copyRow = (row: UTMRow): boolean => {
    setCopiedRow({ ...row });
    setCopiedRows(null);
    return true;
  };

  /**
   * Copy multiple rows to clipboard
   */
  const copyRows = (rows: UTMRow[]): boolean => {
    if (rows && rows.length > 0) {
      setCopiedRows(rows.map((row) => ({ ...row })));
      setCopiedRow(null);
      return true;
    }
    return false;
  };

  /**
   * Paste a single row at a specific position
   */
  const pasteRow = (rows: UTMRow[], rowIndex: number): PasteResult => {
    if (!copiedRow && !copiedRows) {
      return { success: false };
    }

    if (copiedRows && copiedRows.length > 0) {
      return pasteRows(rows, rowIndex);
    }

    if (copiedRow) {
      const newRow = createRowFromCopied(copiedRow);
      const newRows = [
        ...rows.slice(0, rowIndex + 1),
        newRow,
        ...rows.slice(rowIndex + 1),
      ];

      return {
        success: true,
        newRows,
        insertedIndex: rowIndex + 1,
      };
    }

    return { success: false };
  };

  /**
   * Paste multiple rows at a specific position
   */
  const pasteRows = (rows: UTMRow[], rowIndex: number): PasteResult => {
    if (!copiedRows || copiedRows.length === 0) {
      return pasteRow(rows, rowIndex);
    }

    const newRows = copiedRows.map((row) => createRowFromCopied(row));
    const updatedRows = [
      ...rows.slice(0, rowIndex + 1),
      ...newRows,
      ...rows.slice(rowIndex + 1),
    ];

    return {
      success: true,
      newRows: updatedRows,
      insertedIndex: rowIndex + 1,
    };
  };

  return {
    copiedRow,
    copiedRows,
    copyRow,
    copyRows,
    pasteRow,
    pasteRows,
    hasCopiedRow:
      copiedRow !== null || (copiedRows !== null && copiedRows.length > 0),
  };
};
