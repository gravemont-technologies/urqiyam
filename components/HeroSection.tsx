import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="relative bg-gray-900 h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                    filter: "brightness(0.6)"
                }}
            />

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up">
                    Build startups in alignment with your values and Qatar's vision
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                    Personalized guidance to launch sustainable ventures that matter—saving time on mismatched ideas and ensuring compliance from day one.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/signup"
                        className="bg-primary hover:bg-red-900 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </div>
    );
}
