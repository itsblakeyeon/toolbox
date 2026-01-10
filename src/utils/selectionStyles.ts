import type { CellPosition, CellRange, RowRange, UTMField, FieldConfig } from "@/types";

/**
 * Calculate row border classes for range selection
 */
export function getRowBorderClass(
  index: number,
  selectedRowIndex: number | null,
  selectedRange: RowRange | null
): string {
  const isSingleRowSelected = selectedRowIndex === index && !selectedRange;
  const rangeMin = selectedRange ? Math.min(selectedRange.start, selectedRange.end) : -1;
  const rangeMax = selectedRange ? Math.max(selectedRange.start, selectedRange.end) : -1;
  const isInRange = selectedRange && index >= rangeMin && index <= rangeMax;
  const isFirstInRange = selectedRange && index === rangeMin;

  if (isSingleRowSelected) {
    return "row-selected";
  }

  if (!isInRange) return "";

  const classes = ["row-in-range"];
  if (isFirstInRange) classes.push("row-range-first");
  if (index === rangeMax) classes.push("row-range-last");

  return classes.join(" ");
}

/**
 * Check if a row is selected (single or in range)
 */
export function isRowSelected(
  index: number,
  selectedRowIndex: number | null,
  selectedRange: RowRange | null
): boolean {
  const isSingleRowSelected = selectedRowIndex === index && !selectedRange;
  const rangeMin = selectedRange ? Math.min(selectedRange.start, selectedRange.end) : -1;
  const rangeMax = selectedRange ? Math.max(selectedRange.start, selectedRange.end) : -1;
  const isInRange = selectedRange && index >= rangeMin && index <= rangeMax;

  return isSingleRowSelected || !!isInRange;
}

interface CellSelectionState {
  isCellSelected: boolean;
  isCellInRange: boolean;
  isEditing: boolean;
}

/**
 * Calculate cell selection state
 */
export function getCellSelectionState(
  rowIndex: number,
  field: UTMField,
  selectedCell: CellPosition | null,
  selectedCellRange: CellRange | null,
  editingCell: CellPosition | null,
  fieldConfig: FieldConfig[]
): CellSelectionState {
  const isCellSelected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.field === field;

  const isInCellRange =
    selectedCellRange &&
    rowIndex >= Math.min(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex) &&
    rowIndex <= Math.max(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);

  const currentFieldIndex = fieldConfig.findIndex((f) => f.key === field);
  const startFieldIndex = selectedCellRange
    ? fieldConfig.findIndex((f) => f.key === selectedCellRange.start.field)
    : -1;
  const endFieldIndex = selectedCellRange
    ? fieldConfig.findIndex((f) => f.key === selectedCellRange.end.field)
    : -1;

  const isFieldInRange =
    selectedCellRange &&
    currentFieldIndex >= Math.min(startFieldIndex, endFieldIndex) &&
    currentFieldIndex <= Math.max(startFieldIndex, endFieldIndex);

  const isCellInRange = !!(isInCellRange && isFieldInRange);

  const isEditing =
    editingCell?.rowIndex === rowIndex && editingCell?.field === field;

  return {
    isCellSelected: !!isCellSelected,
    isCellInRange,
    isEditing: !!isEditing,
  };
}

/**
 * Calculate cell border class based on selection state
 * Uses box-shadow for selection indicator to preserve table borders
 */
export function getCellBorderClass(
  rowIndex: number,
  field: UTMField,
  selectedCell: CellPosition | null,
  selectedCellRange: CellRange | null,
  editingCell: CellPosition | null,
  fieldConfig: FieldConfig[]
): string {
  const { isCellSelected, isCellInRange, isEditing } = getCellSelectionState(
    rowIndex,
    field,
    selectedCell,
    selectedCellRange,
    editingCell,
    fieldConfig
  );

  // Base border class - always present
  const baseBorder = "border-b border-[var(--border-subtle)]";

  if (isEditing) {
    return `${baseBorder} cell-editing`;
  }

  const hasRange =
    selectedCellRange &&
    (selectedCellRange.start.rowIndex !== selectedCellRange.end.rowIndex ||
      selectedCellRange.start.field !== selectedCellRange.end.field);

  if (isCellSelected && !hasRange) {
    return `${baseBorder} cell-selected`;
  }

  if (!isCellInRange || !selectedCellRange) {
    return baseBorder;
  }

  // Range selection - determine edge classes
  const currentFieldIndex = fieldConfig.findIndex((f) => f.key === field);
  const startFieldIndex = fieldConfig.findIndex(
    (f) => f.key === selectedCellRange.start.field
  );
  const endFieldIndex = fieldConfig.findIndex(
    (f) => f.key === selectedCellRange.end.field
  );

  const rowMin = Math.min(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);
  const rowMax = Math.max(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);
  const colMin = Math.min(startFieldIndex, endFieldIndex);
  const colMax = Math.max(startFieldIndex, endFieldIndex);

  const isTopEdge = rowIndex === rowMin;
  const isBottomEdge = rowIndex === rowMax;
  const isLeftEdge = currentFieldIndex === colMin;
  const isRightEdge = currentFieldIndex === colMax;

  const edgeClasses = [];
  if (isTopEdge) edgeClasses.push("cell-range-top");
  if (isBottomEdge) edgeClasses.push("cell-range-bottom");
  if (isLeftEdge) edgeClasses.push("cell-range-left");
  if (isRightEdge) edgeClasses.push("cell-range-right");

  return `${baseBorder} cell-in-range ${edgeClasses.join(" ")}`;
}
