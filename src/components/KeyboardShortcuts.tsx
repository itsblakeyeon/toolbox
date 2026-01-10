import { memo } from "react";
import type { ShortcutCategory } from "@/types";

interface KeyboardShortcutsProps {
  shortcuts: ShortcutCategory[];
}

/**
 * Keyboard shortcuts guide component
 */
function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  return (
    <div className="mt-6 py-4 border-t border-[var(--border-subtle)]">
      <div className="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[var(--text-tertiary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          Shortcuts
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shortcuts.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h4 className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              {group.category}
            </h4>
            <div className="space-y-1">
              {group.items.map((shortcut, index) => (
                <div key={index} className="flex items-center gap-2">
                  <kbd className="notion-kbd min-w-[72px] text-center">
                    {shortcut.key}
                  </kbd>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(KeyboardShortcuts);
