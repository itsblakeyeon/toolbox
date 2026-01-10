"use client";

import { memo, useEffect } from "react";
import type { ToastState } from "@/types";

interface ToastProps extends ToastState {
  onClose: () => void;
}

/**
 * Toast notification component
 */
function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastClass = {
    success: "notion-toast-success",
    error: "notion-toast-error",
    warning: "notion-toast-warning",
  }[type];

  const iconPath = {
    success: "M5 13l4 4L19 7",
    error: "M6 18L18 6M6 6l12 12",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  }[type];

  const iconColor = {
    success: "text-[var(--accent-green)]",
    error: "text-[var(--accent-red)]",
    warning: "text-[var(--accent-yellow)]",
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`notion-toast ${toastClass} flex items-center gap-3`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={iconPath}
          />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

export default memo(Toast);
