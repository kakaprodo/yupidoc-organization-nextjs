'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Calendar,
    MapPin,
    Clock,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight
} from 'lucide-react';



// Simulation de données détaillées
const ACTIVITY_CONTENT = {
    id: "1",
    category: "SUMMIT",
    date: "October 15-16, 2025",
    location: "Tech Valley Convention Center, CA",
    time: "9:00 AM - 5:00 PM",
    imageHero: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    imageSecondary: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800"
};

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const t = useTranslations('ActivityDetail');
    const tPage = useTranslations('ActivitiesPage');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            {/* Header / Navigation haute */}
            <div className="container mx-auto px-4 pt-12 flex flex-col items-center">
                <Link
                    href="/activities"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#5850ec] hover:opacity-70 transition-opacity mb-8"
                >
                    <ChevronLeft className="w-3 h-3" />
                    {t('back')}
                </Link>

                <span className="badge bg-indigo-50 text-[#5850ec] border-none font-bold text-[10px] tracking-widest px-4 py-3 mb-6">
                    {ACTIVITY_CONTENT.category}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-base-content text-center tracking-tight mb-8 max-w-4xl">
                    {tPage(`items.${id}.title`)}
                </h1>

                <p className="text-lg text-base-content/40 text-center max-w-2xl mb-10 font-medium">
                    {tPage(`items.${id}.desc`)}
                </p>

                {/* Barre de meta-données */}
                <div className="flex flex-wrap justify-center gap-8 text-base-content/50 border-y border-base-200 py-6 w-full max-w-4xl">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <Calendar className="w-4 h-4 text-[#5850ec]" />
                        {ACTIVITY_CONTENT.date}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-[#5850ec]" />
                        {ACTIVITY_CONTENT.location}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-[#5850ec]" />
                        {ACTIVITY_CONTENT.time}
                    </div>
                </div>
            </div>

            {/* Image Hero Large */}
            <div className="container mx-auto px-4 mt-12">
                <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image
                        src={ACTIVITY_CONTENT.imageHero}
                        alt="Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Corps de l'article */}
            <article className="container mx-auto px-4 max-w-4xl mt-16">
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-base-content/70 prose-p:leading-relaxed">
                    <p>
                        The tech landscape is evolving at an unprecedented pace. What was considered science fiction just a few years ago is now becoming our daily reality. The Tech Innovation Summit 2025 is designed to bring together the brightest minds in the industry.
                    </p>

                    <h3>What to Expect</h3>
                    <p>
                        Our carefully curated agenda features a mix of visionary keynotes, deep-dive technical workshops, and highly interactive panel discussions.
                    </p>

                    <div className="relative h-[400px] w-full my-12 rounded-2xl overflow-hidden shadow-xl">
                        <Image src={ACTIVITY_CONTENT.imageSecondary} alt="Workshop" fill className="object-cover" />
                    </div>

                    <h3>Key Themes for 2025</h3>
                    <ul>
                        <li><strong>Next Generation AI:</strong> Moving beyond LLMs to agentic AI implementation.</li>
                        <li><strong>Sustainable Infrastructure:</strong> Building scalable cloud architectures with zero carbon footprint.</li>
                        <li><strong>Cybersecurity:</strong> Protecting data in a hyper-connected world.</li>
                    </ul>
                </div>

                {/* Boîte CTA d'inscription */}
                <div className="mt-20 bg-base-200/50 border border-base-200 rounded-[2.5rem] p-12 text-center">
                    <h2 className="text-3xl font-black text-base-content mb-4">{t('secureSpot')}</h2>
                    <p className="text-base-content/60 mb-8 max-w-md mx-auto">{t('ctaSub')}</p>
                    <button className="btn bg-[#5850ec] hover:bg-[#4a42d4] text-white border-none px-10 h-16 rounded-xl text-lg normal-case font-bold shadow-xl shadow-indigo-500/20">
                        {t('registerBtn')}
                    </button>
                </div>

                {/* Footer de l'activité: Partage */}
                <div className="mt-12 pt-8 border-t border-base-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-sm font-bold text-base-content/40 uppercase tracking-widest">{t('share')}</span>
                    <div className="flex gap-4">
                        <button className="btn btn-circle btn-ghost bg-base-200/50 hover:text-[#1DA1F2] transition-colors">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="btn btn-circle btn-ghost bg-base-200/50 hover:text-[#0077b5] transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="btn btn-circle btn-ghost bg-base-200/50 hover:text-[#5850ec] transition-colors">
                            <Mail className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}