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
  const t = useTranslations('ErrorPage');

  useEffect(() => {
    console.error('Build or Runtime Error:', error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-base-100 px-6 py-12 transition-colors duration-200">
      <div className="flex max-w-md flex-col items-center text-center">

        {/* Icône d'avertissement stylisée avec DaisyUI */}
        <div className="mb-6 rounded-full bg-error/10 p-4 text-error animate-pulse">
          <ChevronWarningIcon className="h-12 w-12" />
        </div>

        <h1 className="mb-3 text-3xl font-black tracking-tight text-base-content">
          {t('title')}
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-base-content/60">
          {t('description')}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 w-full sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary w-full sm:w-auto rounded-xl text-white"
          >
            {t('retry')}
          </button>

          <Link
            href="/"
            className="btn btn-ghost w-full sm:w-auto rounded-xl border border-base-300 hover:bg-base-200"
          >
            <Home className="mr-2 h-4 w-4" />
            {t('home')}
          </Link>
        </div>
      </div>
    </section>
  );
}

// Icône d'erreur alternative (AlertTriangle de lucide ou similaire)
function ChevronWarningIcon(props: React.ComponentProps<'svg'>) {
  return <AlertTriangle {...props} />;
}