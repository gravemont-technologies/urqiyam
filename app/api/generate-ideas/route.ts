import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { generateIdeas } from "@/lib/openai";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch full profile to get DNA
    let { data: profile } = await supabase
        .from("users")
        .select("id, dna_json")
        .eq("supabase_user_id", user.id)
        .single();

    if (!profile) {
        // Auto-create if missing (robustness)
        const { data: newProfile, error: createError } = await supabase
            .from("users")
            .insert({
                supabase_user_id: user.id,
                email: user.email,
                dna_json: {},
            })
            .select("id, dna_json")
            .single();

        if (createError || !newProfile) {
            return NextResponse.json({ error: "Profile not found and creation failed" }, { status: 404 });
        }
        profile = newProfile;
    }

    try {
        // Use shared library
        const ideasPayload = await generateIdeas(profile.dna_json);

        // Insert into DB
        const ideasToInsert = ideasPayload.map((idea: any) => ({
            user_id: profile.id, // Internal UUID
            ...idea
        }));

        const { error: insertError } = await supabase
            .from("ideas")
            .insert(ideasToInsert);

        if (insertError) {
            console.error("DB Insert Error", insertError);
            return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });
        }

        return NextResponse.json({ success: true, count: ideasPayload.length });

    } catch (error: any) {
        console.error("OpenAI Error", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
