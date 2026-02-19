'use client';

import HeroCarousel from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";

const FEATURED_COURSES = [
    { id: 1, title: "Advanced Web Development", category: "Web Design", description: "Master modern web technologies including React, Node.js, and cloud deployment.", price: "$49.99", instructorAvatar: "https://i.pravatar.cc/150?u=1", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400" },
    { id: 2, title: "Startup Leadership: 101", category: "Management", description: "Learn the fundamentals of building a team, managing finances, and scaling.", price: "$89.99", instructorAvatar: "https://i.pravatar.cc/150?u=2", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400" },
    { id: 3, title: "UI/UX Design Principles", category: "Design", description: "Create beautiful and functional user interfaces with our comprehensive course.", price: "$39.99", instructorAvatar: "https://i.pravatar.cc/150?u=3", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400" },
];

const MODULES = [
    { id: 1, title: "Physics Mechanics", category: "Science", description: "Deep dive into Newtonian mechanics, forces, and motion dynamics.", price: "Free", metaInfo: "8 Lessons", accentColor: "bg-blue-500", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400" },
    { id: 2, title: "Intro to SQL", category: "Data", description: "Learn how to query databases effectively using standard SQL syntax.", price: "$19.99", metaInfo: "10 Lessons", accentColor: "bg-pink-500", image: "https://images.unsplash.com/photo-1544383023-53f0c67bb724?q=80&w=400" },
    { id: 3, title: "Cybersecurity Basics", category: "Security", description: "Protect yourself and your organization from common digital threats.", price: "$29.99", metaInfo: "12 Lessons", accentColor: "bg-green-500", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
];

export default function HomePage() {
    return (
        <div className="flex flex-col gap-24 pb-20">
            <HeroCarousel />

            {/* Section Featured Courses */}
            <section className="container mx-auto px-4">
                <SectionHeader title="Featured Courses" href="/courses" linkText="View more courses" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COURSES.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard {...course} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section Learning Modules */}
            <section className="container mx-auto px-4">
                <SectionHeader title="Learning Modules" href="/modules" linkText="View more modules" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MODULES.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard {...module} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section Comprehensive Programs */}
            <section className="container mx-auto px-4">
                <SectionHeader title="Comprehensive Programs" href="/programs" linkText="View more programs" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COURSES.map((course, index) => (
                        <motion.div
                            key={`prog-${course.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard {...course} metaInfo="6 Months + Certificate" instructorAvatar={undefined} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}