/**
 * 빈 행 객체를 생성합니다
 * @returns {Object} 새로운 빈 행 객체
 */
export const createEmptyRow = () => ({
  id: Date.now(),
  baseUrl: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  selected: false,
});

/**
 * 복사된 행을 기반으로 새 행을 생성합니다
 * @param {Object} copiedRow - 복사된 행 데이터
 * @returns {Object} 새로운 ID를 가진 행 객체
 */
export const createRowFromCopied = (copiedRow) => ({
  ...copiedRow,
  id: Date.now(),
  selected: false,
});
