"use client";

import { useEffect } from "react";
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

  const bgStyle = {
    success: {
      background: "rgba(34, 197, 94, 0.2)",
      borderColor: "rgba(34, 197, 94, 0.4)",
    },
    error: {
      background: "rgba(239, 68, 68, 0.2)",
      borderColor: "rgba(239, 68, 68, 0.4)",
    },
    warning: {
      background: "rgba(234, 179, 8, 0.2)",
      borderColor: "rgba(234, 179, 8, 0.4)",
    },
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-left">
      <div
        className="glass-strong text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2"
        style={bgStyle}
      >
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
