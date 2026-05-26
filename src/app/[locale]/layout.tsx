import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/navigation";
import { notFound } from "next/navigation";
import { AppProviders } from '@/providers/app-providers';
import { hasLocale } from 'next-intl';
import { siteConfig } from '@/constants/site';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    languages: {
      en: '/en',
      fr: '/fr'
    }
  }
};

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [messages, { locale }] = await Promise.all([
    getMessages(),
    params
  ]);

  if (!hasLocale(routing.locales, locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AppProviders>
        <Header />
        <main className="flex-1 focus:outline-none" id="main-content">
          {children}
        </main>
        <Footer />
      </AppProviders>
    </NextIntlClientProvider>
  );
}
