import { useState, useCallback, useRef } from 'react'

/**
 * Undo/Redo 기능을 제공하는 Hook
 * @param {any} initialValue - 초기값
 * @param {number} maxHistory - 최대 히스토리 개수 (기본: 50)
 * @returns {object} { state, setState, undo, redo, canUndo, canRedo }
 */
export const useHistory = (initialValue, maxHistory = 50) => {
  const [state, setState] = useState(initialValue)
  const [history, setHistory] = useState([initialValue])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Undo 실행 중인지 여부 (setState 시 히스토리 추가 방지)
  const isUndoRedoing = useRef(false)

  // 상태 업데이트 (히스토리에 추가)
  const setStateWithHistory = useCallback((newState) => {
    // Undo/Redo 실행 중이면 히스토리 추가 안 함
    if (isUndoRedoing.current) {
      setState(newState)
      return
    }

    setState(newState)

    setHistory(prevHistory => {
      // 현재 인덱스 이후의 히스토리는 삭제 (새로운 분기 시작)
      const newHistory = prevHistory.slice(0, currentIndex + 1)
      newHistory.push(newState)

      // 최대 히스토리 개수 제한
      if (newHistory.length > maxHistory) {
        return newHistory.slice(newHistory.length - maxHistory)
      }

      return newHistory
    })

    setCurrentIndex(prev => {
      const newIndex = prev + 1
      // 최대 히스토리 개수 초과 시 인덱스 조정
      return newIndex >= maxHistory ? maxHistory - 1 : newIndex
    })
  }, [currentIndex, maxHistory])

  // Undo
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoing.current = true
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setState(history[newIndex])
      isUndoRedoing.current = false
    }
  }, [currentIndex, history])

  // Redo
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoing.current = true
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setState(history[newIndex])
      isUndoRedoing.current = false
    }
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    state,
    setState: setStateWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    currentIndex
  }
}
