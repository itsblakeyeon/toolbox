import { buildUTMUrl } from "../utils/urlBuilder";
import { validateUrl } from "../utils/validation";
import { createEmptyRow } from "../utils/rowFactory";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRowClipboard } from "../hooks/useRowClipboard";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import UTMTableInput from "./UTMTableInput";
import BuilderTableHeader from "./BuilderTableHeader";

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

  // 행 선택 모드 상태 (rowIndex가 선택되면 해당 행 전체 선택)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // 행 복사/붙여넣기 훅
  const { copyRow, pasteRow } = useRowClipboard();

  // 마지막으로 포커스된 필드 (행 선택 모드 진입 전)
  const [lastFocusedField, setLastFocusedField] = useState('baseUrl');

  // 한글 입력 조합 중 여부 (IME composition)
  const [isComposing, setIsComposing] = useState(false);

  // 행이 선택되었을 때 해당 행에 포커스
  useEffect(() => {
    if (selectedRowIndex !== null) {
      const rowElement = document.querySelector(`tr[data-row-index="${selectedRowIndex}"]`);
      if (rowElement) {
        rowElement.focus();
      }
    }
  }, [selectedRowIndex]);

  // 입력 필드 값 변경 핸들러
  const handleChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // 행 추가
  const addRow = () => {
    const newRow = createEmptyRow();
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
    setRows([createEmptyRow()]);
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
    if (rowIndex < 0) return;

    const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
    const nextInput = document.querySelector(selector);

    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  };

  // 행 선택 모드용 키보드 핸들러
  const handleRowSelectionKeyDown = (e, rowIndex) => {
    // Chrome 확장 프로그램 충돌 방지
    if (!e || !e.key) return;

    // ArrowUp: 위 행 선택
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (rowIndex > 0) {
        setSelectedRowIndex(rowIndex - 1);
      }
    }
    // ArrowDown: 아래 행 선택
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (rowIndex < rows.length - 1) {
        setSelectedRowIndex(rowIndex + 1);
      }
    }
    // Delete 또는 Backspace: 행 삭제
    else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      if (rows.length > 1) {
        deleteRow(rows[rowIndex].id);
        // 삭제 후 선택 해제 또는 이전 행 선택
        if (rowIndex > 0) {
          setSelectedRowIndex(rowIndex - 1);
        } else if (rows.length > 1) {
          setSelectedRowIndex(0);
        } else {
          setSelectedRowIndex(null);
        }
      } else {
        alert('최소 1개의 행은 필요합니다!');
      }
    }
    // Cmd/Ctrl + C: 행 복사
    else if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      e.preventDefault();
      if (copyRow(rows[rowIndex])) {
        alert('행이 복사되었습니다!');
      }
    }
    // Cmd/Ctrl + V: 행 붙여넣기
    else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
      e.preventDefault();
      const result = pasteRow(rows, rowIndex);
      if (result.success) {
        setRows(result.newRows);
        setSelectedRowIndex(result.insertedIndex);
        alert('행이 붙여넣어졌습니다!');
      }
    }
    // Enter 또는 다른 키: 행 선택 모드 해제 및 마지막 포커스된 필드로 포커스
    else if (e.key === 'Enter' || e.key.length === 1) {
      e.preventDefault();
      setSelectedRowIndex(null);
      focusCell(rowIndex, lastFocusedField);
    }
    // ESC: 행 선택 모드 해제
    else if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedRowIndex(null);
    }
  };

  // input 필드 포커스 핸들러 (행 선택 모드 해제)
  const handleInputFocus = (field) => {
    setSelectedRowIndex(null);
    setLastFocusedField(field);
  };

  // 키보드 이벤트 핸들러 (방향키, Enter, ESC, Delete, Cmd/Ctrl+C/V)
  const handleKeyDown = (e, rowIndex, field) => {
    // Chrome 확장 프로그램 충돌 방지
    if (!e || !e.target) return;

    // 한글 조합 중에는 키보드 네비게이션 무시
    if (isComposing) return;

    const input = e.target;
    const cursorAtStart = input.selectionStart === 0;
    const cursorAtEnd = input.selectionStart === input.value.length;

    // ESC: 행 전체 선택 모드로 전환
    if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedRowIndex(rowIndex);
      input.blur(); // 포커스 해제
      return;
    }

    // Cmd/Ctrl + C: 행 복사
    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      e.preventDefault();
      if (copyRow(rows[rowIndex])) {
        alert('행이 복사되었습니다!');
      }
      return;
    }

    // Cmd/Ctrl + V: 행 붙여넣기
    if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
      e.preventDefault();
      const result = pasteRow(rows, rowIndex);
      if (result.success) {
        setRows(result.newRows);
        alert('행이 붙여넣어졌습니다!');
      }
      return;
    }

    // Enter: 아래 행으로 이동 (마지막 행이면 새 행 추가)
    if (e.key === 'Enter') {
      e.preventDefault();

      // 마지막 행인 경우 새 행 추가
      if (rowIndex === rows.length - 1) {
        // flushSync로 동기적으로 상태 업데이트 후 포커스
        flushSync(() => {
          const newRow = createEmptyRow();
          setRows((prevRows) => [...prevRows, newRow]);
        });

        // DOM 업데이트를 기다린 후 포커스
        requestAnimationFrame(() => {
          focusCell(rowIndex + 1, field);
        });
      } else {
        focusCell(rowIndex + 1, field);
      }
    }
    // ArrowDown: 아래 행으로 이동
    else if (e.key === 'ArrowDown') {
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
          <BuilderTableHeader
            allSelected={rows.length > 0 && rows.every((row) => row.selected)}
            onToggleSelectAll={toggleSelectAll}
          />
          <tbody>
            {rows.map((row, index) => {
              const generatedUrl = buildUTMUrl(row);
              const urlValidation = validateUrl(row.baseUrl);

              return (
                <tr
                  key={row.id}
                  data-row-index={index}
                  tabIndex={selectedRowIndex === index ? 0 : -1}
                  onKeyDown={(e) => selectedRowIndex === index && handleRowSelectionKeyDown(e, index)}
                  className={`hover:bg-[#1a2642] ${selectedRowIndex === index ? 'bg-blue-900 ring-2 ring-blue-500' : ''}`}
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
                    <UTMTableInput
                      value={row.baseUrl}
                      field="baseUrl"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="https://example.com"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                    {!urlValidation.valid && row.baseUrl && (
                      <div className="text-red-400 text-xs mt-1">
                        ⚠️ {urlValidation.message}
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <UTMTableInput
                      value={row.source}
                      field="source"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="google"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <UTMTableInput
                      value={row.medium}
                      field="medium"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="cpc"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <UTMTableInput
                      value={row.campaign}
                      field="campaign"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="spring_sale"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <UTMTableInput
                      value={row.term}
                      field="term"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="running shoes"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700">
                    <UTMTableInput
                      value={row.content}
                      field="content"
                      rowId={row.id}
                      rowIndex={index}
                      placeholder="banner_ad"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-b border-gray-700 bg-[#0f1626]">
                    <div className={`text-sm max-w-sm overflow-x-auto whitespace-nowrap ${generatedUrl ? 'text-blue-400' : 'text-gray-500 italic'}`}>
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
