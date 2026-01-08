import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('users')
        .select('*, ventures(*), scores(*)')
        .eq('supabase_user_id', user.id)
        .single();

    if (!profile) redirect('/quiz'); // Should handle lazy create but safe redirect
    if (!profile.dna_json) redirect('/quiz');
    if (!profile.active_venture_id) redirect('/ideas'); // Force pick if none

    // Calculate/Get Scores
    const scores = profile.scores?.[0] || { barakah_score: 0, business_score: 0, sustainability_score: 0 };
    const venture = profile.ventures?.find((v: any) => v.id === profile.active_venture_id);

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, building specifically for: {venture?.title || "Your Venture"}</p>
                </header>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ScoreCard title="Barakah Score" score={scores.barakah_score} color="bg-green-50 text-green-700" label="Values Alignment" />
                    <ScoreCard title="Business Score" score={scores.business_score} color="bg-blue-50 text-blue-700" label="KPI Performance" />
                    <ScoreCard title="Sustainability" score={scores.sustainability_score} color="bg-teal-50 text-teal-700" label="QNV 2030 Fit" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: Week Highlight & Barakah Tree */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Weekly Highlight */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Week 1 – Foundation</h2>
                                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">Current Focus</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Your priority this week is to establish the core value proposition and ensure ethical alignment.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-900 text-sm mb-2">🔥 Top Challenge</h3>
                                <p className="text-sm text-gray-600">Define your venture's &quot;Ethical Charter&quot; and identifying 3 key QNV2030 KPIs.</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <a href="/venture" className="text-primary font-medium hover:underline text-sm">Go to Excellence Hub &rarr;</a>
                            </div>
                        </div>

                        {/* Visual Barakah Tree Placeholder */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 self-start">Your Barakah Tree</h2>
                            <div className="flex-grow flex items-center justify-center">
                                {/* SVG Placeholder for Tree */}
                                <div className="text-gray-300">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22v-8m0-6V2" />
                                        <path d="M12 14c-4-4 0-8-4-12" />
                                        <path d="M12 14c4-4 0-8 4-12" />
                                    </svg>
                                    <p className="mt-2 text-sm">Seedling Stage</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Complete challenges to grow your tree and impact.</p>
                        </div>
                    </div>

                    {/* Sidebar: Status */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Venture Status</h2>
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-900">{venture?.title || "Loading..."}</h3>
                                <span className="text-xs text-green-600 font-medium">● Active</span>
                            </div>
                            {/* Timeline Bar */}
                            <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                                <div className="bg-primary h-2 rounded-full w-[10%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Start</span>
                                <span>Launch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function ScoreCard({ title, score, color, label }: any) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
            <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-extrabold text-gray-900">{score}</span>
                <span className="text-sm text-gray-400 mb-1">/100</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-md w-fit ${color} font-bold`}>{label}</span>
        </div>
    );
}
