"use client";

import type { SavedItemWithSelection } from "@/types";

interface SavedTableRowProps {
  item: SavedItemWithSelection;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onUpdateComment: (id: number, comment: string) => void;
}

/**
 * Component that renders individual rows in the Saved Tab table
 */
function SavedTableRow({
  item,
  index,
  isSelected,
  onToggleSelect,
  onUpdateComment,
}: SavedTableRowProps) {
  return (
    <tr
      className={`transition-colors duration-100 hover:bg-[var(--bg-tertiary)] ${
        isSelected ? "notion-row-selected" : ""
      }`}
    >
      {/* Checkbox */}
      <td className="px-3 py-2.5 text-center border-b border-[var(--border-subtle)]">
        <input
          type="checkbox"
          checked={isSelected || false}
          onChange={() => onToggleSelect(item.id)}
          className="notion-checkbox"
        />
      </td>

      {/* Row number */}
      <td className="px-3 py-2.5 text-center text-[var(--text-tertiary)] text-sm border-b border-[var(--border-subtle)]">
        {index + 1}
      </td>

      {/* Source */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm text-[var(--text-primary)]">{item.params.source || "-"}</div>
      </td>

      {/* Medium */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm text-[var(--text-primary)]">{item.params.medium || "-"}</div>
      </td>

      {/* Campaign */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm text-[var(--text-primary)]">{item.params.campaign || "-"}</div>
      </td>

      {/* Term */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm text-[var(--text-secondary)]">{item.params.term || "-"}</div>
      </td>

      {/* Content */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm text-[var(--text-secondary)]">
          {item.params.content || "-"}
        </div>
      </td>

      {/* Generated URL */}
      <td className="px-3 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="text-sm max-w-sm overflow-x-auto whitespace-nowrap scrollbar-none text-[var(--text-primary)]">
          {item.fullUrl || ""}
        </div>
      </td>

      {/* Comment */}
      <td className="px-0 py-0 border-b border-[var(--border-subtle)]">
        <input
          type="text"
          defaultValue={item.comment || ""}
          placeholder="Add comment..."
          className="notion-input"
          onBlur={(e) => {
            if (e.target.value !== item.comment) {
              onUpdateComment(item.id, e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
        />
      </td>
    </tr>
  );
}

export default SavedTableRow;
