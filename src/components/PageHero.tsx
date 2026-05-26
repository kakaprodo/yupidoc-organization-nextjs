interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-base-200 bg-base-200/50 py-20 lg:py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-black tracking-tight text-base-content md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-base-content/60">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

