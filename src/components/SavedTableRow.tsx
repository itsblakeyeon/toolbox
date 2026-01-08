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
      className={`transition-all duration-200 ${
        isSelected
          ? "outline outline-2 outline-white/20"
          : ""
      }`}
    >
      {/* Checkbox */}
      <td className="px-3 py-2 text-center border-r border-b border-white/10">
        <input
          type="checkbox"
          checked={isSelected || false}
          onChange={() => onToggleSelect(item.id)}
          className="w-4 h-4 cursor-pointer accent-gray-500"
        />
      </td>

      {/* Row number */}
      <td className="px-3 py-2 text-center text-gray-200 text-sm border-r border-b border-white/10">
        {index + 1}
      </td>

      {/* Source */}
      <td className="px-2 py-1 border-r border-b border-white/10">
        <div className="text-sm text-white">{item.params.source || "-"}</div>
      </td>

      {/* Medium */}
      <td className="px-2 py-1 border-r border-b border-white/10">
        <div className="text-sm text-white">{item.params.medium || "-"}</div>
      </td>

      {/* Campaign */}
      <td className="px-2 py-1 border-r border-b border-white/10">
        <div className="text-sm text-white">{item.params.campaign || "-"}</div>
      </td>

      {/* Term */}
      <td className="px-2 py-1 border-r border-b border-white/10">
        <div className="text-sm text-gray-300">{item.params.term || "-"}</div>
      </td>

      {/* Content */}
      <td className="px-2 py-1 border-r border-b border-white/10">
        <div className="text-sm text-gray-300">
          {item.params.content || "-"}
        </div>
      </td>

      {/* Generated URL */}
      <td
        className={`px-2 py-1 border-r border-b border-white/10 ${
          isSelected ? "" : "bg-white/2"
        }`}
      >
        <div className="text-sm max-w-sm overflow-x-auto whitespace-nowrap text-gray-200">
          {item.fullUrl || ""}
        </div>
      </td>

      {/* Comment - 바로 입력 가능, 자동 저장 */}
      <td className="px-2 py-1 border-b border-white/10 bg-white/[0.08] focus-within:border-2 focus-within:border-white/20">
        <input
          type="text"
          defaultValue={item.comment || ""}
          placeholder="Add comment..."
          className="w-full bg-transparent text-gray-200 px-2 py-1 text-sm outline-none border-none"
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
