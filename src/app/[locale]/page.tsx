import HeroCarousel from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";


const MOCK_COURSES = [
    { id: 1, title: "Next.js Mastery", category: "Dev", price: "49$", rating: 4.9, instructor: "John", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400" },
    { id: 2, title: "Design UI", category: "Design", price: "29$", rating: 4.8, instructor: "Jane", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400" },
    { id: 3, title: "IA Pro", category: "IA", price: "Free", rating: 4.7, instructor: "AI", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400" },
    { id: 4, title: "Agile", category: "Business", price: "34$", rating: 4.9, instructor: "Marc", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400" },
];

export default function HomePage() {
    return (
        <div className="flex flex-col gap-20">
            <HeroCarousel />

            <section className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Cours Populaires</h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>
                    </div>
                    <button className="btn btn-ghost text-primary">Voir tout</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_COURSES.map(course => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>
            </section>

            {/* Ajoute d'autres sections ici (Features, Stats, Testimonials) */}

            <Footer />
        </div>
    );
}