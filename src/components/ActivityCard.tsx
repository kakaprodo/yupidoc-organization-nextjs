'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { ArrowRight, Calendar } from 'lucide-react';

interface ActivityCardProps {
    id: string; // Ajouté pour la navigation dynamique
    title: string;
    description: string;
    image: string;
    category: string; // Ex: "Workshop", "Summit"
    date?: string;    // Optionnel pour le footer
    buttonText: string;
    accentColor?: string;
}

export default function ActivityCard({
    id,
    title,
    description,
    image,
    category,
    date,
    buttonText,
    accentColor = "bg-[#5850ec]"
}: ActivityCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={`/activities/${id}`}>
            <motion.div
                // Animation d'entrée identique à CourseCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}

                // Effet 3D identique
                whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                    perspective: 1000
                }}
                 className="group relative bg-base-100 border border-base-200 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full"
            >
                {/* Conteneur Image - Ratio 16/9 identique */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-base-200">
                    {!isLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        onLoad={() => setIsLoaded(true)}
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                            isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Corps de la carte - Padding p-6 identique */}
                <div className="p-6 flex flex-col gap-4 flex-grow">
                    
                    {/* Header : Catégorie & Ligne d'accentuation */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#5850ec]/80">
                            {category}
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            className={`h-[3px] ${accentColor} rounded-full`}
                        />
                    </div>

                    {/* Titre & Description - Hauteur min-h identique */}
                    <div className="min-h-[100px]">
                        <h3 className="font-extrabold text-xl leading-tight text-base-content group-hover:text-[#5850ec] transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm text-base-content/60 mt-3 line-clamp-2 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>

                    {/* Footer : Info & Action - Bordure border-t identique */}
                    <div className="flex justify-between items-center mt-auto pt-5 border-t border-base-200">
                        <div className="flex items-center gap-2 text-[#5850ec]">
                            {date ? (
                                <div className="flex items-center gap-1.5 opacity-60">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">{date}</span>
                                </div>
                            ) : (
                                <span className="text-xs font-bold bg-[#5850ec]/5 px-2 py-1 rounded">
                                    Event
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#5850ec] group-hover:gap-2 transition-all">
                            {buttonText}
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Effet de bordure lumineuse au survol */}
                <div className="absolute inset-0 transition-colors duration-300 pointer-events-none" />
            </motion.div>
        </Link>
    );
}