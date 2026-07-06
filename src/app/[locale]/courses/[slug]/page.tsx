import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { createPageMetadata } from '@/lib/metadata';
import { getCourseBySlug, getCourses, getOrganization } from '@/services/content';
import { formatCurrency, formatNumber } from '@/utils/format';
import VideoWrapper from '@/components/VideoWrapper';
import PublicDescriptionViewer from '@/components/PublicDescriptionViewer';
import { PurchaseLink } from '@/components/PurchaseLink';

export async function generateStaticParams() {
  return getCourses().map((course) => ({
    slug: course.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const tData = await getTranslations('CoursesData');

  if (!course) {
    return createPageMetadata({
      title: 'Course not found',
      description: 'The requested course could not be found.',
      path: `/courses/${slug}`
    });
  }

  const courseName = tData.has(`${course.slug}.name`)
    ? tData(`${course.slug}.name`)
    : course.name;

  return createPageMetadata({
    title: courseName,
    description: course.public_description?.learning_outcomes
      ? course.public_description.learning_outcomes.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      : courseName,
    path: `/courses/${slug}`,
    image: course.image
  });
}

export default async function CourseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations('Details');
  const tNav = await getTranslations('Navigation');
  const tData = await getTranslations('CoursesData');
  const tDomains = await getTranslations('Domains');
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Surcharge de traduction dynamique du cours
  const courseName = tData.has(`${course.slug}.name`)
    ? tData(`${course.slug}.name`)
    : course.name;

  const translatedPublicDescription = {
    ...course.public_description,
    content: tData.has(`${course.slug}.description`)
      ? tData(`${course.slug}.description`)
      : course.public_description?.content,
  };

  const organization = getOrganization();
  const currency = organization.settings?.default_currency ?? 'CDF';
  const refundDays = organization.refund_payment_period ?? 0;
  const priceLabel = formatCurrency(course.price, locale, currency);
  const durationLabel = `${formatNumber(course.duration, locale)} ${t('days')}`;

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-base-content/40">
          <Link href="/courses" className="transition-colors hover:text-primary">
            {tNav('courses')}
          </Link>
          <span>›</span>
          <span className="text-base-content">{courseName}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300 ">
              <VideoWrapper
                videoUrl={course.public_description?.video_url}
                title={courseName}
                showTitle={false}
                showBorder
              />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-base-content md:text-5xl">
              {courseName}
            </h1>

            <PublicDescriptionViewer
              publicDescription={translatedPublicDescription}
            />
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                  {t('enrollToCourse')}
                </p>

                <div className="space-y-3">
                  <p className="text-4xl font-black text-primary">{priceLabel}</p>
                  <p className="text-sm text-base-content/60">{t('duration')}: {durationLabel}</p>
                  {course.display_as_free && (
                    <span className="badge badge-sm badge-primary animate-pulse">
                      {t('sponsored')}
                    </span>
                  )}
                </div>

                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">{t('level')}</span>
                    <span className="capitalize">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">{t('refund')}</span>
                    <span>{refundDays} {t('days')}</span>
                  </div>
                  <PurchaseLink paymentUrl={course.payment_url} label={t('purchase')} />
                </div>
              </div>

              <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
                <h3 className="mb-4 text-lg font-bold text-base-content">{t('categories')}</h3>
                <div className="space-y-3 text-sm text-base-content/70">
                  {course.course_domain_names?.map((domain) => {
                    const translatedDomain = tDomains.has(domain) ? tDomains(domain) : domain;
                    return (
                      <div key={domain} className="rounded-xl border border-base-200 bg-base-100 p-3">
                        {translatedDomain}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300 shadow-2xl">
                {course.image ? (
                  <Image src={course.image} alt={courseName} fill priority className="object-cover" />
                ) : null}
                <div className="absolute inset-0 bg-base-content/25" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}