'use client';

import { useState, useMemo } from 'react';
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';



// Simulation d'une base de données plus large (12 cours pour tester la pagination)
const ALL_COURSES = Array.from({ length: 12 }).map((_, i) => ({
    id: ((i % 3) + 1).toString(), // Réutilise les IDs 1, 2, 3 pour les trads
    uniqueId: i,
    category: i % 2 === 0 ? "Web Design" : "Management",
    price: i % 3 === 0 ? "Free" : "$49.99",
    avatar: `https://i.pravatar.cc/150?u=${i}`,
    img: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400"
    ][i % 3]
}));

export default function CoursesPage() {
    const t = useTranslations('CoursesPage');
    const tItems = useTranslations('Courses.featured');

    // États pour la recherche et la pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Logique de recherche (Filtrage)
    const filteredCourses = useMemo(() => {
        return ALL_COURSES.filter(course => {
            const title = tItems(`items.${course.id}.title`).toLowerCase();
            const desc = tItems(`items.${course.id}.description`).toLowerCase();
            const query = searchQuery.toLowerCase();
            return title.includes(query) || desc.includes(query) || course.category.toLowerCase().includes(query);
        });
    }, [searchQuery, tItems]);

    // Handler pour la barre de recherche (Met à jour la query et reset la page)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // On reset la page UNIQUEMENT quand l'utilisateur tape
    };

    // Logique de Pagination
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className="min-h-screen pb-20 bg-base-100">
            <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

            <div className="container mx-auto px-4 lg:px-8 mt-12">

                {/* BARRE DE RECHERCHE FONCTIONNELLE */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-base-200/30 p-6 rounded-2xl border border-base-200">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-base-content">{t('Filters.all')}</h2>
                        <span className="badge badge-ghost font-mono">{filteredCourses.length}</span>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder={t('Filters.search')}
                            className="input input-bordered w-full pl-12 rounded-xl bg-base-100 focus:outline-primary border-base-300"
                        />
                    </div>
                </div>

                {/* GRILLE DE COURS AVEC ANIMATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((item, index) => (
                            <motion.div
                                key={item.uniqueId}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <CourseCard
                                    key={item.uniqueId}
                                    id={item.id}
                                    basePath="courses"
                                    title={tItems(`items.${item.id}.title`)}
                                    description={tItems(`items.${item.id}.description`)}
                                    category={item.category}
                                    price={item.price}
                                    instructorAvatar={item.avatar}
                                    image={item.img}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* COMPOSANT DE PAGINATION (Design exact de l'image) */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-20">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-square btn-outline border-base-300 hover:bg-base-200 text-base-content disabled:opacity-30"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn btn-square border-none transition-all duration-300 ${currentPage === i + 1
                                    ? "bg-[#5850ec] text-white shadow-lg shadow-indigo-500/30 scale-110"
                                    : "bg-base-200/50 text-base-content hover:bg-base-200"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-square btn-outline border-base-300 hover:bg-base-200 text-base-content disabled:opacity-30"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Cas où aucun résultat n'est trouvé */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-base-content/50 font-medium">Aucun cours ne correspond à votre recherche.</p>
                    </div>
                )}
            </div>
        </main>
    );
}