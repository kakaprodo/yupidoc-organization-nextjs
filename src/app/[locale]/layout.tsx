import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import '../globals.css';
import StoreProvider from "@/components/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/navigation";
import { notFound } from "next/navigation";



// Optimisation de la police
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// Définition de l'URL de base pour éviter le warning dans les logs
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Fixe l'avertissement "metadataBase property is not set"
  title: {
    default: "Yupidoc Organization | Apprentissage Nouvelle Génération",
    template: "%s | Yupidoc"
  },
  description: "Plateforme d'élite pour l'apprentissage et l'organisation. Accédez à des formations de haute qualité, des mentors experts et des ressources exclusives.",
  keywords: ["Éducation", "Nextjs", "Formation en ligne", "Organisation", "LMS", "Yupidoc"],
  authors: [{ name: "Yupidoc Team" }],
  creator: "Yupidoc Organization",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    title: "Yupidoc Organization",
    description: "Propulsez votre carrière avec nos programmes d'apprentissage modernes.",
    siteName: "Yupidoc",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Yupidoc Learning Platform"
    }],
  },

  // NOTE: On supprime la section "icons" ici car Next.js va utiliser 
  // automatiquement vos fichiers src/app/icon.tsx et src/app/apple-icon.tsx
  // En attendant la création des véritables favicons, vous pouvez laisser cette section vide ou la supprimer complètement.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

type Locale = (typeof routing.locales)[number];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Récupération parallèle pour la performance (Core Web Vitals)
  const [messages, { locale }] = await Promise.all([
    getMessages(),
    params
  ]);

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col transition-colors duration-300 bg-base-100 text-base-content`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>
            <ThemeProvider>
              <Header />
              <main className="flex-grow focus:outline-none" id="main-content">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}