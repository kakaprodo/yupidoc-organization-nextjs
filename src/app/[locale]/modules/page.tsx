'use client';

import { useState, useMemo } from 'react';
import PageHero from "@/components/PageHero";
import ModuleCard from "@/components/ModuleCard";
import { useTranslations } from "next-intl";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";


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
    const tPage = useTranslations('ModulesPage');
    const tContent = useTranslations('Modules');
    const tFilters = useTranslations('CoursesPage');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Logique de recherche basée sur les textes traduits
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
        setCurrentPage(1); // Reset à la première page lors d'une recherche
    };

    const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
    const currentItems = filteredModules.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero
                title={tPage('Hero.title')}
                subtitle={tPage('Hero.subtitle')}
            />

            <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">

                {/* Barre de recherche flottante (Style Maquette) */}
                <div className="max-w-xl mx-auto mb-16">
                    <div className="relative group shadow-2xl rounded-2xl">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder={tFilters('Filters.search')}
                            className="input w-full pl-14 h-16 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content shadow-lg text-lg"
                        />
                    </div>
                </div>

                {/* Grille de modules avec lien vers détails */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((module, index) => (
                            <motion.div
                                key={module.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link href={`/modules/${module.id}`}>
                                    <ModuleCard
                                        {...module}
                                        title={tContent(`items.${module.id}.title`)}
                                        description={tContent(`items.${module.id}.description`)}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* État vide */}
                {filteredModules.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-xl text-base-content/40 font-medium">
                            {tFilters('Filters.all')} : 0 results.
                        </p>
                    </div>
                )}

                {/* Pagination (Style Indigo conforme au Header) */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-24">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-square btn-ghost border border-base-200 disabled:opacity-20"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn btn-square border-none transition-all duration-300 ${currentPage === i + 1
                                        ? "bg-[#5850ec] text-white shadow-lg shadow-indigo-500/30 scale-110"
                                        : "bg-base-200 text-base-content hover:bg-base-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-square btn-ghost border border-base-200 disabled:opacity-20"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}