'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useTransition } from 'react';
import { useMounted } from '@/hooks/use-mounted';

const THEME_CLASSES = ['light', 'dark'];

export function ThemeSwitcher() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const [, startTransition] = useTransition();

  if (!mounted) {
    return <span className="btn btn-ghost btn-circle btn-sm" aria-hidden="true" />;
  }

  const activeTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const applyThemeClass = (nextTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    root.classList.remove(...THEME_CLASSES);
    root.classList.add(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(() => {
          const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

          applyThemeClass(nextTheme);
          setTheme(nextTheme);
        })
      }
      className="btn btn-ghost btn-circle btn-sm"
      aria-label="Toggle theme"
    >
      {activeTheme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}
