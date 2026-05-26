import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { createPageMetadata } from '@/lib/metadata';
import { getOrganization, getTermsContent } from '@/services/content';

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

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

      <div className="container mx-auto mt-12 max-w-5xl px-4">
        <div className="rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm">
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: terms?.content ?? '<p>No terms content available.</p>' }}
          />
        </div>
      </div>
    </main>
  );
}
