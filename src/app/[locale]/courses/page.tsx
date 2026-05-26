import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import PageHero from '@/components/PageHero';
import CourseCard from '@/components/CourseCard';
import { createPageMetadata } from '@/lib/metadata';
import { getCourses, getPlainTextDescription } from '@/services/content';
import { getRandomConverImage } from '@/services/content';

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

const ITEMS_PER_PAGE = 6;

function buildCoursesHref(query: string, page: number) {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }
  if (page > 1) {
    params.set('page', String(page));
  }

  const suffix = params.toString();
  return suffix ? `/courses?${suffix}` : '/courses';
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('CoursesPage');
  return createPageMetadata({
    title: t('Hero.title'),
    description: t('Hero.subtitle'),
    path: '/courses'
  });
}

export default async function CoursesPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations('CoursesPage');
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? '';
  const requestedPage = Number.parseInt(resolvedSearchParams.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const filtered = getCourses().filter((course) => {
    const searchable = [
      course.name,
      course.level,
      course.course_domain_names?.join(' '),
      getPlainTextDescription(course.public_description?.content)
    ]
      .join(' ')
      .toLowerCase();

    return query.length === 0 || searchable.includes(query);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visibleCourses = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const heroImage = getRandomConverImage();

  const searchSection = (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md md:flex-row md:items-center">


      <form method="get" className="flex w-full gap-3">
        <input
          type="search"
          name="q"
          defaultValue={resolvedSearchParams.q ?? ''}
          placeholder={t('Filters.search')}
          className="input w-full rounded-xl border-0 bg-white/90 text-base-content placeholder:text-base-content/50 focus:outline-none"
        />
        <input type="hidden" name="page" value="1" />
        <button type="submit" className="btn btn-primary rounded-xl text-white">
          Search
        </button>
      </form>
    </div>
  );

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <PageHero
        title={t('Hero.title')}
        subtitle={t('Hero.subtitle')}
        backgroundImage={heroImage}
        searchSection={searchSection}
      />

      <div className="container mx-auto -mt-8 px-4 lg:px-8  bg-base-100 pt-8 rounded-2xl backdrop-blur-sm">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-medium text-base-content/50">
              No courses match your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  title={course.name}
                  domains={course.course_domain_names ?? []}
                  level={course.level}
                  durationDays={course.duration}
                  image={course.image}
                  entity={course}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="mt-20 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={buildCoursesHref(resolvedSearchParams.q ?? '', Math.max(1, currentPage - 1))}
                  className="btn btn-square btn-outline border-base-300"
                  aria-disabled={currentPage === 1}
                >
                  ‹
                </Link>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const nextPage = index + 1;
                  return (
                    <Link
                      key={nextPage}
                      href={buildCoursesHref(resolvedSearchParams.q ?? '', nextPage)}
                      className={`btn btn-square border-none ${currentPage === nextPage
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-base-200 text-base-content hover:bg-base-300'
                        }`}
                    >
                      {nextPage}
                    </Link>
                  );
                })}

                <Link
                  href={buildCoursesHref(resolvedSearchParams.q ?? '', Math.min(totalPages, currentPage + 1))}
                  className="btn btn-square btn-outline border-base-300"
                  aria-disabled={currentPage === totalPages}
                >
                  ›
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
