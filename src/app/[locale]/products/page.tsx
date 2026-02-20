'use client';

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";

const PRODUCTS_DATA = [
    { id: 1, category: "Refreshment", title: "Organic Orange Juice", description: "Freshly squeezed from organic oranges, packed with Vitamin C.", price: "$5.99", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400" },
    { id: 2, category: "Refreshment", title: "Green Detox Smoothie", description: "A perfect blend of spinach, apple, and ginger to cleanse your body.", price: "$7.50", image: "https://images.unsplash.com/photo-1628556747901-5e82f718817c?q=80&w=400" },
    { id: 3, category: "Fashion", title: "Signature Hoodie", description: "Premium cotton blend hoodie featuring our embroidered logo.", price: "$45.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { id: 4, category: "Fashion", title: "Classic Cotton Tee", description: "Soft, breathable 100% organic cotton t-shirt with minimalist design.", price: "$25.00", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400" }
];

export default function ProductsPage() {
    const t = useTranslations('ProductsPage');

    return (
        <main className="min-h-screen bg-white pb-20">
            <PageHero title={t('Hero.title')} subtitle={t('Hero.subtitle')} />
            <div className="container mx-auto px-4 lg:px-8 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS_DATA.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </main>
    );
}