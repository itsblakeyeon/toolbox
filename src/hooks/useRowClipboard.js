import { useState } from 'react';
import { createRowFromCopied } from '../utils/rowFactory';

/**
 * 행 복사/붙여넣기 기능을 제공하는 훅
 * @returns {Object} { copiedRow, copyRow, pasteRow, hasCopiedRow }
 */
export const useRowClipboard = () => {
  const [copiedRow, setCopiedRow] = useState(null);

  /**
   * 행을 클립보드에 복사
   * @param {Object} row - 복사할 행 데이터
   * @returns {boolean} 성공 여부
   */
  const copyRow = (row) => {
    setCopiedRow({ ...row });
    return true;
  };

  /**
   * 클립보드의 행을 특정 위치에 붙여넣기
   * @param {Array} rows - 현재 행 배열
   * @param {number} rowIndex - 붙여넣을 위치 (해당 인덱스 다음에 삽입)
   * @returns {Object} { success: boolean, newRows: Array, insertedIndex: number }
   */
  const pasteRow = (rows, rowIndex) => {
    if (!copiedRow) {
      return { success: false };
    }

    const newRow = createRowFromCopied(copiedRow);
    const newRows = [
      ...rows.slice(0, rowIndex + 1),
      newRow,
      ...rows.slice(rowIndex + 1)
    ];

    return {
      success: true,
      newRows,
      insertedIndex: rowIndex + 1
    };
  };

  return {
    copiedRow,
    copyRow,
    pasteRow,
    hasCopiedRow: copiedRow !== null
  };
};
