'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = isClient && resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center gap-2 rounded-xl p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container active:scale-95 transition-all cursor-pointer touch-manipulation border border-outline-variant/30 ${className}`}
    >
      <span
        className="material-symbols-outlined text-[20px] transition-transform duration-200 select-none pointer-events-none"
        style={{
          transform: isDark ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        {isClient ? (isDark ? 'light_mode' : 'dark_mode') : 'dark_mode'}
      </span>
      {showLabel && (
        <span className="text-[13px] font-semibold tracking-tight text-on-surface">
          {isClient ? (isDark ? 'Light Theme' : 'Dark Theme') : 'Toggle Theme'}
        </span>
      )}
    </button>
  );
}
