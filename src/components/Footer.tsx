'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MessageCircle, MapPin, GraduationCap } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0f1c] text-slate-400 pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Colonne 1: Brand & Logo */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <GraduationCap className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Yupi<span className="text-indigo-500">doc</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                    </div>

                    {/* Colonne 2: Learn (Navigation) */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-base">{t('sections.learn')}</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/courses" className="hover:text-white transition-colors">{t('links.courses')}</Link></li>
                            <li><Link href="/modules" className="hover:text-white transition-colors">{t('links.modules')}</Link></li>
                            <li><Link href="/programs" className="hover:text-white transition-colors">{t('links.programs')}</Link></li>
                            <li><Link href="/certifications" className="hover:text-white transition-colors">{t('links.certifications')}</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3: Organization */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-base">{t('sections.org')}</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/about" className="hover:text-white transition-colors">{t('links.about')}</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">{t('links.careers')}</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors">{t('links.products')}</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">{t('links.blog')}</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4: Contact Us (Avec Icônes) */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-base">{t('sections.contact')}</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                                <a href="mailto:contact@yupidoc.com" className="hover:text-white transition-colors">contact@yupidoc.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                                <a href="tel:+243812345678" className="hover:text-white transition-colors">+243 812 345 678</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span className="hover:text-white transition-colors">+243 812 345 678 (WhatsApp)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span>123 Innovation Drive, Tech Valley, Kinshasa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Barre de copyright et liens légaux */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-wider">
                    <p className="text-slate-500">
                        © {currentYear} Yupidoc Organization. {t('allRightsReserved')}
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}