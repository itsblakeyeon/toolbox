"use client";

import { createContext, useContext, ReactNode } from "react";
import type { CellPosition, CellRange, RowRange, UTMField } from "@/types";

interface SelectionContextValue {
  // Cell selection state
  editingCell: CellPosition | null;
  selectedCell: CellPosition | null;
  selectedCellRange: CellRange | null;
  // Row selection state
  selectedRowIndex: number | null;
  selectedRange: RowRange | null;
  // Event handlers
  onInputFocus: (field: UTMField, rowIndex: number) => void;
  onKeyDown: (e: React.KeyboardEvent, rowIndex: number, field: UTMField) => void;
  onCellSelectionKeyDown: (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => void;
  onRowSelectionKeyDown: (e: React.KeyboardEvent, rowIndex: number) => void;
  onCellClick: (rowIndex: number, field: UTMField) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

interface SelectionProviderProps {
  children: ReactNode;
  value: SelectionContextValue;
}

export function SelectionProvider({ children, value }: SelectionProviderProps) {
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
