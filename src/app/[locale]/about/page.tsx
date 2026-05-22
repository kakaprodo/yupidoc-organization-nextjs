'use client';

import PageHero from "@/components/PageHero";
import TeamCard from "@/components/TeamCard";
import { useTranslations } from "next-intl";

const TEAM = [
    { id: "1", image: "https://i.pravatar.cc/150?u=sarah" },
    { id: "2", image: "https://i.pravatar.cc/150?u=david" },
    { id: "3", name: "Maria Rodriguez", role: "Lead Instructor", bio: "Senior Full Stack Developer who loves teaching complex concepts.", image: "https://i.pravatar.cc/150?u=maria" },
    { id: "4", name: "James Wilson", role: "Community Manager", bio: "Dedicated to fostering an inclusive environment for all.", image: "https://i.pravatar.cc/150?u=james" }
];

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-8 text-lg text-base-content/80 leading-relaxed text-center font-medium">
                    <p>{t('story.p1')}</p>
                    <p>{t('story.p2')}</p>
                    <p>{t('story.p3')}</p>
                </div>
            </section>
            <section className="bg-base-200 py-24">
                <div className="container mx-auto px-4">
                    {/* Changement : text-base-content pour la visibilité en dark mode */}
                    <h2 className="text-4xl font-black text-center text-base-content mb-16">
                        {t('team.title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TEAM.map((member) => (
                            <TeamCard
                                key={member.id}
                                name={member.name || t(`team.members.${member.id}.name`)}
                                role={member.role || t(`team.members.${member.id}.role`)}
                                bio={member.bio || t(`team.members.${member.id}.bio`)}
                                image={member.image}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}