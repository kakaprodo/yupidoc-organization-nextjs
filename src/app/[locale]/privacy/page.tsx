import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { createPageMetadata } from '@/lib/metadata';
import { getPrivacyContent } from '@/services/content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('PolicyPage');
  return createPageMetadata({
    title: t('Hero.title'),
    description: t('Hero.subtitle'),
    path: '/privacy'
  });
}

export default async function PolicyPage() {
  const t = await getTranslations('PolicyPage');
  const privacy = getPrivacyContent();

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

      <div className="container mx-auto mt-12 max-w-5xl space-y-6 px-4">
        <div className="prose prose-slate dark:prose-invert max-w-none rounded-2xl border border-base-200 bg-base-100 p-8 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: privacy?.content ?? '<p>No privacy content available.</p>' }} />
        </div>
      </div>
    </main>
  );
}

