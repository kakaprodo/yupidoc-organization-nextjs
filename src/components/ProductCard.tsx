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
            className="bg-base-100 border border-base-300 flex flex-col h-full group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
        >
            {/* Fond de l'image : bg-base-200 est un gris très clair en light et sombre en dark */}
            <div className="relative aspect-square overflow-hidden bg-base-200/50 p-4">
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
                {/* text-base-content/50 crée un gris adaptatif */}
                <span className="text-[10px] uppercase tracking-widest text-base-content/50 font-bold mb-2">{category}</span>
                <h3 className="text-lg font-bold text-base-content mb-2">{title}</h3>
                <p className="text-xs text-base-content/60 line-clamp-2 mb-6 leading-relaxed">{description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-base-content">{price}</span>
                    <div className="flex gap-2">
                        {/* btn-outline avec border-base-300 est parfait pour le mode sombre */}
                        <button className="btn btn-sm btn-outline border-base-300 text-base-content hover:bg-base-200 normal-case">
                            View
                        </button>
                        {/* btn-primary utilise la couleur de votre charte graphique */}
                        <button className="btn btn-sm btn-primary text-white border-none normal-case">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}