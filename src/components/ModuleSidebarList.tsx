'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface SubCourse {
    title: string;
    image: string;
}

export default function ModuleSidebarList({ courses }: { courses: SubCourse[] }) {
    const t = useTranslations('ModuleDetail');

    return (
        <div className="bg-base-200/40 p-6 rounded-2xl border border-base-200 mt-6">
            <h3 className="font-bold text-base-content mb-6 text-sm uppercase tracking-wider">
                {t('includedTitle')}
            </h3>
            <div className="space-y-3">
                {courses.map((course, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 bg-base-100 rounded-xl border border-base-200 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="relative w-16 h-10 shrink-0 overflow-hidden rounded-lg">
                            <Image src={course.image} alt={course.title} fill className="object-cover" />
                        </div>
                        <span className="text-[13px] font-bold text-base-content/80 group-hover:text-primary transition-colors leading-tight">
                            {course.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}