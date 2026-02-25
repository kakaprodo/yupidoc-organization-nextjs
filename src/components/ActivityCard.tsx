'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';



interface ActivityCardProps {
    title: string;
    description: string;
    image: string;
    buttonText: string;
}

export default function ActivityCard({ title, description, image, buttonText }: ActivityCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-200 flex flex-col h-full group hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                <Image
                    src={image}
                    alt={title}
                    fill
                    onLoad={() => setIsLoaded(true)}
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            <div className="p-8 flex flex-col flex-grow gap-4">
                <h3 className="text-xl font-extrabold text-base-content leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-base-content/60 leading-relaxed line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto pt-4">
                    <button className="btn bg-[#5850ec] hover:bg-[#4a42d4] border-none text-white normal-case px-6 rounded-lg group/btn">
                        {buttonText}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}