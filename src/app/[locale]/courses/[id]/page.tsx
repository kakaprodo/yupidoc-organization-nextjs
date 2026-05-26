import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { createPageMetadata } from '@/lib/metadata';
import { getCourseById, getCourses, getOrganization } from '@/services/content';
import { formatCurrency, formatDuration } from '@/utils/format';

export async function generateStaticParams() {
  return getCourses().map((course) => ({
    id: String(course.id)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return createPageMetadata({
      title: 'Course not found',
      description: 'The requested course could not be found.',
      path: `/courses/${id}`
    });
  }

  return createPageMetadata({
    title: course.name,
    description: course.public_description?.learning_outcomes
      ? course.public_description.learning_outcomes.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      : course.name,
    path: `/courses/${id}`,
    image: course.image
  });
}

export default async function CourseDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations('Details');
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const organization = getOrganization();
  const currency = organization.settings?.default_currency ?? 'RWF';

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <div className="border-b border-base-200 bg-base-200/30 py-4">
        <div className="container mx-auto flex items-center gap-2 px-4 text-xs font-bold uppercase tracking-widest text-base-content/40">
          <Link href="/courses" className="transition-colors hover:text-primary">
            Courses
          </Link>
          <span>›</span>
          <span className="text-base-content">{course.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl">
              <Image src={course.image} alt={course.name} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-black/25" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black tracking-tight text-base-content md:text-5xl">{course.name}</h1>
              <p className="text-xl leading-relaxed text-base-content/70">
                {course.public_description?.content
                  ? course.public_description.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
                  : course.name}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-lg border-base-300 bg-base-200 py-4 font-bold text-base-content">
                  {course.level}
                </span>
                {course.course_domain_names?.map((domain) => (
                  <span
                    key={domain}
                    className="badge badge-lg border-base-300 bg-base-200 py-4 font-bold text-base-content"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            <section className="rounded-3xl border border-base-200 bg-base-200/30 p-8">
              <h2 className="mb-6 text-2xl font-bold">{t('whatYouWillLearn')}</h2>
              <div
                className="prose prose-slate dark:prose-invert max-w-none prose-p:text-base-content/70"
                dangerouslySetInnerHTML={{
                  __html:
                    course.public_description?.learning_outcomes ??
                    course.public_description?.content ??
                    '<p>No learning outcomes provided.</p>'
                }}
              />
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold">{t('description')}</h2>
              <div
                className="prose prose-slate dark:prose-invert max-w-none prose-p:text-base-content/70"
                dangerouslySetInnerHTML={{
                  __html: course.public_description?.content ?? '<p>No description provided.</p>'
                }}
              />
            </section>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-base-200 bg-base-200/40 p-8">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                  Course pricing
                </p>
                <div className="space-y-3">
                  <p className="text-4xl font-black text-primary">{formatCurrency(course.price, locale, currency)}</p>
                  <p className="text-sm text-base-content/60">{formatDuration(course.duration)}</p>
                </div>

                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Level</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Refund period</span>
                    <span>{organization.refund_payment_period} days</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Domains</span>
                    <span>{course.course_domain_names?.length ?? 0}</span>
                  </div>
                </div>
              </div>

              {course.public_description?.video_url ? (
                <a
                  href={course.public_description.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full rounded-xl text-white"
                >
                  Watch video
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

