'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/navigation';

interface ProductCardProps {
    id: string;
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
}

export default function ProductCard({ id, title, category, description, price, image }: ProductCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={`/products/${id}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-base-100 border border-base-200 flex flex-col h-full group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
            >
                <div className="relative aspect-square overflow-hidden bg-base-200/50 p-4">
                    {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        onLoad={() => setIsLoaded(true)}
                        className={`object-contain p-8 transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-2">{category}</span>
                    <h3 className="text-lg font-extrabold text-base-content mb-2 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-xs text-base-content/60 line-clamp-2 mb-6 leading-relaxed">{description}</p>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-black text-base-content">{price}</span>
                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-ghost border border-base-300 text-base-content/70 hover:bg-base-200 normal-case rounded-lg">
                                View
                            </button>
                            <button className="btn btn-sm btn-primary text-white border-none normal-case rounded-lg shadow-lg shadow-primary/20">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}