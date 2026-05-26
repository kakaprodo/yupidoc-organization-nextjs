import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { createPageMetadata } from '@/lib/metadata';
import { getPrivacyContent } from '@/services/content';
import { AppEditor } from '@/components/editor/AppEditor';

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
        {privacy && <AppEditor content={privacy.content} editorType={privacy.editor_type} />}
      </div>
    </main>
  );
}

