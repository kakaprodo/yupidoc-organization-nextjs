import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface CourseCardProps {
    title: string;
    category: string;
    price: string;
    rating: number;
    image: string;
    instructor: string;
}

export default function CourseCard({ title, category, price, rating, image, instructor }: CourseCardProps) {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all group cursor-pointer">
            <figure className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                    <span className="badge badge-secondary badge-sm font-semibold">{category}</span>
                </div>
            </figure>
            <div className="card-body p-4 gap-1">
                <div className="flex items-center gap-1 text-warning">
                    <StarIcon className="h-4 w-4" />
                    <span className="text-xs font-bold text-base-content/70">{rating}</span>
                </div>
                <h3 className="card-title text-base leading-tight hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-xs text-base-content/60">Par {instructor}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">{price}</span>
                    <button className="btn btn-primary btn-sm rounded-md">S&apos;inscrire</button>
                </div>
            </div>
        </div>
    );
}