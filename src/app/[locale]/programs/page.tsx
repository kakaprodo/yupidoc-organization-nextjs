import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import CourseCard from '@/components/CourseCard';
import { createPageMetadata } from '@/lib/metadata';
import { getPrograms, getPlainTextDescription } from '@/services/content';
import { getRandomConverImage } from '@/services/content';

type SearchParams = Promise<{
  q?: string;
}>;

function buildProgramsHref(query: string) {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  const suffix = params.toString();
  return suffix ? `/programs?${suffix}` : '/programs';
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProgramsPage');
  return createPageMetadata({
    title: t('Hero.title'),
    description: t('Hero.subtitle'),
    path: '/programs'
  });
}

export default async function ProgramsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations('ProgramsPage');
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? '';
  const heroImage = getRandomConverImage();

  const searchSection = (
    <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
      <form method="get" className="flex w-full items-center gap-3">
        <input
          type="search"
          name="q"
          defaultValue={resolvedSearchParams.q ?? ''}
          placeholder="Search programs..."
          className="input w-full rounded-xl border-0 bg-white/90 text-base-content placeholder:text-base-content/50 focus:outline-none"
        />
        <button type="submit" className="btn btn-primary rounded-xl text-white">
          Search
        </button>
      </form>
    </div>
  );

  const filtered = getPrograms().filter((program) => {
    const searchable = [
      program.title,
      program.course_domain_names?.join(' '),
      getPlainTextDescription(program.public_description?.content)
    ]
      .join(' ')
      .toLowerCase();

    return query.length === 0 || searchable.includes(query);
  });

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero
        title={t('Hero.title')}
        subtitle={t('Hero.subtitle')}
        backgroundImage={heroImage}
        searchSection={searchSection}
      />

      <div className="container mx-auto -mt-8 px-4 lg:px-8 bg-base-100 pt-8 rounded-2xl backdrop-blur-sm">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-base-content/50">
            No programs found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((program) => (
              <CourseCard
                key={program.id}
                href={`/programs/${program.slug}`}
                title={program.title}
                domains={program.course_domain_names ?? []}
                level="Program"
                durationDays={program.duration}
                image={program.image}
                entity={program}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
