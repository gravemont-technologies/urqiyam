"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import IdeaSwipe from "@/components/IdeaSwipe";
import DashboardNavbar from "@/components/DashboardNavbar"; // Added
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added

export default function IdeasPage() {
    const [ideas, setIdeas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("Checking your profile...");
    const [locked, setLocked] = useState(false); // Added
    const [activeVentureTitle, setActiveVentureTitle] = useState(""); // Added
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchIdeas = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            // 1. Check if we already have pending ideas
            const { data: profile } = await supabase.from('users').select('id, active_venture_id, ventures(title)').eq('supabase_user_id', user.id).single();

            if (profile?.active_venture_id) {
                // Show Locked State instead of redirecting
                setLocked(true);
                // Find title
                const v = profile.ventures?.find((v: any) => v.id === profile.active_venture_id); // Or fetch single lookup
                // wait, select above fetches array of ventures. 
                // We need to fetch specific venture or filtering. 
                // Let's simplified fetch.
                if (Array.isArray(profile.ventures) && profile.ventures.length > 0) {
                    // Since select is ventures(*) it returns array.
                    // But we want the specific one. 
                    // Simple workaround: just set generic "Venture" if complex to fetch here
                    // But let's try to get it from profile.ventures array if populated
                    const activeV = profile.ventures.find((v: any) => v.id === profile.active_venture_id);
                    if (activeV) setActiveVentureTitle(activeV.title);
                }
                setLoading(false);
                return;
            }

            if (profile) {
                const { data: existingIdeas } = await supabase
                    .from('ideas')
                    .select('*')
                    .eq('user_id', profile.id)
                    .eq('status', 'pending');

                if (existingIdeas && existingIdeas.length > 0) {
                    setIdeas(existingIdeas);
                    setLoading(false);
                    return;
                }
            }

            // 2. Generate new ideas if none
            setStatus("Analyzing your startup DNA...");
            try {
                const res = await fetch("/api/generate-ideas");
                const json = await res.json();

                if (json.success) {
                    setStatus("Ideas generated! Loading...");
                    window.location.reload();
                } else {
                    setStatus("Failed to generate ideas. Please try again.");
                    console.error(json.error);
                }
            } catch (e) {
                setStatus("Error connecting to server.");
            }
        };

        fetchIdeas();
    }, [supabase, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <h2 className="text-xl font-bold text-gray-900">{status}</h2>
                <p className="text-gray-500 text-sm mt-2 max-w-xs text-center">
                    We are using AI to craft ventures that match your values and the Qatar National Vision 2030.
                </p>
            </div>
        );
    }

    if (locked) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardNavbar />
                <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            🔒
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ideation Locked</h2>
                        <p className="text-gray-600 mb-6">
                            You are currently executing <strong>{activeVentureTitle || "an active venture"}</strong>.
                            To maintain focus, new ideas are locked until you complete or drop your current venture.
                        </p>
                        <Link href="/venture" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors font-medium inline-block">
                            Go to My Venture
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />
            <div className="flex items-center justify-center py-8 px-4 overflow-hidden">
                <IdeaSwipe initialIdeas={ideas} />
            </div>
        </div>
    );
}
