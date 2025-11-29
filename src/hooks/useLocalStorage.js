import { useState, useEffect } from 'react'

/**
 * localStorage와 동기화되는 state를 관리하는 Hook
 * @param {string} key - localStorage 키
 * @param {any} initialValue - 초기값
 * @returns {[any, Function]} [저장된 값, 값 업데이트 함수]
 */
export const useLocalStorage = (key, initialValue) => {
  // localStorage에서 초기값 가져오기
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // 값이 변경되면 localStorage에 저장
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
