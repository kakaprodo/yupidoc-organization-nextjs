'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HeroCarousel() {
    const t = useTranslations('HomePage.Hero');
    const locale = useLocale();
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920",
            title: t('slides.1.title'),
            desc: t('slides.1.desc'),
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920",
            title: t('slides.2.title'),
            desc: t('slides.2.desc'),
        }
    ];

    const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Auto-play optionnel
    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-black">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="object-cover"
                    />
                    {/* Overlay sombre uniforme comme sur l'image */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Contenu Texte */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 md:px-12">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
                                    {slide.desc}
                                </p>
                                <Link 
                                    href="/activities" 
                                    className="btn border-none bg-[#5850ec] hover:bg-[#4a42d4] text-white px-8 h-14 rounded-lg text-lg normal-case"
                                >
                                    {t('ctaPrimary')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Contrôles de navigation (Bas Droite) */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex gap-3">
                <button 
                    onClick={prevSlide}
                    className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    aria-label="Previous slide"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button 
                    onClick={nextSlide}
                    className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    aria-label="Next slide"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}