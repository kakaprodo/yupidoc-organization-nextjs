import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import TeamCard from '@/components/TeamCard';
import { createPageMetadata } from '@/lib/metadata';
import { getAboutContent } from '@/services/content';

const TEAM: Array<{
  id: string;
  image: string;
  name?: string;
  role?: string;
  bio?: string;
}> = [
  { id: '1', image: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '2', image: 'https://i.pravatar.cc/150?u=david' },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Lead Instructor',
    bio: 'Senior Full Stack Developer who loves teaching complex concepts simply.',
    image: 'https://i.pravatar.cc/150?u=maria'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Community Manager',
    bio: 'Dedicated to fostering an inclusive and supportive environment for all.',
    image: 'https://i.pravatar.cc/150?u=james'
  }
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AboutPage');
  return createPageMetadata({
    title: t('Hero.title'),
    description: t('Hero.subtitle'),
    path: '/about'
  });
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');
  const about = getAboutContent();

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

      <section className="container mx-auto px-4 py-20">
        <div
          className="prose prose-lg dark:prose-invert mx-auto max-w-4xl text-center prose-headings:font-black prose-p:text-base-content/80"
          dangerouslySetInnerHTML={{ __html: about?.content ?? t('story.p1') }}
        />
      </section>

      <section className="bg-base-200 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-black text-base-content">{t('team.title')}</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name ?? t(`team.members.${member.id}.name`)}
                role={member.role ?? t(`team.members.${member.id}.role`)}
                bio={member.bio ?? t(`team.members.${member.id}.bio`)}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
