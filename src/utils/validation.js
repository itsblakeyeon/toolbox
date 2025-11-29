/**
 * URL의 유효성을 검사합니다
 * @param {string} url - 검사할 URL
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateUrl = (url) => {
  // 빈 문자열이면 검사하지 않음
  if (!url) {
    return { valid: true, message: '' }
  }

  try {
    // 프로토콜이 없으면 자동으로 https:// 추가
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    new URL(fullUrl)
    return { valid: true, message: '' }
  } catch (error) {
    return { valid: false, message: 'URL 형식이 올바르지 않습니다' }
  }
}

/**
 * 필수 필드들이 모두 채워졌는지 검사합니다
 * @param {Object} row - 행 데이터
 * @returns {boolean}
 */
export const hasRequiredFields = (row) => {
  return !!(row.baseUrl && row.source && row.medium && row.campaign)
}
