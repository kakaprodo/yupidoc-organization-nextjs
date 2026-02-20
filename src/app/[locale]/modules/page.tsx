'use client';

import { useState, useMemo } from 'react';
import PageHero from "@/components/PageHero";
import ModuleCard from "@/components/ModuleCard";
import { useTranslations } from "next-intl";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const MODULES_TECHNICAL_DATA = [
    {
        id: "1",
        category: "Development",
        level: "Beginner",
        learners: "1,234",
        duration: "6h 30m",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600"
    },
    {
        id: "2",
        category: "Marketing",
        level: "Intermediate",
        learners: "856",
        duration: "4h 10m",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600"
    },
    {
        id: "3",
        category: "Design",
        level: "All Levels",
        learners: "2,100",
        duration: "3h 45m",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600"
    }
];

export default function ModulesPage() {
    // 1. DÉCLARATION DES HOOKS AU SOMMET (TOUJOURS ICI)
    const t = useTranslations('ModulesPage');
    const tContent = useTranslations('Modules');
    const tFilters = useTranslations('CoursesPage'); // On l'ajoute ici pour la recherche

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredModules = useMemo(() => {
        return MODULES_TECHNICAL_DATA.filter(module => {
            const query = searchQuery.toLowerCase();
            const translatedTitle = tContent(`items.${module.id}.title`).toLowerCase();
            const translatedDesc = tContent(`items.${module.id}.description`).toLowerCase();

            return (
                translatedTitle.includes(query) ||
                translatedDesc.includes(query) ||
                module.category.toLowerCase().includes(query)
            );
        });
    }, [searchQuery, tContent]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero
                title={t('Hero.title')}
                subtitle={t('Hero.subtitle')}
            />

            <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">

                <div className="max-w-xl mx-auto mb-16">
                    <div className="relative group shadow-2xl rounded-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            // 2. UTILISATION DU TRADUCTEUR DÉCLARÉ PLUS HAUT
                            placeholder={tFilters('Filters.search')}
                            className="input w-full pl-12 h-14 rounded-xl border border-base-300 focus:ring-2 focus:ring-indigo-500 bg-base-100 text-base-content shadow-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((module, index) => (
                            <motion.div
                                key={module.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ModuleCard
                                    {...module}
                                    title={tContent(`items.${module.id}.title`)}
                                    description={tContent(`items.${module.id}.description`)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredModules.length === 0 && (
                    <div className="text-center py-20 italic text-slate-400">
                        {/* 3. PLUS D'APPEL DE HOOK ICI, ON UTILISE tFilters */}
                        {tFilters('Filters.all')} : 0 results.
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-20">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-square btn-ghost border border-slate-200 disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn btn-square border-none transition-all duration-300 ${currentPage === i + 1
                                    ? "bg-[#5850ec] text-white shadow-lg shadow-indigo-200 scale-110"
                                    : "btn-ghost border border-slate-200 text-slate-600"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-square btn-ghost border border-slate-200 disabled:opacity-30"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}