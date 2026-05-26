'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { AlertTriangle, Home } from 'lucide-react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('NotFound');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-warning/20 bg-warning/10">
            <AlertTriangle className="h-14 w-14 text-warning" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-black text-base-content">{t('subtitle')}</h1>
        <p className="mx-auto mb-10 max-w-md text-base-content/60">
          Something went wrong while loading this page.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary rounded-xl text-white">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost rounded-xl">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

