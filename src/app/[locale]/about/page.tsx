import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { createPageMetadata } from '@/lib/metadata';
import { getAboutContent, getBriefMissionContent, getOrganization, getRandomConverImage } from '@/services/content';
import { stripHtml } from '@/utils/content';
import { AppEditor } from '@/components/editor/AppEditor';

export async function generateMetadata(): Promise<Metadata> {
  const organization = getOrganization();
  return createPageMetadata({
    title: `About ${organization.name}`,
    description: `Learn more about ${organization.name}.`,
    path: '/about'
  });
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');
  const about = getAboutContent();
  const mission = getBriefMissionContent();
  const heroImage = getRandomConverImage();

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} backgroundImage={heroImage} />

      <section className="container mx-auto max-w-3xl px-4 py-20">
        <div className="flex flex-col gap-8 mx-auto max-w-4xl">
          {about && <AppEditor content={about.content} editorType={about.editor_type} />}

          {mission ? (
            <div className="rounded-3xl border border-base-200 bg-base-200 shadow-sm p-8 text-center">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary">Mission</p>
              <p className="text-lg leading-relaxed text-base-content/75">
                {stripHtml(mission.content)}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
