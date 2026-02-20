'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamCardProps {
    name: string;
    role: string;
    bio: string;
    image: string;
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-300 p-8 rounded-2xl flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
        >
            <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-indigo-100 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Image src={image} alt={name} fill className="rounded-full object-cover relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-1">{name}</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600 mb-4">{role}</span>
            <p className="text-sm text-base-content/70 leading-relaxed font-medium">{bio}</p>
        </motion.div>
    );
}