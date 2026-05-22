'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChevronRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from '@/navigation';
import { notFound } from 'next/navigation';

// 1. La source de vérité (Idéalement dans un fichier constants.ts plus tard)
const PRODUCTS_TECHNICAL = [
    { id: "1", category: "Refreshment", price: "$5.99", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800" },
    { id: "2", category: "Refreshment", price: "$7.50", image: "https://images.unsplash.com/photo-1628556747901-5e82f718817c?q=80&w=800" },
    { id: "3", category: "Fashion", price: "$45.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
    { id: "4", category: "Fashion", price: "$25.00", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" }
];

interface Props {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
    // 2. On déballe l'ID de l'URL (Next.js 15/16 style)
    const { id } = React.use(params);

    // 3. On récupère les traducteurs
    const tDetail = useTranslations('ProductDetail');
    const tProducts = useTranslations('Products');

    // 4. On cherche les données techniques correspondant à l'ID
    const productData = PRODUCTS_TECHNICAL.find(p => p.id === id);

    // Si l'ID n'existe pas dans nos données techniques, on affiche la 404
    if (!productData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            {/* Breadcrumbs Dynamiques */}
            <div className="bg-base-200/30 border-b border-base-200 py-4">
                <div className="container mx-auto px-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">
                    <Link href="/products" className="hover:text-primary">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-base-content">
                        {tProducts(`items.${id}.title`)}
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Image Produit Dynamique */}
                    <div className="bg-base-200/50 rounded-3xl p-12 aspect-square relative overflow-hidden group">
                        <Image
                            src={productData.image}
                            alt={tProducts(`items.${id}.title`)}
                            fill
                            priority
                            className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    {/* Infos Produit Dynamiques */}
                    <div className="space-y-8">
                        <div>
                            <span className="badge badge-primary font-bold mb-4">{productData.category}</span>
                            <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tight">
                                {tProducts(`items.${id}.title`)}
                            </h1>
                            <p className="text-3xl font-black text-primary">{productData.price}</p>
                        </div>

                        <p className="text-lg text-base-content/60 leading-relaxed">
                            {tProducts(`items.${id}.description`)}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="btn btn-primary btn-lg flex-1 rounded-xl text-white shadow-xl shadow-primary/20">
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                {tDetail('addToCart')}
                            </button>
                            <button className="btn btn-outline btn-lg flex-1 border-base-300 rounded-xl">
                                {tDetail('buyNow')}
                            </button>
                        </div>

                        {/* Garanties (Statiques mais traduites) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-base-200">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-bold uppercase text-base-content/50">{tDetail('shipping')}</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-bold uppercase text-base-content/50">Garantie Qualité</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RotateCcw className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-bold uppercase text-base-content/50">30 Jours Retour</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}