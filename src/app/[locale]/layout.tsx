import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import '../globals.css';
import StoreProvider from "@/components/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/navigation";
import { notFound } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yupidoc Organization",
  description: "Plateforme d'apprentissage et d'organisation",
};

type Locale = (typeof routing.locales)[number];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  // Attencdre la locale est essentiel pour que les composants enfants 
  // puissent utiliser les hooks de traduction dès le départ, sans risque 
  // d'erreur de "locale non définie". C'est une étape clé pour assurer une 
  // expérience utilisateur fluide et sans bugs liés à l'internationalisation. 
  const { locale } = await params;

  // Vérifier si la locale est supportée, sinon afficher une page 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>
            <ThemeProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}