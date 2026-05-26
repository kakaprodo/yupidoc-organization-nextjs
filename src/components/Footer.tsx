import { getTranslations } from 'next-intl/server';
import { GraduationCap, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from '@/navigation';
import { footerNavigation, siteConfig } from '@/constants/site';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const currentYear = new Date().getFullYear();
  const navLinks = footerNavigation.map((item) => ({
    href: item.href,
    label: t(`links.${item.labelKey}`)
  }));

  return (
    <footer className="border-t border-base-200 bg-slate-950 py-16 text-slate-300">
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Yupi<span className="text-primary">doc</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-base font-bold text-white">{t('sections.learn')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-base font-bold text-white">{t('sections.org')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  {t('links.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-base font-bold text-white">{t('sections.contact')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
                <span>{siteConfig.contact.whatsapp} (WhatsApp)</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-medium uppercase tracking-wider text-slate-500 md:flex-row">
          <p>
            © {currentYear} {siteConfig.name}. {t('allRightsReserved')}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

