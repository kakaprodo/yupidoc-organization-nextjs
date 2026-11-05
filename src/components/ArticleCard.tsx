import Image from "next/image";
import { BookOpenText } from "lucide-react";
import { Link } from "@/navigation";
import type { Article } from "@/types/general-type";
import { getArticleExcerpt } from "@/services/content";

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Link
            href={`/activities/${article.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
        >
            <div className="relative aspect-video overflow-hidden bg-base-200">
                {article.image_url ? (
                    <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover object-center object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-base-300 text-primary">
                        <BookOpenText className="h-10 w-10" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold leading-tight text-base-content transition-colors group-hover:text-primary">
                    {article.title}
                </h3>
                <p className="line-clamp-3 text-base leading-relaxed text-base-content/70">
                    {getArticleExcerpt(article)}
                </p>
            </div>
        </Link>
    );
}
