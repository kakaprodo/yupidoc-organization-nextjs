'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Play, ChevronRight, Video, Layers, CheckCircle2 } from 'lucide-react';
import { Link } from '@/navigation';
import PricingSidebar from '@/components/PricingSidebar';
import { motion } from 'framer-motion';

const MOCK_PROGRAM_CONTENT = {
    core: [
        { title: "Module: Modern Frontend Essentials", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=200" },
        { title: "Module: Backend Fundamentals", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=200" }
    ],
    standalone: [
        { title: "Course: Responsive Layouts in Practice", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200" },
        { title: "Course: APIs and Data Fetching", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200" }
    ]
};

export default function ProgramDetailPage() {
    const t = useTranslations('ProgramDetail');
    const tCommon = useTranslations('Details');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            {/* Breadcrumbs */}
            <div className="bg-base-200/30 border-b border-base-200 py-4">
                <div className="container mx-auto px-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">
                    <Link href="/programs" className="hover:text-primary transition-colors">Programs</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-base-content">Full Web Development Path</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* COLONNE GAUCHE : CONTENU DU PROGRAMME */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Hero Preview */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group bg-indigo-900">
                            <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" alt="Program" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button whileHover={{ scale: 1.1 }} className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                                </motion.button>
                            </div>
                            <div className="absolute bottom-6 left-6 flex gap-3">
                                <div className="bg-[#5850ec] px-4 py-2 rounded-xl flex items-center gap-2 text-white shadow-lg">
                                    <Video className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase">40+ Hours Content</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 text-white">
                                    <Layers className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase">Multiple Modules</span>
                                </div>
                            </div>
                        </div>

                        {/* Textes */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Full Web Development Path</h1>
                            <p className="text-lg text-base-content/60 leading-relaxed max-w-3xl">
                                Un programme structuré qui combine plusieurs modules et cours autonomes pour vous emmener des bases absolues à la construction et au déploiement d'applications web complètes.
                            </p>
                        </div>

                        {/* What you'll learn */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-base-content">{t('whatYouWillLearn')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["HTML/CSS Mastery", "Frontend Architecture", "Backend & APIs", "Full Stack Deployment"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl border border-base-200">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-semibold text-base-content/80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* About this program */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-base-content">{t('aboutTitle')}</h2>
                            <div className="text-base-content/70 leading-loose text-sm italic">
                                Ce programme regroupe des modules curatés et des cours ciblés qui se complètent. Vous progressez à travers des étapes claires, chaque module approfondissant vos compétences.
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : SIDEBAR ACHAT & CONTENU INCLUS */}
                    <aside className="space-y-8">
                        <div className="sticky top-24">
                            <PricingSidebar
                                price="$249.00"
                                duration="12 weeks"
                                level="Beginner-Advanced"
                                language="English"
                                refund="14"
                                type="program"
                            />

                            {/* Section "Included in this module" spécialisée pour Program */}
                            <div className="bg-base-200/40 p-6 rounded-2xl border border-base-200 mt-8 space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-4">{t('coreModules')}</h3>
                                    <div className="space-y-3">
                                        {MOCK_PROGRAM_CONTENT.core.map((m, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 bg-base-100 rounded-xl border border-base-200">
                                                <div className="relative w-12 h-8 shrink-0 overflow-hidden rounded-md">
                                                    <Image src={m.image} alt="module" fill className="object-cover" />
                                                </div>
                                                <span className="text-[11px] font-bold text-base-content/80 leading-tight">{m.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-4">{t('standaloneCourses')}</h3>
                                    <div className="space-y-3">
                                        {MOCK_PROGRAM_CONTENT.standalone.map((c, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 bg-base-100 rounded-xl border border-base-200">
                                                <div className="relative w-12 h-8 shrink-0 overflow-hidden rounded-md">
                                                    <Image src={c.image} alt="course" fill className="object-cover" />
                                                </div>
                                                <span className="text-[11px] font-bold text-base-content/80 leading-tight">{c.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}