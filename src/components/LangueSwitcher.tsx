'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'fr' ? 'en' : 'fr';
        // On remplace le préfixe de la langue dans l'URL
        const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
        router.push(newPath);
    };

    return (
        <button onClick={toggleLanguage} className="btn btn-ghost btn-sm uppercase font-bold">
            {locale === 'fr' ? 'EN' : 'FR'}
        </button>
    );
}