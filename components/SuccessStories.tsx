export default function SuccessStories() {
    return (
        <section id="success-stories" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16">Success Stories</h2>

                <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-8 left-8 text-primary/20 text-6xl font-serif">"</div>

                    <div className="relative z-10 text-center">
                        <p className="text-xl md:text-2xl font-medium text-gray-800 italic mb-8">
                            "Qiyam helped me launch a sustainable health cafe aligned with my values and Qatar's environmental goals. The weekly challenges kept me focused on high-competency execution."
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="h-12 w-12 bg-gray-300 rounded-full overflow-hidden">
                                {/* Placeholder Avatar */}
                                <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-gray-900">Abdullah Al-M.</div>
                                <div className="text-sm text-primary">Founder of EcoEats</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
