import OpenAI from "openai";
import { IDEAS_PROMPT, CHALLENGES_PROMPT } from "@/lib/prompts";

export async function generateIdeas(dna: any) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = IDEAS_PROMPT(dna);
    const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful startup consultant. Output only valid JSON." },
            { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content from OpenAI");

    let ideasPayload;
    try {
        ideasPayload = JSON.parse(content);
        if (ideasPayload.ideas) ideasPayload = ideasPayload.ideas;
        if (!Array.isArray(ideasPayload)) {
            ideasPayload = [ideasPayload];
        }
    } catch (error) {
        console.error("OpenAI Idea Generation Error:", error);
        throw error;
    }

    // Map to DB structure (return clean objects)
    return ideasPayload.map((idea: any) => ({
        title: idea.title,
        description: idea.description,
        potential_impact: idea.potential_impact,
        weaknesses: idea.weaknesses,
        pick_drop_rationale: idea.pick_drop_rationale,
        difficulty: idea.difficulty || 3,
        vision_score: idea.vision_score || 0,
        deen_score: idea.deen_score,
        market_score: idea.market_score || 0,
        execute_score: idea.execute_score || 0,
        status: 'pending'
    }));
}

export async function generateChallenges(venture: any, profile: any) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = CHALLENGES_PROMPT(venture, profile);

    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a startup accelerator program director. Output valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content");

        const json = JSON.parse(content);
        return json.challenges || [];
    } catch (error) {
        console.error("OpenAI Challenge Error:", error);
        throw error;
    }
}
