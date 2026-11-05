import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { AppEditor } from "@/components/editor/AppEditor";
import { createPageMetadata } from "@/lib/metadata";
import {
    getArticleBySlug,
    getArticles,
    getArticleReadTime,
    getRandomArticles,
} from "@/services/content";
import ArticleCard from "@/components/ArticleCard";

export async function generateStaticParams() {
    return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return createPageMetadata({
            title: "Article not found",
            description: "The requested activity could not be found.",
            path: `/activities/${slug}`,
        });
    }

    return createPageMetadata({
        title: article.title,
        description: article.content
            .replace(/[#*_`>\-\[\]()]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160),
        path: `/activities/${article.slug}`,
        image: article.image_url ?? undefined,
    });
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const locale = await getLocale();
    const t = await getTranslations("Articles");
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const lastModifiedAt = article.updated_at ?? article.created_at;
    const readTime = getArticleReadTime(article);
    const lastModifiedDate = lastModifiedAt
        ? new Date(lastModifiedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;
    const relatedArticles = getRandomArticles(article.slug, 3);

    return (
        <div className="min-h-screen bg-base-100 pb-20">
            <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
                {article.image_url && (
                    <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-base-300 bg-base-200">
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            priority
                            className="object-cover  object-top"
                        />
                    </div>
                )}

                <header className="mb-10 border-b border-base-300 pb-8">
                    <h1 className="text-2xl font-black tracking-tight text-base-content md:text-4xl">
                        {article.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-base-content/60">
                        {lastModifiedDate && (
                            <time dateTime={lastModifiedAt ?? undefined}>
                                {t("lastModified")}: {lastModifiedDate}
                            </time>
                        )}
                        <span>{t("readTime", { count: readTime })}</span>
                    </div>
                </header>

                <AppEditor content={article.content} />

                {relatedArticles.length > 0 && (
                    <section className="mt-16 border-t border-base-300 pt-10">
                        <h2 className="mb-8 text-2xl font-bold tracking-tight text-base-content">
                            {t("moreActivities")}
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {relatedArticles.map((relatedArticle) => (
                                <ArticleCard
                                    key={relatedArticle.id}
                                    article={relatedArticle}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}
