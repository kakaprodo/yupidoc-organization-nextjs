import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';


// On définit les locales disponibles
const locales = ['en', 'fr'];

export default getRequestConfig(async ({ requestLocale }) => {
  // On récupère la locale demandée (c'est une promesse maintenant)
  const locale = await requestLocale;

  // Validation : Si pas de locale ou si elle n'est pas dans la liste
  // Le "as string" permet d'éviter l'erreur de type sur .includes
  if (!locale || !locales.includes(locale as string)) {
    notFound();
  }

  return {
    locale, 
    messages: (await import(`../messages/${locale}.json`)).default
  };
});