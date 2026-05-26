import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { getOrganization } from '@/services/content';
import { formatCurrency, formatNumber } from '@/utils/format';
import VideoWrapper from '@/components/VideoWrapper';
import PublicDescriptionViewer from '@/components/PublicDescriptionViewer';
import type { Program } from '@/types/general-type';
import { PurchaseLink } from './PurchaseLink';

interface ProgramDetailProps {
  program: Program;
}

export default async function ProgramDetail({ program }: ProgramDetailProps) {
  const locale = await getLocale();
  const t = await getTranslations('ProgramDetail');
  const organization = getOrganization();
  const currencyCode = organization.settings?.default_currency ?? 'RWF';
  const refundDays = organization.refund_payment_period ?? 0;
  const priceLabel = formatCurrency(program.price, locale, currencyCode);
  const durationLabel = `${formatNumber(program.duration, locale)} days`;

  return (
    <section className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-base-content/40">
        <Link href="/programs" className="transition-colors hover:text-primary">
          Programs
        </Link>
        <span>›</span>
        <span className="text-base-content">{program.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300">
            <VideoWrapper
              videoUrl={program.public_description?.video_url}
              title={program.title}
              showTitle={false}
              showBorder
            />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-base-content md:text-5xl">
            {program.title}
          </h1>

          <PublicDescriptionViewer
            publicDescription={program.public_description}
          />
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                PROGAM PRICING
              </p>

              <div className="space-y-3">
                <p className="text-4xl font-black text-primary">{priceLabel}</p>
                <p className="text-sm text-base-content/60">Duration: {durationLabel}</p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Refund period</span>
                    <span>{refundDays} days</span>
                  </div>
                </div>
                <PurchaseLink paymentUrl={program.payment_url} label="JOIN PROGRAM" />
              </div>
            </div>

            <div className="rounded-3xl border border-base-200 bg-base-200 p-8">
              <h3 className="mb-4 text-lg font-bold text-base-content">{t('categories')}</h3>
              <div className="space-y-3 text-sm text-base-content/70">
                {program.course_domain_names?.map((domain) => (
                  <div key={domain} className="rounded-xl border border-base-200 bg-base-100 p-3">
                    {domain}
                  </div>
                ))}
              </div>
            </div>


            <div className="relative aspect-video overflow-hidden rounded-3xl border border-base-300 shadow-2xl">
              {program.image ? (
                <Image src={program.image} alt={program.title} fill priority className="object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-base-content/25" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
