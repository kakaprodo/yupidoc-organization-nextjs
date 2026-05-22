'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'fr' ? 'en' : 'fr';

        startTransition(() => {
            // route.replace de @/navigation gère automatiquement le préfixe de langue grâce à la configuration du routing
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="btn btn-ghost btn-sm uppercase font-bold"
            disabled={isPending}>
            {locale === 'fr' ? 'EN' : 'FR'}
        </button>
    );
}