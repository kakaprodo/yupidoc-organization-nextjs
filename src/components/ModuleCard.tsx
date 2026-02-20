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
            className="bg-white border border-slate-200 group flex flex-col h-full hover:shadow-xl transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-slate-100">
                {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                <Image
                    src={image}
                    alt={title}
                    fill
                    onLoad={() => setIsLoaded(true)}
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow gap-4">
                {/* Badges */}
                <div className="flex gap-2">
                    <span className="badge badge-sm border-none bg-indigo-50 text-indigo-600 font-bold px-3 py-3 uppercase text-[10px]">
                        {category}
                    </span>
                    <span className="badge badge-sm border-none bg-slate-100 text-slate-600 font-bold px-3 py-3 uppercase text-[10px]">
                        {level}
                    </span>
                </div>

                {/* Text */}
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Stats Meta */}
                <div className="flex items-center gap-4 text-slate-400 text-xs font-medium py-2">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{learners} Learners</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>

                {/* Footer: Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-xl font-black text-slate-900">{price}</span>
                    <button className="btn btn-neutral btn-sm rounded-md px-4 normal-case font-bold">
                        Purchase Module
                    </button>
                </div>
            </div>
        </motion.div>
    );
}