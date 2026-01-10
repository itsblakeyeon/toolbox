import { UTMField } from "@/types";

interface UTMRowData {
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

interface UTMRowProps {
  row: UTMRowData;
  onChange: (field: UTMField, value: string) => void;
}

/**
 * UTM parameter input row component
 */
function UTMRow({ row, onChange }: UTMRowProps) {
  // Common style for input fields
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
