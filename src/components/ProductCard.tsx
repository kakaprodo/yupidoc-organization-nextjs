'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
}

export default function ProductCard({ title, category, description, price, image }: ProductCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-100 flex flex-col h-full group hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
                {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                <Image
                    src={image}
                    alt={title}
                    fill
                    onLoad={() => setIsLoaded(true)}
                    className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">{category}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed">{description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-slate-900">{price}</span>
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline border-slate-200 text-slate-600 hover:bg-slate-50 normal-case">View</button>
                        <button className="btn btn-sm bg-[#0a0f1c] text-white hover:bg-slate-800 border-none normal-case">Buy</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}