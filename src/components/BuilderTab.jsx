import { buildUTMUrl } from "../utils/urlBuilder";
import { validateUrl } from "../utils/validation";
import { useLocalStorage } from "../hooks/useLocalStorage";

function BuilderTab({ onSave }) {
  // 행 데이터 상태 관리 (localStorage 자동 저장)
  const [rows, setRows] = useLocalStorage("utmBuilderRows", [
    {
      id: 1,
      baseUrl: "https://example.com",
      source: "google",
      medium: "cpc",
      campaign: "spring_sale",
      term: "running shoes",
      content: "text_ad",
      selected: false,
    },
    {
      id: 2,
      baseUrl: "https://example.com",
      source: "facebook",
      medium: "social",
      campaign: "new_product",
      term: "",
      content: "carousel_ad",
      selected: false,
    },
    {
      id: 3,
      baseUrl: "https://example.com",
      source: "newsletter",
      medium: "email",
      campaign: "weekly_news",
      term: "",
      content: "header_banner",
      selected: false,
    },
  ]);

  // 편집 가능한 필드 목록 (키보드 네비게이션용)
  const fields = ['baseUrl', 'source', 'medium', 'campaign', 'term', 'content'];

  // 입력 필드 값 변경 핸들러
  const handleChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
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
      selected: false,
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
        selected: false,
      },
    ]);
  };

  // 체크박스 토글
  const toggleSelect = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row
      )
    );
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    const allSelected = rows.every((row) => row.selected);
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, selected: !allSelected }))
    );
  };

  // 선택 항목 저장
  const saveSelected = () => {
    const selectedRows = rows.filter((row) => row.selected);

    if (selectedRows.length === 0) {
      alert("저장할 항목을 선택해주세요!");
      return;
    }

    const savedItems = selectedRows.map((row) => {
      const fullUrl = buildUTMUrl(row);
      if (!fullUrl) return null;

      return {
        id: Date.now() + Math.random(),
        campaignName: `${row.source}-${row.medium}-${row.campaign}`,
        savedAt: Date.now(),
        comment: "",
        params: {
          source: row.source,
          medium: row.medium,
          campaign: row.campaign,
          term: row.term,
          content: row.content,
        },
        fullUrl: fullUrl,
      };
    }).filter(Boolean);

    if (savedItems.length > 0) {
      onSave(savedItems);
      alert(`${savedItems.length}개 항목이 저장되었습니다!`);

      // 저장 후 선택 해제
      setRows((prevRows) =>
        prevRows.map((row) => ({ ...row, selected: false }))
      );
    }
  };

  // 특정 행의 URL 복사
  const copyUrl = (row) => {
    const url = buildUTMUrl(row);
    if (url) {
      navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!");
    }
  };

  // 키보드 네비게이션: 특정 셀로 포커스 이동
  const focusCell = (rowIndex, field) => {
    if (rowIndex < 0 || rowIndex >= rows.length) return;

    const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
    const nextInput = document.querySelector(selector);
    if (nextInput) {
      nextInput.focus();
      // 텍스트 전체 선택 (선택적)
      nextInput.select();
    }
  };

  // 키보드 이벤트 핸들러 (방향키, Enter)
  const handleKeyDown = (e, rowIndex, field) => {
    const input = e.target;
    const cursorAtStart = input.selectionStart === 0;
    const cursorAtEnd = input.selectionStart === input.value.length;

    // ArrowDown 또는 Enter: 아래 행으로 이동
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      e.preventDefault();
      focusCell(rowIndex + 1, field);
    }
    // ArrowUp: 위 행으로 이동
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusCell(rowIndex - 1, field);
    }
    // ArrowRight: 오른쪽 열로 이동 (커서가 끝에 있을 때만)
    else if (e.key === 'ArrowRight' && cursorAtEnd) {
      e.preventDefault();
      const currentFieldIndex = fields.indexOf(field);
      if (currentFieldIndex < fields.length - 1) {
        focusCell(rowIndex, fields[currentFieldIndex + 1]);
      }
    }
    // ArrowLeft: 왼쪽 열로 이동 (커서가 처음에 있을 때만)
    else if (e.key === 'ArrowLeft' && cursorAtStart) {
      e.preventDefault();
      const currentFieldIndex = fields.indexOf(field);
      if (currentFieldIndex > 0) {
        focusCell(rowIndex, fields[currentFieldIndex - 1]);
      }
    }
  };

  return (
    <div className="max-w-full mx-auto p-6">
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
        <button
          onClick={toggleSelectAll}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition duration-200"
        >
          전체 선택
        </button>
        <button
          onClick={saveSelected}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition duration-200"
        >
          선택 항목 저장
        </button>
      </div>

      {/* 테이블 형식 */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="w-full bg-[#16213e]">
          <thead className="bg-[#1a2642]">
            <tr>
              <th className="px-3 py-2 text-center text-gray-300 text-xs font-semibold border-r border-b border-gray-700">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={rows.length > 0 && rows.every((row) => row.selected)}
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
          <tbody>
            {rows.map((row, index) => {
              const generatedUrl = buildUTMUrl(row);
              const urlValidation = validateUrl(row.baseUrl);

              return (
                <tr
                  key={row.id}
                  className="hover:bg-[#1a2642]"
                >
                  <td className="px-3 py-2 text-center border-r border-b border-gray-700">
                    <input
                      type="checkbox"
                      checked={row.selected || false}
                      onChange={() => toggleSelect(row.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-2 text-center text-gray-300 text-sm border-r border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.baseUrl}
                      onChange={(e) =>
                        handleChange(row.id, "baseUrl", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "baseUrl")}
                      data-row-index={index}
                      data-field="baseUrl"
                      placeholder="https://example.com"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                    {!urlValidation.valid && row.baseUrl && (
                      <div className="text-red-400 text-xs mt-1">
                        ⚠️ {urlValidation.message}
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.source}
                      onChange={(e) =>
                        handleChange(row.id, "source", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "source")}
                      data-row-index={index}
                      data-field="source"
                      placeholder="google"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.medium}
                      onChange={(e) =>
                        handleChange(row.id, "medium", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "medium")}
                      data-row-index={index}
                      data-field="medium"
                      placeholder="cpc"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.campaign}
                      onChange={(e) =>
                        handleChange(row.id, "campaign", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "campaign")}
                      data-row-index={index}
                      data-field="campaign"
                      placeholder="spring_sale"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.term}
                      onChange={(e) =>
                        handleChange(row.id, "term", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "term")}
                      data-row-index={index}
                      data-field="term"
                      placeholder="running shoes"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <input
                      type="text"
                      value={row.content}
                      onChange={(e) =>
                        handleChange(row.id, "content", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "content")}
                      data-row-index={index}
                      data-field="content"
                      placeholder="banner_ad"
                      className="w-full bg-transparent text-gray-300 px-2 py-1 focus:bg-[#1a2642] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <div className="text-gray-300 text-sm max-w-sm overflow-x-auto whitespace-nowrap">
                      {generatedUrl || "필수 필드 입력"}
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-gray-700">
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => copyUrl(row)}
                        disabled={!generatedUrl}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition duration-200"
                      >
                        복사
                      </button>
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition duration-200"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BuilderTab;
