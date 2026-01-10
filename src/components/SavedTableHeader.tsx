interface SavedTableHeaderProps {
  allSelected: boolean;
  onToggleSelectAll: () => void;
}

/**
 * Header component for Saved Tab table
 */
function SavedTableHeader({
  allSelected,
  onToggleSelectAll,
}: SavedTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-[var(--bg-tertiary)]">
        <th className="w-10 px-3 py-2.5 text-center border-b border-[var(--border-default)]">
          <input
            type="checkbox"
            onChange={onToggleSelectAll}
            checked={allSelected}
            className="notion-checkbox"
          />
        </th>
        <th className="w-10 px-3 py-2.5 text-center text-[var(--text-tertiary)] text-xs font-medium border-b border-[var(--border-default)]">
          #
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Source
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Medium
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Campaign
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Term
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Content
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Generated URL
        </th>
        <th className="px-3 py-2.5 text-left text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider border-b border-[var(--border-default)]">
          Comment
        </th>
      </tr>
    </thead>
  );
}

export default SavedTableHeader;
