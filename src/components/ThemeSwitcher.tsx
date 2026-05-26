'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useTransition } from 'react';
import { useMounted } from '@/hooks/use-mounted';

export function ThemeSwitcher() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const [, startTransition] = useTransition();

  if (!mounted) {
    return <span className="btn btn-ghost btn-circle btn-sm" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        })
      }
      className="btn btn-ghost btn-circle btn-sm"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}

