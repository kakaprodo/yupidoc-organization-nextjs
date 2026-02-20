'use client';

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Construction, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <main className="min-h-[80vh] flex items-center justify-center bg-base-100 px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Illustration animée */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="w-32 h-32 bg-[#5850ec]/10 rounded-full flex items-center justify-center border border-[#5850ec]/20">
                            <Construction className="w-16 h-16 text-[#5850ec]" />
                        </div>
                        {/* Petits cercles décoratifs */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                        >
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Textes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-8xl font-black text-base-content/10 mb-2 select-none">
                        {t('title')}
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                        {t('subtitle')}
                    </h2>
                    <p className="text-lg text-base-content/60 mb-10 leading-relaxed max-w-md mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Boutons d'action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="btn bg-[#5850ec] hover:bg-[#4a42d4] border-none text-white px-8 rounded-xl h-14 normal-case text-lg shadow-lg shadow-indigo-500/20 w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        {t('cta')}
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-ghost text-base-content/60 hover:text-primary normal-case gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Précédent
                    </button>
                </motion.div>
            </div>
        </main>
    );
}