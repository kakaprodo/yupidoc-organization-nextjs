"use client";

import { usePathname, Link, routing } from "@/navigation";

type NavLinkItem = {
  href: string;
  label: string;
};

type HeaderNavLinksProps = {
  navLinks: NavLinkItem[];
  mobile?: boolean;
};

function normalizePath(pathname: string) {
  const localePattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);
  const normalized = pathname.replace(localePattern, "");
  return normalized === "" ? "/" : normalized;
}

function isActiveLink(currentPath: string, href: string) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function HeaderNavLinks({
  navLinks,
  mobile = false
}: HeaderNavLinksProps) {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);

  return (
    <>
      {navLinks.map((link) => {
        const active = isActiveLink(currentPath, link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={
                mobile
                  ? `block py-3 font-medium transition-colors ${
                      active ? "text-primary" : "text-base-content/70 hover:text-primary"
                    }`
                  : `text-sm font-semibold tracking-wide transition-colors ${
                      active ? "text-primary" : "text-base-content/60 hover:text-primary"
                    }`
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
