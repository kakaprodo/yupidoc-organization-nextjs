import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { getCourseById, getOrganization } from '@/services/content';
import { formatCurrency, formatNumber } from '@/utils/format';
import VideoWrapper from '@/components/VideoWrapper';
import PublicDescriptionViewer from '@/components/PublicDescriptionViewer';
import type { Program, ProgramCourse } from '@/types/general-type';
import { PurchaseLink } from './PurchaseLink';

interface ProgramDetailProps {
  program: Program;
}

export default async function ProgramDetail({ program }: ProgramDetailProps) {
  const locale = await getLocale();
  const t = await getTranslations('ProgramDetail');
  const tNav = await getTranslations('Navigation');
  const tDetails = await getTranslations('Details');
  const tData = await getTranslations('ProgramsData');
  const tCourseData = await getTranslations('CoursesData');
  const tDomains = await getTranslations('Domains');

  const organization = getOrganization();
  const currencyCode = organization.settings?.default_currency ?? 'RWF';
  const refundDays = organization.refund_payment_period ?? 0;

  // Surcharge de traduction dynamique pour le programme
  const programTitle = tData.has(`${program.slug}.title`)
    ? tData(`${program.slug}.title`)
    : program.title;

  const translatedPublicDescription = {
    ...program.public_description,
    content: tData.has(`${program.slug}.description`)
      ? tData(`${program.slug}.description`)
      : program.public_description?.content,
  };

  const priceLabel = formatCurrency(program.price, locale, currencyCode);
  const durationLabel = `${formatNumber(program.duration, locale)} ${tDetails('days')}`;

  // Fonction de rendu interne tirant parti des traducteurs asynchrones résolus
  const renderProjectPreview = (shortCourse: ProgramCourse) => {
    // Résolution du slug du cours via son ID pour pouvoir le traduire
    const fullCourse = getCourseById(String(shortCourse.id));
    const courseName = (fullCourse && tCourseData.has(`${fullCourse.slug}.name`))
      ? tCourseData(`${fullCourse.slug}.name`)
      : shortCourse.name;

    return (
      <div
        key={shortCourse.id}
        className="flex items-center gap-3 rounded-md border border-base-300 bg-base-100 p-2"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-base-200">
          {shortCourse.image ? (
            <img src={shortCourse.image} alt={courseName} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-base-content/50">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-base-content truncate">{courseName}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-base-content/40">
        <Link href="/programs" className="transition-colors hover:text-primary">
          {tNav('programs')}
        </Link>
        <span>›</span>
        <span className="text-base-content">{programTitle}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300">
            <VideoWrapper
              videoUrl={program.public_description?.video_url}
              title={programTitle}
              showTitle={false}
              showBorder
            />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-base-content md:text-5xl">
            {programTitle}
          </h1>

          <PublicDescriptionViewer
            publicDescription={translatedPublicDescription}
          />
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                {t('purchase')}
              </p>

              <div className="space-y-3">

                <p className="text-4xl font-black text-primary">{priceLabel}</p>
                <p className="text-sm text-base-content/60">
                  {tDetails('duration')}: {durationLabel}
                </p>
                {program.display_as_free && (
                  <span className="badge badge-sm badge-primary animate-pulse">
                    {tDetails('sponsored')}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">{tDetails('refund')}</span>
                    <span>{refundDays} {tDetails('days')}</span>
                  </div>
                </div>
                <PurchaseLink paymentUrl={program.payment_url} label={t('purchase')} />
              </div>
            </div>

            {(program.courses ?? []).length > 0 && (
              <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
                <h3 className="mb-4 text-lg font-bold text-base-content">{t('coursesInProgram')}</h3>
                <div className="space-y-3 text-sm text-base-content/70">
                  {program.courses?.map(renderProjectPreview)}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
              <h3 className="mb-4 text-lg font-bold text-base-content">{t('categories')}</h3>
              <div className="space-y-3 text-sm text-base-content/70">
                {program.course_domain_names?.map((domain) => {
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
              {program.image ? (
                <Image src={program.image} alt={programTitle} fill priority className="object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-base-content/25" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
