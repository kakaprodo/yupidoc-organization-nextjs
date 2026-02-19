import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold">Y</div>
                            <span className="text-xl font-bold italic">Yupidoc</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {t('description')}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{t('sections.links')}</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-primary transition-colors">Accueil</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Nos Cours</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Programmes</Link></li>
                        </ul>
                    </div>

                    {/* Organization */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{t('sections.org')}</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-primary transition-colors">À propos</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Partenaires</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Contact</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>Kinshasa, RDC</li>
                            <li>contact@yupidoc.com</li>
                            <li>+243 812 345 678</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Yupidoc Organization. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}