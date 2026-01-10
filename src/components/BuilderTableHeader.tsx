import { memo } from "react";

interface BuilderTableHeaderProps {
  allSelected: boolean;
  onToggleSelectAll: () => void;
}

const HEADER_COLUMNS = [
  { key: "baseUrl", label: "Base URL", width: "w-[200px]" },
  { key: "source", label: "Source", width: "w-[100px]" },
  { key: "medium", label: "Medium", width: "w-[100px]" },
  { key: "campaign", label: "Campaign", width: "w-[100px]" },
  { key: "term", label: "Term", width: "w-[100px]" },
  { key: "content", label: "Content", width: "w-[100px]" },
];

/**
 * Header component for UTM Builder table
 */
function BuilderTableHeader({
  allSelected,
  onToggleSelectAll,
}: BuilderTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-[var(--bg-tertiary)]">
        {/* Checkbox */}
        <th className="w-10 px-3 py-2.5 text-center border-b border-r border-[var(--border-default)]">
          <input
            type="checkbox"
            onChange={onToggleSelectAll}
            checked={allSelected}
            className="notion-checkbox"
          />
        </th>
        {/* Row number */}
        <th className="w-10 px-3 py-2.5 text-center text-[var(--text-tertiary)] text-xs font-medium border-b border-r border-[var(--border-default)]">
          #
        </th>
        {/* UTM Fields */}
        {HEADER_COLUMNS.map((col) => (
          <th
            key={col.key}
            className={`${col.width} px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-r border-[var(--border-default)]`}
          >
            {col.label}
          </th>
        ))}
        {/* Generated URL */}
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-r border-[var(--border-default)]">
          Generated URL
        </th>
        {/* Actions */}
        <th className="w-[88px] px-3 py-2.5 text-center text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default memo(BuilderTableHeader);
