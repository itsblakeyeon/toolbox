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
    <thead className="bg-white/5 backdrop-blur-sm">
      <tr>
        {/* Checkbox: 40px */}
        <th className="w-10 px-3 py-2 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          <input
            type="checkbox"
            onChange={onToggleSelectAll}
            checked={allSelected}
            className="w-4 h-4 cursor-pointer accent-gray-500"
          />
        </th>
        {/* Row number: 40px */}
        <th className="w-10 px-3 py-2 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          #
        </th>
        {/* UTM Fields */}
        {HEADER_COLUMNS.map((col) => (
          <th
            key={col.key}
            className={`${col.width} px-3 py-2 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10`}
          >
            {col.label}
          </th>
        ))}
        {/* Generated URL: flexible, takes remaining space */}
        <th className="px-3 py-2 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Generated URL
        </th>
        {/* Actions: 100px */}
        <th className="w-[100px] px-3 py-2 text-center text-gray-200 text-xs font-semibold border-b border-white/10">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default BuilderTableHeader;
