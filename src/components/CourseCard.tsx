import Image from 'next/image';
import { Link } from '@/navigation';

interface CourseCardProps {
  id: string;
  basePath: 'courses' | 'programs';
  title: string;
  description?: string;
  category: string;
  price: string;
  image: string;
  instructorAvatar?: string;
  metaInfo?: string;
  accentColor?: string;
}

export default function CourseCard({
  id,
  basePath,
  title,
  description,
  category,
  price,
  image,
  instructorAvatar,
  metaInfo,
  accentColor = 'bg-primary'
}: CourseCardProps) {
  return (
    <Link
      href={`/${basePath}/${id}`}
      className="group relative flex h-full flex-col overflow-hidden border border-base-200 bg-base-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-base-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">
            {category}
          </span>
          <div className={`h-[3px] w-10 rounded-full ${accentColor}`} />
        </div>

        <div className="min-h-[100px]">
          <h3 className="text-xl font-extrabold leading-tight text-base-content transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          {description ? (
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-base-content/60">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-base-200 pt-5">
          <div className="flex items-center gap-3">
            {instructorAvatar ? (
              <div className="avatar ring-2 ring-primary/10">
                <div className="relative h-8 w-8 rounded-full">
                  <Image src={instructorAvatar} alt="Instructor" fill className="rounded-full" />
                </div>
              </div>
            ) : (
              <span className="rounded bg-primary/5 px-2 py-1 text-xs font-bold text-primary">
                {metaInfo}
              </span>
            )}
          </div>
          <span className="text-xl font-black tracking-tight text-base-content">{price}</span>
        </div>
      </div>
    </Link>
  );
}

