/**
 * UTM 파라미터 입력 행 컴포넌트
 */
function UTMRow({ row, onChange }) {
  // 입력 필드 공통 스타일
  const inputClass =
    "w-full bg-[#0f1419] text-white px-3 py-2 rounded border border-gray-700 focus:border-white/30 focus:outline-none";

  return (
    <div className="grid grid-cols-6 gap-4 mb-4">
      {/* Base URL */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Base URL *</label>
        <input
          type="text"
          placeholder="example.com"
          value={row.baseUrl}
          onChange={(e) => onChange("baseUrl", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* UTM Source */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Source *</label>
        <input
          type="text"
          placeholder="google"
          value={row.source}
          onChange={(e) => onChange("source", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* UTM Medium */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Medium *</label>
        <input
          type="text"
          placeholder="cpc"
          value={row.medium}
          onChange={(e) => onChange("medium", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* UTM Campaign */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Campaign *</label>
        <input
          type="text"
          placeholder="summer_sale"
          value={row.campaign}
          onChange={(e) => onChange("campaign", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* UTM Term */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Term</label>
        <input
          type="text"
          placeholder="keyword"
          value={row.term}
          onChange={(e) => onChange("term", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* UTM Content */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Content</label>
        <input
          type="text"
          placeholder="content"
          value={row.content}
          onChange={(e) => onChange("content", e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}

export default UTMRow;
