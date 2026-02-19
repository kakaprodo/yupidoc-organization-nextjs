import { Link } from '@/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface SectionHeaderProps {
    title: string;
    href: string;
    linkText: string;
}

export function SectionHeader({ title, href, linkText }: SectionHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">{title}</h2>
            <Link href={href} className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-base-content/50 hover:text-primary transition-colors">
                {linkText}
                <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}