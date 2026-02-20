'use client';

import { useState, useMemo } from 'react';
import PageHero from '@/components/PageHero';
import ModuleCard from '@/components/ModuleCard';
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const PROGRAMS_DATA = [
    { id: "1", category: "Development", level: "Beginner", learners: "1,234", duration: "6h 30m", price: "$39.99", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600" },
    { id: "2", category: "Marketing", level: "Intermediate", learners: "856", duration: "4h 10m", price: "$29.99", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600" },
    { id: "3", category: "Design", level: "All Levels", learners: "2,100", duration: "3h 45m", price: "$34.99", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600" }
];

export default function ProgramsPage() {
    const t = useTranslations('ProgramsPage');
    const tContent = useTranslations('Programs');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => PROGRAMS_DATA.filter(p =>
        tContent(`items.${p.id}.title`).toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, tContent]);

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

            <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">
                <div className="max-w-xl mx-auto mb-16 shadow-2xl rounded-xl overflow-hidden bg-base-100 border border-base-300">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input
                            type="text"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search programs..."
                            className="input w-full pl-12 h-14 border-none focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ModuleCard
                                    {...item}
                                    title={tContent(`items.${item.id}.title`)}
                                    description={tContent(`items.${item.id}.description`)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Message si aucun résultat */}
                {filtered.length === 0 && (
                    <div className="text-center py-20 text-base-content/50 italic">
                        No programs found matching your search.
                    </div>
                )}
            </div>
        </main>
    );
}