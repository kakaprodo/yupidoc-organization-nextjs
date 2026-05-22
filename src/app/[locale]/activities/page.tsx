'use client';

import PageHero from "@/components/PageHero";
import ActivityCard from "@/components/ActivityCard";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";



const ACTIVITIES_DATA = [
    { id: "1", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600" },
    { id: "2", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600" },
    { id: "3", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600" },
    { id: "4", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600" },
    { id: "5", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600" },
    { id: "6", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600" }
];

export default function ActivitiesPage() {
    const t = useTranslations('ActivitiesPage');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero
                title={t('Hero.title')}
                subtitle={t('Hero.subtitle')}
            />

            <div className="container mx-auto px-4 lg:px-8 mt-16">
                {/* Grille des Activités */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {ACTIVITIES_DATA.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            title={t(`items.${activity.id}.title`)}
                            description={t(`items.${activity.id}.desc`)}
                            image={activity.image}
                            buttonText={t('explore')}
                        />
                    ))}
                </div>

                {/* Indicateur de chargement (comme sur la maquette) */}
                <div className="flex flex-col items-center justify-center mt-20 gap-4">
                    <div className="flex items-center gap-3 text-base-content/40">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-medium italic">{t('loading')}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}