import { useEffect } from "react";

/**
 * Toast notification component
 * Displays non-intrusive notifications instead of alert
 */
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Auto-dismiss after 2 seconds

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
    info: {
      background: "rgba(107, 114, 128, 0.2)",
      borderColor: "rgba(107, 114, 128, 0.4)",
    },
  }[type] || {
    background: "rgba(107, 114, 128, 0.2)",
    borderColor: "rgba(107, 114, 128, 0.4)",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
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
