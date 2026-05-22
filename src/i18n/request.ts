import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/navigation';



export default getRequestConfig(async ({ requestLocale }) => {
  // On récupère la locale demandée (c'est une promesse maintenant)
  let locale = await requestLocale;
  // on crée une constante typée proprement pour la vérification de la locale
  const supportedLocales = routing.locales as readonly string[];

  if(!locale || !supportedLocales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale, 
    messages: (await import(`../messages/${locale}.json`)).default
  };
});