"use client";

import { useEffect, useRef } from "react";
import type { UTMField } from "@/types";

interface UTMTableInputProps {
  value: string;
  field: UTMField;
  rowId: string;
  rowIndex: number;
  placeholder: string;
  onChange: (id: string, field: UTMField, value: string) => void;
  onFocus: (field: UTMField, rowIndex: number) => void;
  onKeyDown: (e: React.KeyboardEvent, rowIndex: number, field: UTMField) => void;
  isEditing: boolean;
  isCellSelected: boolean;
  onCellClick: (rowIndex: number, field: UTMField) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}

/**
 * Input field component for UTM table
 */
function UTMTableInput({
  value,
  field,
  rowId,
  rowIndex,
  placeholder,
  onChange,
  onFocus,
  onKeyDown,
  isEditing,
  isCellSelected,
  onCellClick,
  onCompositionStart,
  onCompositionEnd,
}: UTMTableInputProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus div when in cell selection mode
  useEffect(() => {
    if (isCellSelected && divRef.current) {
      divRef.current.focus();
    }
  }, [isCellSelected]);

  // Focus input when in edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Cell selection mode: render div (no cursor, focusable)
  if (isCellSelected) {
    return (
      <div
        ref={divRef}
        onClick={() => onCellClick(rowIndex, field)}
        onKeyDown={(e) => onKeyDown(e, rowIndex, field)}
        data-row-index={rowIndex}
        data-field={field}
        tabIndex={0}
        className="w-full bg-transparent text-gray-200 px-2 py-1 text-sm min-h-[28px] cursor-text focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis select-none"
      >
        {value || (rowIndex === 0 && (
          <span className="text-gray-500">{placeholder}</span>
        ))}
      </div>
    );
  }

  // Edit mode or default: render input (with cursor)
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(rowId, field, e.target.value)}
      onFocus={() => onFocus(field, rowIndex)}
      onKeyDown={(e) => onKeyDown(e, rowIndex, field)}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      data-row-index={rowIndex}
      data-field={field}
      placeholder={rowIndex === 0 ? placeholder : ""}
      className="w-full bg-transparent text-gray-200 px-2 py-1 text-sm outline-none border-none"
    />
  );
}

export default UTMTableInput;
