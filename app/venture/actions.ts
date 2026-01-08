"use server";

import { createClient } from "@/utils/supabase/server";
import { generateChallenges } from "@/lib/openai";
import { revalidatePath } from "next/cache";

export async function generateRoadmapAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Fetch profile & venture
    const { data: profile } = await supabase
        .from('users')
        .select('*, ventures(*)')
        .eq('supabase_user_id', user.id)
        .single();

    if (!profile?.active_venture_id) throw new Error("No active venture");

    // Fetch venture directly to be safe
    const { data: venture } = await supabase.from('ventures').select('*').eq('id', profile.active_venture_id).single();
    if (!venture) throw new Error("Venture not found");

    try {
        const challenges = await generateChallenges(venture, profile);

        // Insert challenges
        const challengesToInsert = challenges.map((c: any) => {
            // Normalize Domain (Capitalize first letter, match strict schema enum)
            let domain = c.domain;
            if (domain) {
                // Handle cases like "Customer Success" -> "Customer" if needed, 
                // but schema expects exactly 'Product', 'Growth', 'Revenue', 'Customer', 'Finance', 'People', 'Operations', 'Strategy'
                // OpenAI might return 'Customer Success'. We need to map it.
                if (domain.includes('Customer')) domain = 'Customer';
                else if (domain.includes('Strategy')) domain = 'Strategy';
                else domain = domain.charAt(0).toUpperCase() + domain.slice(1).toLowerCase();
            }

            return {
                venture_id: venture.id,
                week_number: c.week_number,
                domain: domain,
                title: c.title,
                description: c.description,
                sub_challenges: c.sub_challenges || [],
                status: 'pending'
            };
        });

        const { error } = await supabase.from('challenges').insert(challengesToInsert);
        if (error) throw error;

        revalidatePath('/venture');
        revalidatePath('/dashboard');

    } catch (error) {
        console.error("Roadmap Gen Error:", error);
        throw new Error("Failed to generate roadmap");
    }
}
