'use client';

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";

const PRODUCTS_TECHNICAL = [
    { id: "1", category: "Refreshment", price: "$5.99", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400" },
    { id: "2", category: "Refreshment", price: "$7.50", image: "https://images.unsplash.com/photo-1628556747901-5e82f718817c?q=80&w=400" },
    { id: "3", category: "Fashion", price: "$45.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { id: "4", category: "Fashion", price: "$25.00", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400" }
];

export default function ProductsPage() {
    const tPage = useTranslations('ProductsPage');
    const tItems = useTranslations('Products');

    return (
        <main className="min-h-screen bg-base-100 pb-20">
            <PageHero title={tPage('Hero.title')} subtitle={tPage('Hero.subtitle')} />
            <div className="container mx-auto px-4 lg:px-8 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS_TECHNICAL.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            title={tItems(`items.${product.id}.title`)}
                            description={tItems(`items.${product.id}.description`)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}