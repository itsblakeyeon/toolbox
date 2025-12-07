import { useEffect, useRef } from "react";

/**
 * Input field component for UTM table
 * Renders differently based on edit mode and cell selection mode
 * - Edit mode: input element (with cursor)
 * - Cell selection mode: div element (no cursor, keyboard navigation enabled)
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
}) {
  const divRef = useRef(null);

  const inputRef = useRef(null);

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
        className="w-full bg-transparent text-gray-200 px-2 py-1 text-sm min-h-[28px] cursor-text focus:outline-none"
      >
        {value ||
          (rowIndex === 0 && (
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
      className="w-full glass-input text-gray-200 px-2 py-1 text-sm rounded"
    />
  );
}

export default UTMTableInput;
