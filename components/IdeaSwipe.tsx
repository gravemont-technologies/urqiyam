"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Idea {
    id: string;
    title: string;
    description: string;
    potential_impact: string;
    weaknesses: string;
    pick_drop_rationale: string;
    difficulty: number;
    vision_score: number;
    deen_score?: number;
    market_score: number;
    execute_score: number;
}

export default function IdeaSwipe({ initialIdeas }: { initialIdeas: Idea[] }) {
    const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const activeIdea = ideas[0]; // Top card

    const handleSwipe = async (dir: 'left' | 'right') => {
        if (loading || !activeIdea) return;
        setLoading(true);
        setDirection(dir);

        // Optimistic update of UI
        // We'll wait for animation to finish before removing from list
        // But we trigger DB call immediately

        if (dir === 'left') {
            // Reject
            const { error } = await supabase
                .from('ideas')
                .update({ status: 'rejected' })
                .eq('id', activeIdea.id);

            if (error) console.error(error);

            setTimeout(() => {
                setIdeas(prev => prev.slice(1));
                setDirection(null);
                setLoading(false);
            }, 200);

        } else {
            // Pick - Lock & Create Venture
            const { error: updateError } = await supabase
                .from('ideas')
                .update({ status: 'picked' })
                .eq('id', activeIdea.id);

            if (updateError) {
                setLoading(false);
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            const { data: profile } = await supabase.from('users').select('id').eq('supabase_user_id', user!.id).single();

            if (profile) {
                // Insert and GET returned ID
                const { data: newVenture, error: insertError } = await supabase.from('ventures').insert({
                    user_id: profile.id,
                    idea_id: activeIdea.id,
                    title: activeIdea.title,
                    timeline: { start: new Date().toISOString() },
                    status: 'active'
                })
                    .select('id')
                    .single();

                if (insertError || !newVenture) {
                    console.error("Venture Creation Error", insertError);
                    setLoading(false);
                    return;
                }

                // Lock user's active venture with CORRECT ID
                await supabase.from('users').update({ active_venture_id: newVenture.id }).eq('id', profile.id);

                router.push('/dashboard');
            }
        }
    };

    if (!activeIdea) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl text-gray-600">No more ideas.</h2>
                <button onClick={() => window.location.reload()} className="mt-4 text-primary underline">
                    Look for more
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-2xl h-[700px] mx-auto">
            <AnimatePresence>
                <Card
                    key={activeIdea.id}
                    idea={activeIdea}
                    onSwipe={handleSwipe}
                />
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8">
                <button
                    onClick={() => handleSwipe('left')}
                    disabled={loading}
                    className="w-14 h-14 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 border border-gray-200 flex items-center justify-center text-2xl font-bold transition-colors"
                >
                    ✕
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    disabled={loading}
                    className="w-14 h-14 bg-primary rounded-full shadow-lg text-white hover:bg-red-800 flex items-center justify-center text-2xl font-bold transition-colors"
                >
                    ♥
                </button>
            </div>
        </div>
    );
}

function Card({ idea, onSwipe }: { idea: Idea, onSwipe: (dir: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const background = useTransform(x, [-200, 0, 200], ["rgb(255 200 200)", "rgb(255 255 255)", "rgb(200 255 200)"]); // Optional tint

    function handleDragEnd(_: any, info: any) {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
    }

    return (
        <motion.div
            style={{ x, rotate, backgroundColor: 'white' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0 }}
            className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col"
        >
            <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase tracking-wide">Startup Idea</span>
                    <div className="flex gap-1">
                        {idea.deen_score !== undefined && (
                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">Deen: {idea.deen_score}</span>
                        )}
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">Vis: {idea.vision_score}</span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{idea.title}</h2>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {idea.description}
                </p>

                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">Potential Impact</h3>
                        <p className="text-sm text-gray-600">{idea.potential_impact}</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">Market</h3>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: `${idea.market_score}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">Execution</h3>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${idea.execute_score}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">Why pick this?</h3>
                        <p className="text-sm text-gray-500 italic">"{idea.pick_drop_rationale}"</p>
                    </div>

                    <details className="group">
                        <summary className="cursor-pointer text-xs text-red-500 font-medium list-none flex items-center gap-1">
                            <span>⚠️ Weaknesses</span>
                            <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="mt-2 text-xs text-gray-500 bg-red-50 p-2 rounded">
                            {idea.weaknesses}
                        </div>
                    </details>
                </div>
            </div>
        </motion.div>
    );
}
