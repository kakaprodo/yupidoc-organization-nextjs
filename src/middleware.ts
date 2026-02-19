import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
  // Matcher mis à jour pour supporter les routes sans préfixe
  matcher: [
    // Matcher toutes les pages sauf les fichiers statiques (images, favicon, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Matcher les routes avec préfixe
    '/(fr|en)/:path*'
  ]
};
