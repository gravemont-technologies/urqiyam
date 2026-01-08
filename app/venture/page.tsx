import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';
import VentureKanban from '@/components/VentureKanban';
import { generateRoadmapAction } from './actions';

export default async function VenturePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('users')
        .select('*, ventures(*)')
        .eq('supabase_user_id', user.id)
        .single();

    if (!profile?.active_venture_id) redirect('/ideas');

    // Fetch active venture directly using the exact ID
    const { data: venture } = await supabase
        .from('ventures')
        .select('*')
        .eq('id', profile.active_venture_id)
        .single();

    if (!venture) {
        // Self-healing: Clear invalid active_venture_id to break loop
        // This handles the "Redirect Loop" bug if data is desynced
        await supabase.from('users').update({ active_venture_id: null }).eq('supabase_user_id', user.id);
        redirect('/ideas');
    }

    // Fetch challenges
    const { data: challenges } = await supabase
        .from('challenges')
        .select('*')
        .eq('venture_id', venture.id)
        .order('week_number', { ascending: true });

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">My Venture</span>
                            <h1 className="text-3xl font-bold text-gray-900 mt-1">{venture.title}</h1>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                            Active
                        </div>
                    </div>

                    {/* Visual Timeline (Draggable Placeholder) */}
                    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                            <span>Concept</span>
                            <span>Validation</span>
                            <span>Product</span>
                            <span>Growth</span>
                        </div>
                        <div className="relative w-full h-2 bg-gray-100 rounded-full">
                            <div className="absolute left-0 top-0 h-full bg-primary rounded-full w-[15%]"></div>
                            {/* Milestones dots */}
                            <div className="absolute left-[0%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                            <div className="absolute left-[33%] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                            <div className="absolute left-[66%] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                            <div className="absolute left-[100%] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Execution Hub</h2>
                        <span className="text-sm text-gray-500">Week 1 of 12</span>
                    </div>

                    <VentureKanban challenges={challenges || []} />

                    {(!challenges || challenges.length === 0) && (
                        <div className="mt-8 text-center p-8 bg-white rounded-2xl border border-dashed border-gray-300">
                            <h3 className="text-lg font-medium text-gray-900">No challenges generated yet</h3>
                            <p className="text-gray-500 mb-4">Ready to start your Week 1 execution?</p>
                            <form action={generateRoadmapAction}>
                                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-900 disabled:opacity-50">
                                    Generate Roadmap
                                </button>
                            </form>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
