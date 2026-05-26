import { getTranslations } from 'next-intl/server';
import { Menu } from 'lucide-react';
import { Link } from '@/navigation';
import { publicNavigation } from '@/constants/site';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getOrganization } from '@/services/content';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import HeaderNavLinks from '@/components/HeaderNavLinks';

export default async function Header() {
  const t = await getTranslations('Navigation');
  const organization = getOrganization();

  const navLinks = publicNavigation.map((item) => ({
    href: item.href,
    label: t(item.labelKey)
  }));

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-base-200 bg-base-100/90 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="navbar h-20 p-0">
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-1 group">
              <OrganizationAvatar organization={organization} size={6} className="" />
              <span className="text-xl font-semibold tracking-tight text-base-content">
                {organization.name}
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">
              <HeaderNavLinks navLinks={navLinks} />
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
                <HeaderNavLinks navLinks={navLinks} mobile />
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
