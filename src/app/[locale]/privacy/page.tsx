'use client';

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { FileText, CreditCard, RefreshCcw, ShieldCheck, Lock, HelpCircle } from "lucide-react";

const POLICIES = [
    { id: 1, icon: FileText, badge: "Overview", color: "bg-blue-50 text-blue-600" },
    { id: 2, icon: CreditCard, badge: "Courses & Programs", color: "bg-indigo-50 text-indigo-600" },
    { id: 3, icon: RefreshCcw, badge: "Payments", color: "bg-purple-50 text-purple-600" },
    { id: 4, icon: ShieldCheck, badge: "Community", color: "bg-green-50 text-green-600" },
    { id: 5, icon: Lock, badge: "Security", color: "bg-red-50 text-red-600" },
    { id: 6, icon: HelpCircle, badge: "Support", color: "bg-orange-50 text-orange-600" }
];

export default function PolicyPage() {
    const t = useTranslations('PolicyPage');

    return (
        <main className="min-h-screen bg-base-200 pb-20">
            <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />

            <div className="container mx-auto px-4 max-w-5xl mt-12 space-y-6">
                {POLICIES.map((policy) => (
                    <div key={policy.id} className="bg-base-100 border border-base-300 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-lg ${policy.color.split(' ')[0]} dark:bg-opacity-20`}>
                                <policy.icon className={`w-6 h-6 ${policy.color.split(' ')[1]}`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-base-content">{policy.id}. Section Name</h3>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${policy.color} dark:bg-opacity-20`}>{policy.badge}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-base-content/70 text-sm leading-relaxed space-y-4">
                            <p>EduOrganization provides educational content, programs, and services...</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Access to content is granted to the enrolled student account only.</li>
                                <li>Organizations may manage student access centrally.</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}