// 고유 ID 생성을 위한 카운터
let idCounter = 0;

/**
 * 고유한 ID를 생성합니다 (타임스탬프 + 카운터)
 * @returns {string} 고유한 ID
 */
const generateUniqueId = () => {
  idCounter++;
  return `${Date.now()}-${idCounter}`;
};

/**
 * 빈 행 객체를 생성합니다
 * @returns {Object} 새로운 빈 행 객체
 */
export const createEmptyRow = () => ({
  id: generateUniqueId(),
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
  id: generateUniqueId(),
  selected: false,
});
