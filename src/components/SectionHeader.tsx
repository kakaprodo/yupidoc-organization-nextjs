import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from '@/navigation';

interface SectionHeaderProps {
  title: string;
  href: string;
  linkText: string;
}

export function SectionHeader({ title, href, linkText }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight text-base-content">{title}</h2>
      <Link
        href={href}
        className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-base-content/50 transition-colors hover:text-primary"
      >
        {linkText}
        <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

