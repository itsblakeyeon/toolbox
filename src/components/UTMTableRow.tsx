"use client";

import { KeyboardEvent } from "react";
import { buildUTMUrl } from "@/utils/urlBuilder";
import UTMTableInput from "./UTMTableInput";
import { FIELD_CONFIG } from "@/constants";
import type { UTMRow, UTMField, CellPosition, CellRange, RowRange } from "@/types";

interface UTMTableRowProps {
  row: UTMRow;
  index: number;
  editingCell: CellPosition | null;
  selectedCell: CellPosition | null;
  selectedCellRange: CellRange | null;
  selectedRowIndex: number | null;
  selectedRange: RowRange | null;
  onToggleSelect: (id: string) => void;
  onChange: (id: string, field: UTMField, value: string) => void;
  onInputFocus: (field: UTMField, rowIndex: number) => void;
  onKeyDown: (e: React.KeyboardEvent, rowIndex: number, field: UTMField) => void;
  onCellSelectionKeyDown: (
    e: React.KeyboardEvent,
    rowIndex: number,
    field: UTMField
  ) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  onCopyUrl: (row: UTMRow) => void;
  onTestUrl: (row: UTMRow) => void;
  onRowSelectionKeyDown: (e: React.KeyboardEvent, rowIndex: number) => void;
  onCellClick: (rowIndex: number, field: UTMField) => void;
}

/**
 * Component that renders individual rows in the UTM table
 */
function UTMTableRow({
  row,
  index,
  editingCell,
  selectedCell,
  selectedCellRange,
  selectedRowIndex,
  selectedRange,
  onToggleSelect,
  onChange,
  onInputFocus,
  onKeyDown,
  onCellSelectionKeyDown,
  onCompositionStart,
  onCompositionEnd,
  onCopyUrl,
  onTestUrl,
  onRowSelectionKeyDown,
  onCellClick,
}: UTMTableRowProps) {
  const generatedUrl = buildUTMUrl(row);

  // Check if within range selection
  const isInRange =
    selectedRange &&
    index >= Math.min(selectedRange.start, selectedRange.end) &&
    index <= Math.max(selectedRange.start, selectedRange.end);

  // Check if row is selected (single row, not range)
  const isSingleRowSelected = selectedRowIndex === index && !selectedRange;

  // Range selection border logic
  const rangeMin = selectedRange ? Math.min(selectedRange.start, selectedRange.end) : -1;
  const rangeMax = selectedRange ? Math.max(selectedRange.start, selectedRange.end) : -1;
  const isFirstInRange = selectedRange && index === rangeMin;
  const isLastInRange = selectedRange && index === rangeMax;

  // Combined selected state for keyboard handling
  const isRowSelected = isSingleRowSelected || isInRange;

  // Build border classes for range selection
  const getRangeBorderClass = () => {
    if (isSingleRowSelected) return "outline outline-2 outline-white/20";
    if (!isInRange) return "";

    const classes = ["border-l-2 border-r-2 border-white/20"];
    if (isFirstInRange) classes.push("border-t-2");
    if (isLastInRange) classes.push("border-b-2");
    return classes.join(" ");
  };

  return (
    <tr
      key={row.id}
      data-row-index={index}
      tabIndex={isRowSelected ? 0 : -1}
      onKeyDown={(e) =>
        isRowSelected && onRowSelectionKeyDown(e as unknown as KeyboardEvent, index)
      }
      className={`transition-all duration-200 ${getRangeBorderClass()}`}
    >
      {/* Checkbox */}
      <td className="px-3 py-2 text-center border-r border-b border-white/10">
        <input
          type="checkbox"
          checked={row.selected || false}
          onChange={() => onToggleSelect(row.id)}
          className="w-4 h-4 cursor-pointer accent-gray-500"
        />
      </td>

      {/* Row number */}
      <td className="px-3 py-2 text-center text-gray-200 text-sm border-r border-b border-white/10">
        {index + 1}
      </td>

      {/* Input fields */}
      {FIELD_CONFIG.map((field) => {
        // Check single cell selection
        const isCellSelected =
          selectedCell &&
          selectedCell.rowIndex === index &&
          selectedCell.field === field.key;

        // Check if within cell range selection
        const isInCellRange =
          selectedCellRange &&
          index >=
            Math.min(
              selectedCellRange.start.rowIndex,
              selectedCellRange.end.rowIndex
            ) &&
          index <=
            Math.max(
              selectedCellRange.start.rowIndex,
              selectedCellRange.end.rowIndex
            );

        // Check if field is within range
        const currentFieldIndex = FIELD_CONFIG.findIndex(
          (f) => f.key === field.key
        );
        const startFieldIndex = selectedCellRange
          ? FIELD_CONFIG.findIndex(
              (f) => f.key === selectedCellRange.start.field
            )
          : -1;
        const endFieldIndex = selectedCellRange
          ? FIELD_CONFIG.findIndex((f) => f.key === selectedCellRange.end.field)
          : -1;

        const isFieldInRange =
          selectedCellRange &&
          currentFieldIndex >= Math.min(startFieldIndex, endFieldIndex) &&
          currentFieldIndex <= Math.max(startFieldIndex, endFieldIndex);

        const isCellInRange = isInCellRange && isFieldInRange;

        // Check edit mode
        const isEditing =
          editingCell &&
          editingCell.rowIndex === index &&
          editingCell.field === field.key;

        // Calculate cell border class
        const getCellBorderClass = () => {
          // Editing mode: all 4 sides highlighted
          if (isEditing) {
            return "border-2 border-white/20";
          }

          // If there's a cell range, treat selected cell as part of the range
          const hasRange = selectedCellRange &&
            (selectedCellRange.start.rowIndex !== selectedCellRange.end.rowIndex ||
             selectedCellRange.start.field !== selectedCellRange.end.field);

          // Single cell selected (no range): all 4 sides highlighted
          if (isCellSelected && !hasRange) {
            return "border-2 border-white/20";
          }

          // Not in range: default border
          if (!isCellInRange || !selectedCellRange) {
            return "border-r border-b border-white/10";
          }

          // Cell range: only outer edges of the entire range get highlighted
          const rowMin = Math.min(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);
          const rowMax = Math.max(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);
          const colMin = Math.min(startFieldIndex, endFieldIndex);
          const colMax = Math.max(startFieldIndex, endFieldIndex);

          const isTopEdge = index === rowMin;
          const isBottomEdge = index === rowMax;
          const isLeftEdge = currentFieldIndex === colMin;
          const isRightEdge = currentFieldIndex === colMax;

          const borders = [];

          // Top edge
          borders.push(isTopEdge ? "border-t-2 border-t-white/20" : "");
          // Bottom edge
          borders.push(isBottomEdge ? "border-b-2 border-b-white/20" : "border-b border-b-white/10");
          // Left edge
          borders.push(isLeftEdge ? "border-l-2 border-l-white/20" : "");
          // Right edge
          borders.push(isRightEdge ? "border-r-2 border-r-white/20" : "border-r border-r-white/10");

          return borders.filter(Boolean).join(" ");
        };

        const cellBorderClass = getCellBorderClass();

        return (
          <td
            key={field.key}
            className={`px-2 py-1 bg-white/[0.08] ${cellBorderClass}`}
          >
            <UTMTableInput
              value={row[field.key as keyof UTMRow] as string}
              field={field.key}
              rowId={row.id}
              rowIndex={index}
              placeholder={field.placeholder}
              onChange={onChange}
              onFocus={onInputFocus}
              onKeyDown={
                isEditing
                  ? onKeyDown
                  : isCellSelected || isCellInRange
                  ? (e) => onCellSelectionKeyDown(e, index, field.key)
                  : onKeyDown
              }
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
              isEditing={!!isEditing}
              isCellSelected={!!isCellSelected}
              onCellClick={onCellClick}
            />
          </td>
        );
      })}

      {/* Generated URL */}
      <td
        className={`px-2 py-1 border-r border-b border-white/10 ${
          isRowSelected ? "" : "bg-white/2"
        }`}
      >
        <div
          className={`text-sm max-w-sm overflow-x-auto whitespace-nowrap ${
            generatedUrl ? "text-gray-200" : "text-gray-500 italic"
          }`}
        >
          {generatedUrl || ""}
        </div>
      </td>

      {/* Action buttons */}
      <td className="px-2 py-1 border-b border-white/10">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onCopyUrl(row)}
            disabled={!generatedUrl}
            className="glass-button text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            title="Copy URL"
            aria-label="Copy URL"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => onTestUrl(row)}
            disabled={!generatedUrl}
            className="glass-button glass-button-green text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UTMTableRow;
