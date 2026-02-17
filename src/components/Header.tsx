'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LangueSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const navLinks = [
    { name: t('home'), href: `/${locale}` },
    { name: t('courses'), href: `/${locale}/courses` },
    { name: t('programs'), href: `/${locale}/programs` },
    { name: t('products'), href: `/${locale}/products` },
    { name: t('about'), href: `/${locale}/about` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="navbar h-16 p-0">
          {/* LOGO */}
          <div className="navbar-start">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold text-xl">
                Y
              </div>
              <span className="font-bold text-xl tracking-tight hidden md:inline-block">
                Yupi<span className="text-primary">doc</span>
              </span>
            </Link>
          </div>

          {/* NAV CENTER (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTIONS RIGHT */}
          <div className="navbar-end gap-2">
            <ThemeSwitcher />
            <div className="divider divider-horizontal mx-0 h-6 self-center"></div>
            <LanguageSwitcher />
            <Link href={`/${locale}/login`} className="btn btn-primary btn-sm ml-2 rounded-md">
              {t('login')}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                {navLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}