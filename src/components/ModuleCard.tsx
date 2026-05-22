'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import { useState } from 'react';

interface ModuleCardProps {
    title: string;
    description: string;
    category: string;
    level: string;
    price: string;
    image: string;
    learners: string;
    duration: string;
}

export default function ModuleCard({
    title, description, category, level, price, image, learners, duration
}: ModuleCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            // Correction : bg-base-100 et border-base-300
            className="bg-base-100 border border-base-300 group flex flex-col h-full hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-video overflow-hidden bg-base-300">
                {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                <Image
                    src={image}
                    alt={title}
                    fill
                    onLoad={() => setIsLoaded(true)}
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex gap-2">
                    {/* Correction : dark:bg-opacity-20 pour les badges */}
                    <span className="badge badge-sm border-none bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold px-3 py-3 uppercase text-[10px]">
                        {category}
                    </span>
                    <span className="badge badge-sm border-none bg-base-200 text-base-content/70 font-bold px-3 py-3 uppercase text-[10px]">
                        {level}
                    </span>
                </div>

                <div className="flex-grow">
                    {/* Correction : text-base-content */}
                    <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-indigo-500 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-base-content/40 text-xs font-medium py-2">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{learners} Learners</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-base-200 mt-auto">
                    <span className="text-xl font-black text-base-content">{price}</span>
                    <button className="btn btn-primary btn-sm rounded-md px-4 normal-case font-bold">
                        Purchase Module
                    </button>
                </div>
            </div>
        </motion.div>
    );
}