import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import ArticleCard from '@/components/ArticleCard';
import { createPageMetadata } from '@/lib/metadata';
import { getArticles, getRandomArticleImage } from '@/services/content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Articles');

  return createPageMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/activities',
    image: getRandomArticleImage() ?? undefined,
  });
}

export default async function ActivitiesPage() {
  const t = await getTranslations('Articles');
  const articles = getArticles();
  const heroImage = getRandomArticleImage();

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      <PageHero title={t('title')} subtitle={t('subtitle')} backgroundImage={heroImage} />

      {articles.length > 0 ? (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:px-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-5xl px-4 py-16 text-center text-base-content/60">
          {t('empty')}
        </p>
      )}
    </div>
  );
}
