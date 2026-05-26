import Image from 'next/image';
import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string | null;
  searchSection?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  searchSection
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-base-200 py-20 lg:py-24">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="bg-image"
          fill
          priority
          className="absolute inset-0 -z-20 object-cover "
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_50%),linear-gradient(135deg,rgba(15,23,42,0.08),rgba(59,130,246,0.08))]" />
      )}

      <div className="absolute inset-0 -z-10 bg-gray-800/80" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/85">
            {subtitle}
          </p>
        ) : null}

        {searchSection ? <div className="mt-10">{searchSection}</div> : null}
      </div>
    </section>
  );
}
