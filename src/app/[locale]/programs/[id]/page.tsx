import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { createPageMetadata } from '@/lib/metadata';
import { getProgramById, getPrograms, getOrganization } from '@/services/content';
import { formatCurrency, formatDuration } from '@/utils/format';

export async function generateStaticParams() {
  return getPrograms().map((program) => ({
    id: String(program.id)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const program = getProgramById(id);

  if (!program) {
    return createPageMetadata({
      title: 'Program not found',
      description: 'The requested program could not be found.',
      path: `/programs/${id}`
    });
  }

  return createPageMetadata({
    title: program.title,
    description: program.public_description?.content
      ? program.public_description.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      : program.title,
    path: `/programs/${id}`,
    image: program.image
  });
}

export default async function ProgramDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations('ProgramDetail');
  const program = getProgramById(id);

  if (!program) {
    notFound();
  }

  const organization = getOrganization();
  const currency = organization.settings?.default_currency ?? 'RWF';

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <div className="border-b border-base-200 bg-base-200/30 py-4">
        <div className="container mx-auto flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">
          <Link href="/programs" className="transition-colors hover:text-primary">
            Programs
          </Link>
          <span>›</span>
          <span className="text-base-content">{program.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl">
              <Image src={program.image} alt={program.title} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-black/25" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black tracking-tight text-base-content md:text-5xl">{program.title}</h1>
              <p className="text-xl leading-relaxed text-base-content/70">
                {program.public_description?.content
                  ? program.public_description.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
                  : program.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {program.course_domain_names?.map((domain) => (
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
                    program.public_description?.learning_outcomes ??
                    program.public_description?.content ??
                    '<p>No learning outcomes provided.</p>'
                }}
              />
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold">{t('aboutTitle')}</h2>
              <div
                className="prose prose-slate dark:prose-invert max-w-none prose-p:text-base-content/70"
                dangerouslySetInnerHTML={{
                  __html: program.public_description?.content ?? '<p>No description provided.</p>'
                }}
              />
            </section>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-base-200 bg-base-200/40 p-8">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-base-content/40">
                  Program pricing
                </p>
                <div className="space-y-3">
                  <p className="text-4xl font-black text-primary">{formatCurrency(program.price, locale, currency)}</p>
                  <p className="text-sm text-base-content/60">{formatDuration(program.duration)}</p>
                </div>

                <div className="mt-8 space-y-4 border-t border-base-200 pt-6 text-sm text-base-content/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Learning areas</span>
                    <span>{program.course_domain_names?.length ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base-content">Refund period</span>
                    <span>{organization.refund_payment_period} days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-base-200 bg-base-200/40 p-8">
                <h3 className="mb-4 text-lg font-bold text-base-content">{t('coreModules')}</h3>
                <div className="space-y-3 text-sm text-base-content/70">
                  {program.course_domain_names?.map((domain) => (
                    <div key={domain} className="rounded-xl border border-base-200 bg-base-100 p-3">
                      {domain}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

