import { getTranslations } from 'next-intl/server';
import { Construction, Home, ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Construction className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="mb-2 text-8xl font-black select-none text-base-content/10">{t('title')}</h1>
        <h2 className="mb-6 text-3xl font-bold text-base-content md:text-4xl">{t('subtitle')}</h2>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-base-content/60">
          {t('description')}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn rounded-xl border-none bg-primary px-8 text-white shadow-lg shadow-primary/20">
            <Home className="mr-2 h-5 w-5" />
            {t('cta')}
          </Link>
          <Link href="/courses" className="btn btn-ghost rounded-xl text-base-content/60">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Courses
          </Link>
        </div>
      </div>
    </main>
  );
}

