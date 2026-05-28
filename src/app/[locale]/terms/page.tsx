import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { createPageMetadata } from '@/lib/metadata';
import { getOrganization, getRandomConverImage, getTermsContent } from '@/services/content';
import { AppEditor } from '@/components/editor/AppEditor';

export async function generateMetadata(): Promise<Metadata> {
  const organization = getOrganization();
  return createPageMetadata({
    title: `Terms & Services | ${organization.name}`,
    description: `Read the terms and services for ${organization.name}.`,
    path: '/terms'
  });
}

export default async function TermsPage() {
  const t = await getTranslations('TermsPage');
  const terms = getTermsContent();
  const heroImage = getRandomConverImage();

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} backgroundImage={heroImage} />

      <div className="container mx-auto mt-12 max-w-3xl px-4">
        {terms && <AppEditor content={terms.content} editorType={terms.editor_type} />}
      </div>
    </main>
  );
}
