import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// On définit la configuration du routage
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  // 'as-needed' permet d'avoir /courses au lieu de /fr/courses pour la langue par défaut
  localePrefix: 'as-needed'
});

// On exporte les utilitaires de navigation basés sur ce routage
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);