import Image from 'next/image';

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Personalized to You */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="flex-1">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Personalized to You</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Ideas tailored to your background, beliefs, and skills. From your college focus to risk appetite,
                            Qiyam adapts every recommendation to fit you perfectly.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                                <span className="ml-2 text-gray-500">Curated ideas matching your DNA</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                                <span className="ml-2 text-gray-500">Values-aligned venture building</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/features-team.png"
                            alt="Diverse entrepreneurs collaborating"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Compliant from Day One */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Compliant from Day One</h2>
                    <p className="text-lg text-gray-600">
                        Build with confidence, knowing your ideas respect Qatar's rules, regulations, and cultural nuances.
                        We handle the complexity so you can focus on execution.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Legal Ready</h3>
                            <p className="text-sm text-gray-500">Aligned with local commerce laws</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Cultural Fit</h3>
                            <p className="text-sm text-gray-500">Respectful of local traditions</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Growth Policy</h3>
                            <p className="text-sm text-gray-500">Supports national economic goals</p>
                        </div>
                    </div>
                </div>

                {/* Vision 2030 Aligned */}
                <div id="vision-2030" className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Vision 2030 Aligned</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600">
                            Contribute to Qatar's future while pursuing high-competency ventures inspired by global leaders like Silicon Valley or Swiss innovation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                {/* Icon placeholder: Chart/Graph */}
                                <span className="text-2xl">📈</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Economic</h3>
                            <p className="text-sm text-gray-500">Innovation & Diversification</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Human</h3>
                            <p className="text-sm text-gray-500">Skills, Education & Workforce</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Social</h3>
                            <p className="text-sm text-gray-500">Cohesion, Heritage & Community</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Environmental</h3>
                            <p className="text-sm text-gray-500">Sustainability & Eco-Balance</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
