'use client';

import HeroCarousel from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// On ne garde ici que les données techniques (images, prix, ids)
const COURSES_DATA = [
    { id: "1", category: "Web Design", price: "$49.99", avatar: "https://i.pravatar.cc/150?u=1", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400" },
    { id: "2", category: "Management", price: "$89.99", avatar: "https://i.pravatar.cc/150?u=2", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400" },
    { id: "3", category: "Design", price: "$39.99", avatar: "https://i.pravatar.cc/150?u=3", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400" },
];

const MODULES_DATA = [
    {
        id: "1",
        category: "Science",
        price: "Free",
        meta: "8 Lessons",
        color: "bg-blue-500",
        img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400"
    },
    {
        id: "2",
        category: "Data",
        price: "$19.99",
        meta: "10 Lessons",
        color: "bg-pink-500",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400" // ID SQL Fixé
    },
    {
        id: "3",
        category: "Security",
        price: "$29.99",
        meta: "12 Lessons",
        color: "bg-green-500",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400"
    },
];

export default function HomePage() {
    // Initialisation des traducteurs
    const tCourses = useTranslations('Courses.featured');
    const tModules = useTranslations('Modules');

    return (
        <div className="flex flex-col gap-24 pb-20">
            <HeroCarousel />

            {/* Section Featured Courses */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    title={tCourses('title')}
                    href="/courses"
                    linkText={tCourses('viewMore')}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COURSES_DATA.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard
                                title={tCourses(`items.${item.id}.title`)}
                                description={tCourses(`items.${item.id}.description`)}
                                category={item.category}
                                price={item.price}
                                instructorAvatar={item.avatar}
                                image={item.img}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section Learning Modules */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    title={tModules('title')}
                    href="/modules"
                    linkText={tModules('viewMore')}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MODULES_DATA.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard
                                title={tModules(`items.${item.id}.title`)}
                                description={tModules(`items.${item.id}.description`)}
                                category={item.category}
                                price={item.price}
                                metaInfo={item.meta}
                                accentColor={item.color}
                                image={item.img}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}