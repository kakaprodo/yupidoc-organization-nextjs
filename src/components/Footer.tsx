import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Globe } from 'lucide-react';
import { Link } from '@/navigation';
import { footerNavigation } from '@/constants/site';
import { getBriefMissionContent, getContacts, getOrganization } from '@/services/content';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import CallIcon from '@/components/Icons/CallIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import InstagramIcon from '@/components/Icons/InstagramIcon';
import LinkedInIcon from '@/components/Icons/LinkedInIcon';
import MailIcon from '@/components/Icons/MailIcon';
import MessageBubbleIcon from '@/components/Icons/MessageBubbleIcon';
import TweeterIcon from '@/components/Icons/TweeterIcon';
import type { EntityAboutContactType } from '@/types/general-type';
import { stripHtml } from '@/utils/content';

const iconProps = { size: 5, color: 'text-gray-500' };

function getContactIcon(type: EntityAboutContactType): ReactNode {
  const contactIconMap: Record<EntityAboutContactType, ReactNode> = {
    PHONE: <CallIcon {...iconProps} />,
    EMAIL: <MailIcon {...iconProps} />,
    WHATSAPP: <MessageBubbleIcon {...iconProps} />,
    INSTAGRAM: <InstagramIcon {...iconProps} />,
    LINKEDIN: <LinkedInIcon {...iconProps} />,
    FACEBOOK: <FacebookIcon {...iconProps} />,
    X: <TweeterIcon {...iconProps} />
  };

  return contactIconMap[type] ?? <Globe className="h-5 w-5 text-gray-500" />;
}

export default async function Footer() {
  const t = await getTranslations('Footer');
  const organization = getOrganization();
  const mission = getBriefMissionContent();
  const contacts = getContacts();
  const currentYear = new Date().getFullYear();
  const orgLinks = footerNavigation.map((item) => ({
    href: item.href,
    label: t(`links.${item.labelKey}`)
  }));

  return (
    <footer className="border-t border-base-200 bg-slate-950 py-16 text-slate-300">
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <OrganizationAvatar organization={organization} size={7} />
              <span className="text-2xl font-bold tracking-tight text-white">
                {organization.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {mission ? stripHtml(mission.content) : t('description')}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-base font-bold text-white">{t('sections.organization')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              {orgLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-base font-bold text-white">{t('sections.contact')}</h4>
            <ul className="space-y-4 text-sm">
              {contacts.map((contact, index) => {
                const type = (contact.type ?? 'EMAIL') as EntityAboutContactType;
                const label = contact.content;
                const href =
                  type === 'EMAIL'
                    ? `mailto:${contact.content}`
                    : type === 'PHONE' || type === 'WHATSAPP'
                      ? `tel:${contact.content.replace(/\s+/g, '')}`
                      : contact.content.startsWith('http')
                        ? contact.content
                        : undefined;

                const value = href ? (
                  <a href={href} className="transition-colors hover:text-white">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                );

                return (
                  <li key={`${contact.id}-${index}`} className="flex items-start gap-3">
                    <span className="shrink-0">{getContactIcon(type)}</span>
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-medium uppercase tracking-wider text-slate-500 md:flex-row">
          <p>
            © {currentYear} {organization.name}. {t('allRightsReserved')}{' '}
            <a
              href="https://yupidoc.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Powered by Yupidoc
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
