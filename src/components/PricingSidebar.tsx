'use client';

import { Clock, BarChart, Globe, RefreshCcw, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';



interface SidebarProps {
    price: string;
    duration: string;
    level: string;
    language: string;
    refund: string;
    type: 'course' | 'module' | 'program';
}

export default function PricingSidebar({ price, duration, level, language, refund, type }: SidebarProps) {
    const t = useTranslations('Details');

    const stats = [
        { icon: Clock, label: t('duration'), value: duration },
        { icon: BarChart, label: t('level'), value: level },
        { icon: Globe, label: t('language'), value: language },
        { icon: RefreshCcw, label: t('refund'), value: `${refund} ${t('days')}` },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-base-100 border border-base-200 rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                    <span className="text-3xl font-black text-base-content">{price}</span>
                    <span className="text-sm text-base-content/50 ml-2">{t('oneTimePayment')}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-base-200/50 p-4 rounded-xl">
                            <stat.icon className="w-5 h-5 text-primary mb-2" />
                            <p className="text-[10px] uppercase font-bold text-base-content/40">{stat.label}</p>
                            <p className="text-sm font-bold text-base-content">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary w-full h-14 text-white rounded-xl normal-case text-lg font-bold shadow-lg shadow-primary/20">
                    {t('purchase')} {type}
                </button>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-base-content/40">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Paiement sécurisé • Accès immédiat</span>
                </div>
            </div>
        </div>
    );
}