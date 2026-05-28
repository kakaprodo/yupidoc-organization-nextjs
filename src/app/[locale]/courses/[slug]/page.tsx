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

  if (!course) {
    return createPageMetadata({
      title: 'Course not found',
      description: 'The requested course could not be found.',
      path: `/courses/${slug}`
    });
  }

  return createPageMetadata({
    title: course.name,
    description: course.public_description?.learning_outcomes
      ? course.public_description.learning_outcomes.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      : course.name,
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
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const organization = getOrganization();
  const currency = organization.settings?.default_currency ?? 'CDF';
  const refundDays = organization.refund_payment_period ?? 0;
  const priceLabel = formatCurrency(course.price, locale, currency);
  const durationLabel = `${formatNumber(course.duration, locale)} days`;

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-base-content/40">
          <Link href="/courses" className="transition-colors hover:text-primary">
            Courses
          </Link>
          <span>›</span>
          <span className="text-base-content">{course.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300 ">
              <VideoWrapper
                videoUrl={course.public_description?.video_url}
                title={course.name}
                showTitle={false}
                showBorder
              />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-base-content">
              {course.name}
            </h1>

            <PublicDescriptionViewer
              publicDescription={course.public_description}
            />
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                  Course pricing
                </p>

                <div className="space-y-3">
                  <p className="text-4xl font-black text-primary">{priceLabel}</p>
                  <p className="text-sm text-base-content/60">Duration : {durationLabel}</p>
                </div>

                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Level</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Refund period</span>
                    <span>{refundDays} days</span>
                  </div>
                  <PurchaseLink paymentUrl={course.payment_url} label="JOIN COURSE" />
                </div>
              </div>

              <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
                <h3 className="mb-4 text-lg font-bold text-base-content">{t('categories')}</h3>
                <div className="space-y-3 text-sm text-base-content/70">
                  {course.course_domain_names?.map((domain) => (
                    <div key={domain} className="rounded-xl border border-base-200 bg-base-100 p-3">
                      {domain}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300 shadow-2xl">
                {course.image ? (
                  <Image src={course.image} alt={course.name} fill priority className="object-cover" />
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
