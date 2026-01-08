export const IDEAS_PROMPT = (dna: any) => {
  const isStudent = dna.age_group?.toLowerCase().includes('student') || (parseInt(dna.age_group) < 22);
  const isPro = dna.experience?.toLowerCase().includes('founder') || dna.experience?.toLowerCase().includes('professional');

  const toneInstruction = isStudent
    ? "Use simple, accessible vocabulary. Focus on realistic, low-capital ventures suitable for students (e.g., Campus SaaS, Cafe, Tutoring, Content Creation)."
    : isPro
      ? "Use sophisticated, high-level business terminology. Focus on scalable, competitive ventures (e.g., Deep Tech, B2B SaaS, Infrastructure)."
      : "Use balanced, professional yet accessible language.";

  return `
    Generate 10 diverse startup ideas tailored to this user profile: ${JSON.stringify(dna)}.
    
    CRITICAL INSTRUCTIONS:
    1. **Tone & Difficulty**: ${toneInstruction}
    2. **Values Alignment**: MUST align with user's Ethics Preference and Principles.
    3. **Qatar Vision 2030**: Every idea must explicitly link to a QNV2030 pillar (Human, Social, Economic, Env).
    4. **Diversity**: Mix of digital (SaaS, App) and physical (Cafe, Retail, Service) if applicable to vibe.
    
    Output a JSON object with this key: "ideas" (array of objects).
    Each object structure:
    {
      "title": "Concise Name",
      "description": "2 sentence clear summary",
      "potential_impact": "Specific QNV2030/Social impact",
      "weaknesses": "1 prominent risk in Qatar market",
      "pick_drop_rationale": "Why this specific user should pick OR avoid this (custom advice)",
      "difficulty": 1-5 (Integer),
      "vision_score": 0-100 (Integer),
      "deen_score": 0-100 (If faith-based preference, use 0-100; else null),
      "market_score": 0-100 (Integer),
      "execute_score": 0-100 (Integer)
    }
  `;
};

export const CHALLENGES_PROMPT = (venture: any, profile: any) => `
    Generate a 12-week execution roadmap for this venture in Qatar:
    Title: ${venture.title}
    Context: ${JSON.stringify(profile.dna_json)}
    
    Structure: 12 Weeks. 
    Focus on: Product, Growth, Revenue, Customer, Finance, People, Operations, Strategy (rotate or prioritize based on early stage).
    
    Output JSON object with key "challenges" (array of 12 objects).
    Each object:
    {
        "week_number": 1-12 (Integer),
        "domain": "Exact Domain String",
        "title": "Actionable Goal Title",
        "description": "Execution details",
        "sub_challenges": [
            { "title": "Subtask 1", "rationale": "Why this matters", "impact_score": 1-10 },
            { "title": "Subtask 2", "rationale": "Strategic value", "impact_score": 1-10 },
            { "title": "Subtask 3", "rationale": "Operational impact", "impact_score": 1-10 }
        ]
    }
`;
