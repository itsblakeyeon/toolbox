"use client";

import { useReducer, useCallback, useRef } from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> =
  | { type: "SET"; payload: T }
  | { type: "RECORD"; payload: T }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "CLEAR" };

interface HistoryOptions {
  maxHistory?: number;
  debounceMs?: number;
  onUndoRedo?: (() => void) | null;
}

interface HistoryControls {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

/**
 * Hook providing undo/redo functionality for state management
 */
export const useHistory = <T>(
  initialState: T | (() => T),
  options: HistoryOptions = {}
): [T, (newState: T | ((prev: T) => T)) => void, HistoryControls] => {
  const { maxHistory = 50, onUndoRedo = null } = options;

  const createHistoryReducer = (maxHist: number) => {
    return (
      state: HistoryState<T>,
      action: HistoryAction<T>
    ): HistoryState<T> => {
      switch (action.type) {
        case "SET": {
          return {
            ...state,
            present: action.payload,
          };
        }

        case "RECORD": {
          const newPast = [...state.past, action.payload];
          if (newPast.length > maxHist) {
            newPast.shift();
          }
          return {
            past: newPast,
            present: state.present,
            future: [],
          };
        }

        case "UNDO": {
          if (state.past.length === 0) {
            return state;
          }

          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, -1);

          return {
            past: newPast,
            present: previous,
            future: [state.present, ...state.future],
          };
        }

        case "REDO": {
          if (state.future.length === 0) {
            return state;
          }

          const next = state.future[0];
          const newFuture = state.future.slice(1);

          return {
            past: [...state.past, state.present],
            present: next,
            future: newFuture,
          };
        }

        case "CLEAR": {
          return {
            past: [],
            present: state.present,
            future: [],
          };
        }

        default:
          return state;
      }
    };
  };

  const historyReducer = createHistoryReducer(maxHistory);

  const computedInitialState =
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState;

  const [state, dispatch] = useReducer(historyReducer, {
    past: [],
    present: computedInitialState,
    future: [],
  });

  const isUndoRedoActionRef = useRef(false);

  const cloneState = useCallback((s: T): T => {
    return structuredClone(s);
  }, []);

  const recordSnapshot = useCallback(
    (previousState: T) => {
      if (isUndoRedoActionRef.current) {
        return;
      }

      dispatch({
        type: "RECORD",
        payload: cloneState(previousState),
      });
    },
    [cloneState]
  );

  const setStateWithHistory = useCallback(
    (newStateOrUpdater: T | ((prev: T) => T)) => {
      const currentPresent = state.present;
      const newState =
        typeof newStateOrUpdater === "function"
          ? (newStateOrUpdater as (prev: T) => T)(currentPresent)
          : newStateOrUpdater;

      if (currentPresent === newState) {
        return;
      }

      recordSnapshot(currentPresent);

      dispatch({
        type: "SET",
        payload: newState,
      });
    },
    [state.present, recordSnapshot]
  );

  const undo = useCallback(() => {
    isUndoRedoActionRef.current = true;

    dispatch({ type: "UNDO" });

    if (onUndoRedo) onUndoRedo();

    requestAnimationFrame(() => {
      isUndoRedoActionRef.current = false;
    });
  }, [onUndoRedo]);

  const redo = useCallback(() => {
    isUndoRedoActionRef.current = true;

    dispatch({ type: "REDO" });

    if (onUndoRedo) onUndoRedo();

    requestAnimationFrame(() => {
      isUndoRedoActionRef.current = false;
    });
  }, [onUndoRedo]);

  return [
    state.present,
    setStateWithHistory,
    {
      undo,
      redo,
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
      clearHistory: () => {
        dispatch({ type: "CLEAR" });
      },
    },
  ];
};
