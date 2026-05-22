'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Play, ChevronRight, CheckCircle2, FileText, Video, Globe } from 'lucide-react';
import { Link } from '@/navigation';
import PricingSidebar from '@/components/PricingSidebar';


export default function CourseDetail() {
    const t = useTranslations('Details');
    const tData = useTranslations('Courses.featured.items.1'); // Simulation ID 1
    // const locale = useLocale();

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            {/* Breadcrumbs */}
            <div className="bg-base-200/30 border-b border-base-200 py-4">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-base-content/40">
                    <Link href="/courses" className="hover:text-primary">Courses</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-base-content">Advanced Web Development</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* COLONNE GAUCHE : CONTENU PRINCIPAL */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Video Player / Thumbnail */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                            <Image
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                                alt="Hero" fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                <Video className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">16 {t('videoContent')}</span>
                            </div>
                        </div>

                        {/* Titre & Meta */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
                                {tData('title')}
                            </h1>
                            <p className="text-xl text-base-content/60 leading-relaxed">
                                {tData('description')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="badge badge-lg border-base-300 bg-base-200 text-base-content font-bold py-4">Level: Intermediate</span>
                                <span className="badge badge-lg border-base-300 bg-base-200 text-base-content font-bold py-4">Category: Technology</span>
                            </div>
                        </div>

                        {/* Section : What you'll learn */}
                        <div className="bg-base-200/30 p-8 rounded-3xl border border-base-200">
                            <h2 className="text-2xl font-bold mb-8">{t('whatYouWillLearn')}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <p className="text-sm text-base-content/70 font-medium">Apprenez à construire des interfaces réactives et accessibles.</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section : Description */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">{t('description')}</h2>
                            <div className="prose prose-slate max-w-none text-base-content/70 leading-loose">
                                <p>Ce cours est conçu pour les apprenants qui comprennent déjà les bases de HTML, CSS et JavaScript et souhaitent aller plus loin. À travers des projets pratiques, vous construirez des applications complètes qui reflètent des systèmes de production réels.</p>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : SIDEBAR */}
                    <aside className="space-y-8">
                        <div className="sticky top-24">
                            <PricingSidebar
                                price="$89.00"
                                duration="4 weeks"
                                level="Intermediate"
                                language="English"
                                refund="14"
                                type="course"
                            />

                            {/* Included items */}
                            <div className="mt-8 bg-base-200/30 p-8 rounded-2xl border border-base-200">
                                <h3 className="font-bold text-base-content mb-6">{t('included')}</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-base-content/60 font-medium">
                                        <FileText className="w-4 h-4 text-primary" /> Ressources téléchargeables
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-base-content/60 font-medium">
                                        <Globe className="w-4 h-4 text-primary" /> Communauté privée
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}