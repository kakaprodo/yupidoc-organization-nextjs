'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';



interface CourseCardProps {
    id: string;
    basePath: 'courses' | 'modules' | 'programs';
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
    accentColor = "bg-primary"
}: CourseCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        // On enveloppe tout dans le Link. Plus besoin de mettre ${locale}
        // car notre Link personnalisé le gère automatiquement.
        <Link href={`/${basePath}/${id}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                    perspective: 1000
                }}
                className="group relative bg-base-100 border border-base-200 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full"
            >
                {/* Conteneur Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-base-200">
                    {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        onLoad={() => setIsLoaded(true)}
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/80">
                            {category}
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            className={`h-[3px] ${accentColor} rounded-full`}
                        />
                    </div>

                    <div className="min-h-[100px]">
                        <h3 className="font-extrabold text-xl leading-tight text-base-content group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-base-content/60 mt-3 line-clamp-2 leading-relaxed font-medium">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-5 border-t border-base-200">
                        <div className="flex items-center gap-3">
                            {instructorAvatar ? (
                                <div className="avatar ring-2 ring-primary/10 rounded-full">
                                    <div className="w-8 rounded-full relative h-8 w-8">
                                        <Image src={instructorAvatar} alt="instructor" fill className="rounded-full" />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="text-xs font-bold bg-primary/5 px-2 py-1 rounded">
                                        {metaInfo}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-black text-base-content tracking-tight">
                                {price}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>
        </Link>
    );
}