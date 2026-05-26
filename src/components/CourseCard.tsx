import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Link } from '@/navigation';
import { formatNumber } from '@/utils/format';
import { Course, Program } from '@/types/general-type';

interface CourseCardProps {
  href: string;
  title: string;
  domains?: string[];
  level?: string;
  durationDays: string | number;
  image: string;
  entity: Course | Program
}

export default function CourseCard({
  href,
  title,
  domains = [],
  level,
  durationDays,
  image,
  entity
}: CourseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100  transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-16/10 overflow-hidden rounded-t-xl border border-base-200 bg-base-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="h-auto w-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-base-200 to-base-300">
            <div className="flex flex-col items-center gap-2 text-base-content/45">
              <ImageIcon size={24} className="text-base-content/40" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">No cover</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-base-content/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className=" flex flex-1 flex-col gap-4 p-4  ">

        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 text-lg leading-tight text-base-content transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          {domains.length > 0 ? (
            <div className="flex flex-wrap gap-2 border-t border-base-200 ">
              {domains.slice(0, 2).map((domainName) => (
                <span
                  key={domainName}
                  title={domainName}
                  className="badge pl-2 badge-ghost rounded-md border border-base-300 text-xs max-w-37.5 truncate"
                >
                  {domainName}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-t border-base-200">
          <span className="badge badge-sm badge-outline rounded-md border-base-300">
            {formatNumber(durationDays)} days
          </span>
          <div><span className='text-lg font-semibold'><span className='text-sm'>{entity.currency}</span> {formatNumber(entity.price)} </span></div>
        </div>

      </div>
    </Link>
  );
}
