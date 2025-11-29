/**
 * UTM Builder 테이블의 헤더 컴포넌트
 * 전체 선택 체크박스와 컬럼 헤더를 렌더링
 */
function BuilderTableHeader({ allSelected, onToggleSelectAll }) {
  return (
    <thead className="bg-[#1a2642]">
      <tr>
        <th className="px-3 py-2 text-center text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          <input
            type="checkbox"
            onChange={onToggleSelectAll}
            checked={allSelected}
            className="w-4 h-4 cursor-pointer"
          />
        </th>
        <th className="px-3 py-2 text-center text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          #
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Base URL
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Source
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Medium
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Campaign
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Term
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          Content
        </th>
        <th className="px-3 py-2 text-left text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
          생성된 URL
        </th>
        <th className="px-3 py-2 text-center text-gray-300 text-xs font-semibold border-b border-gray-700">
          액션
        </th>
      </tr>
    </thead>
  );
}

export default BuilderTableHeader;
