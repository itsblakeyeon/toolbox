interface BuilderTableHeaderProps {
  allSelected: boolean;
  onToggleSelectAll: () => void;
}

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
        <th className="w-10 px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          <input
            type="checkbox"
            onChange={onToggleSelectAll}
            checked={allSelected}
            className="w-4 h-4 cursor-pointer accent-gray-500"
          />
        </th>
        {/* Row number: 40px */}
        <th className="w-10 px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          #
        </th>
        {/* Base URL: 200px */}
        <th className="w-[200px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Base URL
        </th>
        {/* Source: 100px */}
        <th className="w-[100px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Source
        </th>
        {/* Medium: 100px */}
        <th className="w-[100px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Medium
        </th>
        {/* Campaign: 100px */}
        <th className="w-[100px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Campaign
        </th>
        {/* Term: 100px */}
        <th className="w-[100px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Term
        </th>
        {/* Content: 100px */}
        <th className="w-[100px] px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Content
        </th>
        {/* Generated URL: flexible, takes remaining space */}
        <th className="px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10">
          Generated URL
        </th>
        {/* Actions: 100px */}
        <th className="w-[100px] px-3 py-3 text-center text-gray-200 text-xs font-semibold border-b border-white/10">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default BuilderTableHeader;
