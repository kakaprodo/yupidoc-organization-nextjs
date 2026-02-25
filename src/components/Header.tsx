'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import LanguageSwitcher from './LangueSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');
  // const locale = useLocale();

  const navLinks = [
    { name: t('home'), href: "/" },
    { name: t('activities'), href: "/activities" },
    { name: t('courses'), href: "/courses" },
    { name: t('modules'), href: "/modules" },
    { name: t('programs'), href: "/programs" },
    { name: t('products'), href: "/products" },
    { name: t('about'), href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-base-200 bg-base-100/90 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="navbar h-20 p-0">

          {/* LOGO (navbar-start) */}
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#5850ec] rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-base-content">
                Yupi<span className="text-[#5850ec]">doc</span>
              </span>
            </Link>
          </div>

          {/* NAV CENTER (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-base-content/60 hover:text-[#5850ec] transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTIONS RIGHT (navbar-end) */}
          <div className="navbar-end gap-3">
            <div className="hidden sm:flex items-center gap-1">
              <ThemeSwitcher />
              <div className="w-[1px] h-6 bg-base-200 mx-2"></div>
              <LanguageSwitcher />
            </div>

            <Link
              href="/login"
              className="btn bg-[#5850ec] hover:bg-[#4a42d4] border-none text-white px-6 h-11 min-h-[44px] rounded-lg text-sm font-bold normal-case shadow-md shadow-indigo-500/10"
            >
              {t('joinNow')}
            </Link>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-3 shadow-xl bg-base-100 rounded-xl w-64 border border-base-200">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="py-3 font-medium">{link.name}</Link>
                  </li>
                ))}
                <div className="divider my-1"></div>
                <div className="flex justify-between items-center px-2 py-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}