"use client";

import { memo, useEffect, useRef } from "react";
import { useSelection } from "@/contexts/SelectionContext";
import type { UTMField } from "@/types";

interface UTMTableInputProps {
  value: string;
  field: UTMField;
  rowId: string;
  rowIndex: number;
  placeholder: string;
  onChange: (id: string, field: UTMField, value: string) => void;
  isEditing: boolean;
  isCellSelected: boolean;
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
  isEditing,
  isCellSelected,
}: UTMTableInputProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    onInputFocus,
    onKeyDown,
    onCellSelectionKeyDown,
    onCellClick,
    onCompositionStart,
    onCompositionEnd,
  } = useSelection();

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

  const handleKeyDown = isEditing
    ? onKeyDown
    : isCellSelected
    ? onCellSelectionKeyDown
    : onKeyDown;

  // Cell selection mode: render div (no cursor, focusable)
  if (isCellSelected) {
    return (
      <div
        ref={divRef}
        onClick={() => onCellClick(rowIndex, field)}
        onKeyDown={(e) => handleKeyDown(e, rowIndex, field)}
        data-row-index={rowIndex}
        data-field={field}
        tabIndex={0}
        className="w-full bg-transparent text-[var(--text-primary)] px-3 py-2.5 text-sm min-h-[40px] cursor-text focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis select-none flex items-center"
      >
        {value || (rowIndex === 0 && (
          <span className="text-[var(--text-placeholder)]">{placeholder}</span>
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
      onFocus={() => onInputFocus(field, rowIndex)}
      onKeyDown={(e) => handleKeyDown(e, rowIndex, field)}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      data-row-index={rowIndex}
      data-field={field}
      placeholder={rowIndex === 0 ? placeholder : ""}
      className="notion-input"
    />
  );
}

export default memo(UTMTableInput);
