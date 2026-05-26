import { getTranslations } from 'next-intl/server';
import { GraduationCap, Menu } from 'lucide-react';
import { Link } from '@/navigation';
import { publicNavigation } from '@/constants/site';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default async function Header() {
  const t = await getTranslations('Navigation');

  const navLinks = publicNavigation.map((item) => ({
    href: item.href,
    label: t(item.labelKey)
  }));

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-base-200 bg-base-100/90 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="navbar h-20 p-0">
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-base-content">
                Yupi<span className="text-primary">doc</span>
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold tracking-wide text-base-content/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-3">
            <div className="hidden items-center gap-1 sm:flex">
              <ThemeSwitcher />
              <div className="mx-2 h-6 w-px bg-base-200" />
            </div>

            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[100] w-64 rounded-xl border border-base-200 bg-base-100 p-3 shadow-xl"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="py-3 font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <div className="divider my-1" />
                <div className="flex items-center justify-between px-2 py-2">
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

