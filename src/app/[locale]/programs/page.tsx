import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import CourseCard from '@/components/CourseCard';
import { createPageMetadata } from '@/lib/metadata';
import { getPrograms, getPlainTextDescription, getOrganization } from '@/services/content';
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
  const organization = getOrganization();
  return createPageMetadata({
    title: `${organization.name} - ${t('Hero.title')}`,
    description: t('Hero.subtitle'),
    path: '/programs',
    image: getRandomConverImage() as string
  });
}

export default async function ProgramsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations('ProgramsPage');
  const tData = await getTranslations('ProgramsData');
  const tDomains = await getTranslations('Domains');

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? '';
  const heroImage = getRandomConverImage();

  const searchSection = (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-white/15 dark:border-white/5 bg-white/10 dark:bg-black/20 p-4 backdrop-blur-md md:flex-row md:items-center transition-all duration-300">
      <form method="get" className="flex w-full items-center gap-3">
        <input
          type="search"
          name="q"
          defaultValue={resolvedSearchParams.q ?? ''}
          placeholder={t('Filters.search')}
          className="input w-full rounded-xl border-0 bg-base-100 text-base-content placeholder:text-base-content/50 focus:outline-none transition-colors duration-300 shadow-inner"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-xl text-white transition-all duration-300 hover:scale-[1.02] shadow-md"
        >
          {t('Filters.submit')}
        </button>
      </form>
    </div>
  );

  const filtered = getPrograms().filter((program) => {
    const translatedTitle = tData.has(`${program.slug}.title`)
      ? tData(`${program.slug}.title`)
      : program.title;

    const translatedDesc = tData.has(`${program.slug}.description`)
      ? tData(`${program.slug}.description`)
      : getPlainTextDescription(program.public_description?.content);

    const searchable = [
      program.title,
      translatedTitle,
      program.course_domain_names?.join(' '),
      getPlainTextDescription(program.public_description?.content),
      translatedDesc
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
          <div className="py-20 text-center text-base-content/50 font-medium">
            {t('Filters.noResults')}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((program) => {
              // Surcharge locale du titre du programme
              const programTitle = tData.has(`${program.slug}.title`)
                ? tData(`${program.slug}.title`)
                : program.title;

              // Traduction des domaines d'apprentissage du programme
              const translatedDomains = (program.course_domains ?? []).map((dom: { name: string }) =>
                tDomains.has(dom.name) ? tDomains(dom.name) : dom.name
              );

              return (
                <CourseCard
                  key={program.id}
                  href={`/programs/${program.slug}`}
                  title={programTitle}
                  domains={translatedDomains}
                  level="Program"
                  durationDays={program.duration}
                  image={program.image}
                  entity={program}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}