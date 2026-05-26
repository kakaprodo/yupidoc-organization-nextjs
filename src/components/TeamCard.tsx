import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/10">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-base-content">{name}</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">{role}</p>
        <p className="mt-4 text-sm leading-relaxed text-base-content/60">{bio}</p>
      </div>
    </article>
  );
}

