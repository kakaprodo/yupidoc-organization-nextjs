import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/metadata';
import { getProgramBySlug, getPrograms } from '@/services/content';
import ProgramDetail from '@/components/ProgramDetail';

export async function generateStaticParams() {
  return getPrograms().map((program) => ({
    slug: program.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return createPageMetadata({
      title: 'Program not found',
      description: 'The requested program could not be found.',
      path: `/programs/${slug}`
    });
  }

  return createPageMetadata({
    title: program.title,
    description: program.public_description?.content
      ? program.public_description.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      : program.title,
    path: `/programs/${slug}`,
    image: program.image
  });
}

export default async function ProgramDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base-100 pb-20">
      <ProgramDetail program={program} />
    </main>
  );
}
