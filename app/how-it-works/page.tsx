import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';
import Link from 'next/link';

export default async function HowItWorksPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check profile for tone adaptation
    let isStudent = false;
    if (user) {
        const { data: profile } = await supabase.from('users').select('age_group').eq('supabase_user_id', user.id).single();
        isStudent = profile?.age_group?.toLowerCase().includes('student') || (parseInt(profile?.age_group) < 22);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {user ? <DashboardNavbar /> : (
                <nav className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <Link href="/" className="text-2xl font-bold text-primary">Qiyam</Link>
                    </div>
                </nav>
            )}

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">The Qiyam Engine</h1>
                    <p className="text-xl text-gray-600">
                        {isStudent
                            ? "We help you turn your passion into a real business without the confusing jargon."
                            : "A systematic, values-driven framework for building scalable ventures in Qatar."}
                    </p>
                </header>

                <div className="space-y-12">
                    <Section
                        number="01"
                        title="Personalized Discovery"
                        text={isStudent
                            ? "We asked you about your skills and interests to find ideas that actually fit your life right now."
                            : "Using our proprietary algorithm, we analyze your psychometric profile and professional competencies to identify high-potential venture matches."}
                    />

                    <Section
                        number="02"
                        title="AI-Powered Ideation"
                        text={isStudent
                            ? "We use smart AI to come up with startup ideas that are easy to start and relevant to Qatar."
                            : "Leveraging advanced LLMs, we generate market-validated concepts aligned with QNV2030 pillars and local market gaps."}
                    />

                    <Section
                        number="03"
                        title="Values Scoring"
                        text="Every venture is scored on three dimensions: Barakah (Ethical/Religious alignment), Business Viability, and Sustainability. We ensure you build something that matters."
                    />

                    <Section
                        number="04"
                        title="Execution Roadmap"
                        text={isStudent
                            ? "We break down the big scary task of starting a business into small, weekly to-do lists."
                            : "A 12-week structured sprint methodology broken into 8 operational domains, ensuring systematic de-risking and execution."}
                    />
                </div>

                <div className="mt-16 text-center bg-primary/5 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Promise</h3>
                    <p className="text-gray-700 italic">
                        "{isStudent ? "No fluff, just steps." : "Precision, Purpose, and Progress."}"
                    </p>
                </div>
            </main>
        </div>
    );
}

function Section({ number, title, text }: any) {
    return (
        <div className="flex gap-6 items-start">
            <span className="text-4xl font-black text-gray-200">{number}</span>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{text}</p>
            </div>
        </div>
    );
}
