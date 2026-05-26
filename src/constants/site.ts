export const siteConfig = {
  name: 'Yupidoc Organization',
  shortName: 'Yupidoc',
  description:
    'A modern training center platform for courses, programs, and educational content.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  localePrefix: 'as-needed' as const,
  contact: {
    email: 'prodo@gmail.com',
    phone: '+243 812 345 678',
    whatsapp: '+243 812 345 678',
    address: '123 Innovation Drive, Tech Valley, Kinshasa'
  }
} as const;

export const publicNavigation = [
  { href: '/', labelKey: 'home' },
  { href: '/courses', labelKey: 'courses' },
  { href: '/programs', labelKey: 'programs' },
  { href: '/about', labelKey: 'about' },
  { href: '/privacy', labelKey: 'privacy' }
] as const;

export const footerNavigation = [
  { href: '/courses', labelKey: 'courses' },
  { href: '/programs', labelKey: 'programs' },
  { href: '/about', labelKey: 'about' },
  { href: '/privacy', labelKey: 'privacy' }
] as const;

