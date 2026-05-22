'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Play, ChevronRight, Video, BookOpen } from 'lucide-react';
import { Link } from '@/navigation';
import PricingSidebar from '@/components/PricingSidebar';
import ModuleSidebarList from '@/components/ModuleSidebarList';
import { motion } from 'framer-motion';

const MOCK_SUB_COURSES = [
    { title: "Course 1: Layout Foundations", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200" },
    { title: "Course 2: Design Tokens", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=200" },
    { title: "Course 3: Navigation Shells", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200" },
];

export default function ModuleDetailPage() {
    const t = useTranslations('ModuleDetail');
    const tCommon = useTranslations('Details');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            {/* Breadcrumbs */}
            <div className="bg-base-200/30 border-b border-base-200 py-4">
                <div className="container mx-auto px-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">
                    <Link href="/modules" className="hover:text-primary">Modules</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-base-content">Modern Frontend Essentials</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* GAUCHE : CONTENU DU MODULE */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Player Preview */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group bg-slate-900 border border-base-200">
                            <Image src="https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1200" alt="Module preview" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                                </motion.button>
                            </div>

                            {/* Barres d'infos flottantes */}
                            <div className="absolute bottom-6 left-6 flex gap-3">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                                    <Video className="w-4 h-4 text-white" />
                                    <span className="text-[10px] font-bold text-white uppercase">8 {tCommon('videoContent')}</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-white" />
                                    <span className="text-[10px] font-bold text-white uppercase">{t('lessonsCount', { count: 6 })}</span>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 text-white/60 text-[10px] font-bold uppercase tracking-widest">{t('accessTime')}</div>
                        </div>

                        {/* Titre & Description */}
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-base-content tracking-tight">Modern Frontend Essentials</h1>
                            <p className="text-lg text-base-content/60 leading-relaxed">
                                Un module ciblé qui vous guide à travers les briques fondamentales du développement frontend moderne en utilisant des composants réutilisables.
                            </p>
                            <div className="flex gap-2">
                                <span className="badge badge-outline border-base-300 text-xs font-bold py-3 px-4">Level: Beginner-Intermediate</span>
                                <span className="badge badge-outline border-base-300 text-xs font-bold py-3 px-4">Track: Web Development</span>
                            </div>
                        </div>

                        {/* Section Curriculum */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-base-content">{t('curriculumTitle')}</h2>
                            <div className="prose prose-sm max-w-none text-base-content/70">
                                <ul className="space-y-4 list-none p-0">
                                    {[1, 2, 3].map(i => (
                                        <li key={i} className="flex gap-4 p-4 bg-base-200/30 rounded-2xl border border-base-200">
                                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs shrink-0">{i}</div>
                                            <div>
                                                <h4 className="font-bold text-base-content m-0">Course {i}: Titre du cours détaillé</h4>
                                                <p className="m-0 text-xs opacity-60">Maîtrisez les concepts fondamentaux avec des exercices pratiques.</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* DROITE : SIDEBAR D'ACHAT */}
                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <PricingSidebar
                                price="$49.00"
                                duration="2 weeks"
                                level="Beginner-Intermediate"
                                language="English"
                                refund="7"
                                type="module"
                            />

                            {/* La liste spécifique aux modules */}
                            <ModuleSidebarList courses={MOCK_SUB_COURSES} />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}