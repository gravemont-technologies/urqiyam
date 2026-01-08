
export default function HowItWorks() {
    const steps = [
        {
            title: "1. Answer a Few Questions",
            description: "Quick quiz to capture your values, skills, and goals. We build a comprehensive profile of your entrepreneurial DNA.",
            icon: "📋"
        },
        {
            title: "2. Get Tailored Ideas",
            description: "Swipe through 10 personalized startup concepts. Each idea is rated for difficulty, Vision 2030 alignment, and market potential.",
            icon: "💡"
        },
        {
            title: "3. Pick & Commit",
            description: "Select one idea, set your timeline, and lock in. You unlock further resources only after you commit.",
            icon: "🔒"
        },
        {
            title: "4. Build with Guidance",
            description: "Access weekly high-bar challenges across 8 key domains like Product, Growth, and Revenue.",
            icon: "🚀"
        },
        {
            title: "5. Track Progress",
            description: "Monitor your Barakah (ethics), Business KPIs, and Sustainability scores via a visual growth tree.",
            icon: "🌳"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                    <p className="mt-4 text-lg text-gray-500">From idea to execution in 5 simple steps</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-4 font-bold shadow-md">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title.split('. ')[1]}</h3>
                                <p className="text-sm text-gray-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
