import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import CourseCard from '@/components/CourseCard';
import { createPageMetadata } from '@/lib/metadata';
import { getPrograms, getPlainTextDescription } from '@/services/content';
import { excerpt } from '@/utils/content';
import { formatCurrency, formatDuration } from '@/utils/format';

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
  const locale = await getLocale();
  const t = await getTranslations('ProgramsPage');
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? '';

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
      <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

      <div className="container mx-auto -mt-8 px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-xl rounded-2xl border border-base-200 bg-base-100 shadow-2xl">
          <form method="get" className="relative flex items-center gap-3 p-4">
            <input
              type="search"
              name="q"
              defaultValue={resolvedSearchParams.q ?? ''}
              placeholder="Search programs..."
              className="input w-full border-none bg-base-100 pl-2 text-base-content focus:outline-none"
            />
            <button type="submit" className="btn btn-primary rounded-xl text-white">
              Search
            </button>
          </form>
        </div>

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
                description={excerpt(getPlainTextDescription(program.public_description?.content), 120)}
                category={program.course_domain_names?.[0] ?? 'Program'}
                price={formatCurrency(program.price, locale)}
                image={program.image}
                metaInfo={formatDuration(program.duration)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
