import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/metadata";
import {
    getOrganization,
    getHeroSlides,
    getBriefMissionContent,
    getFeaturedArticles,
    getFeaturedCourses,
    getFeaturedPrograms,
    getRandomConverImage,
} from "@/services/content";
import { stripHtml } from "@/utils/content";
import ArticleCard from "@/components/ArticleCard";

export async function generateMetadata(): Promise<Metadata> {
    const organization = getOrganization();
    const mission = getBriefMissionContent();
    return createPageMetadata({
        title: organization.name,
        description: mission
            ? stripHtml(mission.content)
            : "Discover courses, programs, and practical learning paths.",
        path: "/",
        image: getRandomConverImage() as string,
    });
}

export default async function HomePage() {
    const tCourses = await getTranslations("Courses.featured");
    const tPrograms = await getTranslations("Programs");
    const tArticles = await getTranslations("Articles");

    const featuredCourses = getFeaturedCourses();
    const featuredPrograms = getFeaturedPrograms();
    const featuredArticles = getFeaturedArticles(2);
    const heroSlides = getHeroSlides();

    return (
        <div className="flex flex-col gap-24 bg-base-100 pb-20">
            <HeroSection slides={heroSlides} />

            {featuredArticles.length > 0 && (
                <section className="container mx-auto px-4 lg:px-8">
                    <SectionHeader
                        title={tArticles("title")}
                        href="/activities"
                        linkText={tArticles("viewMore")}
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:px-32  xl:px-48 ">
                        {featuredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            )}

            {featuredCourses.length > 0 && (
                <section className="container mx-auto px-4 lg:px-8">
                    <SectionHeader
                        title={tCourses("title")}
                        href="/courses"
                        linkText={tCourses("viewMore")}
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {featuredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                title={course.name}
                                domains={course.course_domain_names ?? []}
                                level={course.level}
                                durationDays={course.duration}
                                image={course.image}
                                entity={course}
                            />
                        ))}
                    </div>
                </section>
            )}

            {featuredPrograms.length > 0 && (
                <section className="container mx-auto px-4 lg:px-8">
                    <SectionHeader
                        title={tPrograms("title")}
                        href="/programs"
                        linkText={tPrograms("viewMore")}
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {featuredPrograms.map((program) => (
                            <CourseCard
                                key={program.id}
                                href={`/programs/${program.slug}`}
                                title={program.title}
                                domains={program.course_domain_names ?? []}
                                level="Program"
                                durationDays={program.duration}
                                image={program.image}
                                entity={program}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
