"use server";

import { createClient } from "@/utils/supabase/server";
import { generateIdeas } from "@/lib/openai";
import { redirect } from "next/navigation";

export async function submitQuiz(dnaJson: any) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    // 1. Get or Create Internal User ID
    let { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("supabase_user_id", user.id)
        .single();

    if (!profile) {
        // Create new profile
        const { data: newProfile, error: createError } = await supabase
            .from("users")
            .insert({
                supabase_user_id: user.id,
                email: user.email,
                dna_json: dnaJson,
                // Optional: Map other fields if needed, but dna_json covers the data
            })
            .select("id")
            .single();

        if (createError) {
            console.error("Create Profile Error:", createError);
            throw new Error("Failed to create profile");
        }
        profile = newProfile;
    } else {
        // 2. Update existing DNA
        const { error: userError } = await supabase
            .from("users")
            .update({ dna_json: dnaJson })
            .eq("supabase_user_id", user.id);

        if (userError) throw new Error("Failed to save quiz");
    }

    // 3. Generate Ideas (Server-side call)
    try {
        const ideas = await generateIdeas(dnaJson);

        // 4. Insert Ideas
        const ideasToInsert = ideas.map((idea: any) => ({
            user_id: profile.id, // Internal UUID
            ...idea
        }));

        const { error: insertError } = await supabase
            .from("ideas")
            .insert(ideasToInsert);

        if (insertError) throw new Error("Failed to save ideas");

    } catch (e) {
        console.error("AI Generation Error:", e);
        // We update DNA anyway, so user can retry generation on /ideas page if strict fails
        // But ideally we want it done here.
        // If fail, we redirect to /ideas and let the client-side fetcher (backup) or reload handle it.
    }

    redirect("/ideas");
}
