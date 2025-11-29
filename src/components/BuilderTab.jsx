import UTMRow from "./UTMRow";
import { buildUTMUrl } from "../utils/urlBuilder";
import { validateUrl } from "../utils/validation";
import { useLocalStorage } from "../hooks/useLocalStorage";

function BuilderTab() {
  // 행 데이터 상태 관리 (localStorage 자동 저장)
  const [rows, setRows] = useLocalStorage("utmBuilderRows", [
    {
      id: Date.now(),
      baseUrl: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    },
  ]);

  // 입력 필드 값 변경 핸들러
  const handleChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // 행 추가
  const addRow = () => {
    const newRow = {
      id: Date.now(),
      baseUrl: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    };
    setRows([...rows, newRow]);
  };

  // 행 삭제
  const deleteRow = (id) => {
    if (rows.length === 1) {
      alert("최소 1개의 행은 필요합니다!");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  // 모든 필드 초기화
  const handleReset = () => {
    setRows([
      {
        id: Date.now(),
        baseUrl: "",
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
    ]);
  };

  // 특정 행의 URL 복사
  const copyUrl = (row) => {
    const url = buildUTMUrl(row);
    if (url) {
      navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 행 추가 버튼 */}
      <div className="mb-4 flex gap-3">
        <button
          onClick={addRow}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition duration-200"
        >
          + 행 추가
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition duration-200"
        >
          전체 초기화
        </button>
      </div>

      {/* 입력 필드들 */}
      {rows.map((row) => {
        const generatedUrl = buildUTMUrl(row);
        const urlValidation = validateUrl(row.baseUrl);

        return (
          <div key={row.id} className="bg-[#16213e] rounded-lg p-6 mb-6">
            {/* 행 번호와 삭제 버튼 */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">
                행 #{rows.indexOf(row) + 1}
              </h3>
              <button
                onClick={() => deleteRow(row.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition duration-200"
              >
                삭제
              </button>
            </div>

            {/* UTM 입력 필드 */}
            <UTMRow
              row={row}
              onChange={(field, value) => handleChange(row.id, field, value)}
            />

            {/* URL 유효성 검사 경고 */}
            {!urlValidation.valid && row.baseUrl && (
              <div className="text-red-400 text-sm mt-2">
                ⚠️ {urlValidation.message}
              </div>
            )}

            {/* 생성된 URL */}
            <div className="mt-4">
              <h4 className="text-sm text-gray-400 mb-2">생성된 URL:</h4>
              <div className="flex gap-3">
                <div className="flex-1 bg-[#0f1419] text-gray-300 px-4 py-3 rounded border border-gray-700 break-all">
                  {generatedUrl || "필수 필드를 입력하세요"}
                </div>
                <button
                  onClick={() => copyUrl(row)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition duration-200"
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BuilderTab;
