'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import type { HeroSlide } from '@/types/general-type';

type HeroSectionProps = {
  slides?: HeroSlide[];
};

const fallbackSlides: HeroSlide[] = [
  {
    title: 'Learn from Great Mentors, Wherever You Are',
    description:
      'Students can study from home, ask questions freely, and receive support from experienced mentors until every lesson is fully understood.',
    image: '/scenes/sample-cover-1.webp'
  },
  {
    title: 'Education That Supports Every Student',
    description:
      'Yupidoc connects students with caring mentors who help them grow with confidence, improve their skills, and succeed in school and life.',
    image: '/scenes/sample-cover-2.webp'
  }
];

export default function HeroSection({ slides = [] }: HeroSectionProps) {
  const t = useTranslations('HomePage.Hero');
  const [current, setCurrent] = useState(0);

  const activeSlides = slides.length > 0
    ? slides
    : fallbackSlides.map((slide, index) => ({
      ...slide,
      title: index === 0 ? t('slides.1.title') : t('slides.2.title'),
      description: index === 0 ? t('slides.1.desc') : t('slides.2.desc')
    }));

  const nextSlide = () => setCurrent((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-125 w-full overflow-hidden bg-black lg:h-150">
      {activeSlides.map((slide, index) => (
        <div
          key={`${slide.title}-${slide.image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
        >
          <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-3xl">
                <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl">
                  {slide.title}
                </h1>
                <p className="mb-10 max-w-xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                  {slide.description}
                </p>
                <Link
                  href="/courses"
                  className="btn h-14  border-none rounded-3xl! bg-primary! px-8 text-lg normal-case text-white hover:bg-primary/90"
                >
                  {t('ctaPrimary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 right-8 z-20 flex gap-3 md:bottom-12 md:right-12">
        <button
          type="button"
          onClick={prevSlide}
          className="btn btn-circle border-white/20 bg-white/30 text-white backdrop-blur-sm hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="btn btn-circle border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
