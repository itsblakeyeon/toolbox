"use client";

import { memo, KeyboardEvent } from "react";
import { buildUTMUrl } from "@/utils/urlBuilder";
import {
  getRowBorderClass,
  isRowSelected,
  getCellSelectionState,
  getCellBorderClass,
} from "@/utils/selectionStyles";
import { useSelection } from "@/contexts/SelectionContext";
import UTMTableInput from "./UTMTableInput";
import { FIELD_CONFIG } from "@/constants";
import type { UTMRow, UTMField } from "@/types";

interface UTMTableRowProps {
  row: UTMRow;
  index: number;
  onToggleSelect: (id: string) => void;
  onChange: (id: string, field: UTMField, value: string) => void;
  onCopyUrl: (row: UTMRow) => void;
  onTestUrl: (row: UTMRow) => void;
}

/**
 * Component that renders individual rows in the UTM table
 */
function UTMTableRow({
  row,
  index,
  onToggleSelect,
  onChange,
  onCopyUrl,
  onTestUrl,
}: UTMTableRowProps) {
  const {
    editingCell,
    selectedCell,
    selectedCellRange,
    selectedRowIndex,
    selectedRange,
    onRowSelectionKeyDown,
  } = useSelection();

  const generatedUrl = buildUTMUrl(row);
  const rowSelected = isRowSelected(index, selectedRowIndex, selectedRange);
  const rowBorderClass = getRowBorderClass(index, selectedRowIndex, selectedRange);

  return (
    <tr
      key={row.id}
      data-row-index={index}
      tabIndex={rowSelected ? 0 : -1}
      onKeyDown={(e) =>
        rowSelected && onRowSelectionKeyDown(e as unknown as KeyboardEvent, index)
      }
      className={`transition-colors duration-100 hover:bg-[var(--bg-tertiary)] ${rowBorderClass}`}
    >
      {/* Checkbox */}
      <td className="px-3 py-2 text-center border-b border-r border-[var(--border-subtle)]">
        <input
          type="checkbox"
          checked={row.selected || false}
          onChange={() => onToggleSelect(row.id)}
          className="notion-checkbox"
        />
      </td>

      {/* Row number */}
      <td className="px-3 py-2 text-center text-[var(--text-tertiary)] text-sm border-b border-r border-[var(--border-subtle)]">
        {index + 1}
      </td>

      {/* Input fields */}
      {FIELD_CONFIG.map((field) => {
        const { isCellSelected, isCellInRange, isEditing } = getCellSelectionState(
          index,
          field.key,
          selectedCell,
          selectedCellRange,
          editingCell,
          FIELD_CONFIG,
          selectedRowIndex,
          selectedRange
        );

        const cellBorderClass = getCellBorderClass(
          index,
          field.key,
          selectedCell,
          selectedCellRange,
          editingCell,
          FIELD_CONFIG,
          selectedRowIndex,
          selectedRange
        );

        return (
          <td
            key={field.key}
            className={`px-0 py-0 ${cellBorderClass}`}
          >
            <UTMTableInput
              value={row[field.key] as string}
              field={field.key}
              rowId={row.id}
              rowIndex={index}
              placeholder={field.placeholder}
              onChange={onChange}
              isEditing={isEditing}
              isCellSelected={isCellSelected || isCellInRange}
            />
          </td>
        );
      })}

      {/* Generated URL */}
      <td className="px-3 py-2 border-b border-r border-[var(--border-subtle)]">
        <div
          className={`text-sm max-w-sm overflow-x-auto whitespace-nowrap scrollbar-none ${
            generatedUrl ? "text-[var(--text-primary)]" : "text-[var(--text-placeholder)]"
          }`}
        >
          {generatedUrl || (index === 0 && "nike.com?utm_source=google&utm_medium=cpc&...")}
        </div>
      </td>

      {/* Action buttons */}
      <td className="px-2 py-1.5 border-b border-[var(--border-subtle)]">
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => onCopyUrl(row)}
            disabled={!generatedUrl}
            className="notion-icon-button"
            title="Copy URL"
            aria-label="Copy URL"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            className="notion-icon-button"
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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

export default memo(UTMTableRow);
