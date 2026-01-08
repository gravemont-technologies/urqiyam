# Qiyam Product Specification

## Overview
Qiyam is a progressive web app (PWA) serving as a personalized startup engine for entrepreneurs, focusing on building sustainable businesses aligned with users' personal values, religious KPIs (if applicable), business KPIs, and Qatar National Vision 2030 (QNV2030) pillars: Economic Development (innovation, diversification, high-competency models like Silicon Valley or Swiss precision), Human Development (skills building, education), Social Development (cultural cohesion, community impact), and Environmental Development (sustainability, eco-balance). The app avoids over-emphasis on Qatar branding outside dedicated sections, maintaining a neutral, global appeal. It supports a variety of business types—not limited to SaaS/PaaS—including physical ventures like electric vehicle charging stations, culturally tailored study cafes for online learning, halal restaurants with sustainable sourcing, or wellness centers blending modern health with ethical practices, all ensured compliant with Qatari laws (e.g., labor, finance, environmental regs).

## Tech Stack
- **Database & Auth**: Supabase for all data storage and user authentication (email/password, social logins). Execute a one-time `schema.sql` to create tables:
  - `users`: id (uuid), email (text), nationality (text), age_group (text), vibe (text), ethics_preference (text), college (text), domains (jsonb array), experience (text), timeline_horizon (text), principles (jsonb array), advantage (text), compliance_style (text), risk_appetite (text), dna_json (jsonb – enriched profile).
  - `ideas`: id (uuid), user_id (uuid), title (text), description (text), impact (text), weaknesses (text), pick_drop_rationale (text), difficulty (int 1-5), vision_score (int), deen_score (int – if applicable), market_score (int), execute_score (int), status (text: swiped, picked, dropped).
  - `ventures`: id (uuid), user_id (uuid), idea_id (uuid), timeline (jsonb – start/end dates, milestones), status (text: active, completed, dropped).
  - `challenges`: id (uuid), venture_id (uuid), domain (text: Product/Growth/etc.), title (text), description (text), sub_challenges (jsonb array: {sub_title, why, impact_score 1-10}), week (int), status (text: pending/completed).
  - `scores`: id (uuid), user_id (uuid), barakah (int), business (int), sustainability (int), updated_at (timestamp).
  - Additional: logs, settings for scalability.
- **AI Integration**: OpenAI API for generating ideas and challenges. Use GPT models with tailored prompt templates (below) for personalization.
- **Frontend**: React/Next.js for PWA (offline support, manifests). UI: Mobile-first, with dynamic adaptations (e.g., colors, tone based on quiz).
- **Deployment**: GitHub → Vercel for hosting.
- **Other**: No additional packages; leverage Supabase edge functions for API calls if needed.

## User Workflow
1. **Landing Page**: Neutral discovery (as detailed above). CTA to signup/login.
2. **Signup/Login**: Supabase auth → Redirect new users to quiz.
3. **Onboarding Quiz**: 12 questions from quiz.md (clean phrasing, toggles for "Why?"). Outputs enriched DNA JSON stored in DB. Adapt UI immediately (e.g., simplify for <25 age, Deen emphasis for faith-based).
4. **Ideas Generation & Swipe**: Post-quiz, call OpenAI to generate 10 ideas (varied types, aligned to DNA/QNV2030). Tinder-style swipe (right: like, left: reject). Each idea card: Title, Description, Potential Impact, Weaknesses, Pick/Drop Rationale, Difficulty (1-5 stars slider filter), Scores (Vision 2030, Deen if applicable, Market, Execute). Once picked: Lock swiping, store in DB.
5. **Venture Setup**: Set customizable timeline (draggable scrollbar for milestones, e.g., 0-15 years horizon). Unlock swiping only on completion/drop.
6. **Dashboard**: Minimalist view with vital info: Barakah Score (values/religious alignment, e.g., ethical KPIs), Business Score (KPIs like MRR, LTV/CAC), Sustainability Score (QNV2030 fit). Visual: Barakah Tree for progress (branches grow with completions).
7. **Challenges Engine**: High-bar weekly objectives across 8 umbrellas (Product, Growth, Revenue, Customer Success & Retention, Finance, People, Operations, Strategy & Leadership). Each expandable to sub-challenges with "why" (rationale) and impact score (1-10). AI-generated, tailored to DNA (e.g., Sharia-compliant finance challenges, sustainability focus). Push for deep competency (e.g., Palantir-level ops efficiency).
8. **How It Works Tab**: Precise explanations: Processes (quiz → ideas → challenges), logic (AI alignment to values/QNV2030), reasoning (why varied business types, high standards), impact (e.g., "Completing challenges boosts scores, unlocking advanced ideas").
9. **Completion/Drop**: Mark venture done/dropped → Unlock ideas, update scores.

## OpenAI Prompt Templates
Use these at relevant stages, injecting user DNA JSON for tailoring. Ensure outputs align to values, religious KPIs (e.g., halal, ethical), business KPIs (viability, scalability), QNV2030 (e.g., economic innovation without oil dependency).

- **Ideas Generation Template**:  
  "Generate 10 diverse startup ideas tailored to this user profile: [DNA JSON]. Ideas must align with their values [e.g., faith-based if selected], QNV2030 pillars [list], and vary types (SaaS, physical like cafes/power infrastructure, services). For each: {title: concise name, description: 1-2 sentences, potential_impact: positive outcomes tied to KPIs/QNV2030, weaknesses: realistic challenges in Qatar context, pick_drop_rationale: why pick/drop based on user fit, difficulty stars: 1-5, vision_score: 0-100, deen_score: 0-100 if applicable, market_score: 0-100, execute_score: 0-100}. Ensure compliance with Qatari laws."

- **Challenges Generation Template (Per Domain/Week)**:  
  "For this user's venture [idea details] and profile [DNA JSON], generate 3-5 weekly challenges in [domain, e.g., Product]. Each: {title: actionable goal, description: steps, sub_challenges: array of {sub_title, why: rationale tied to values/QNV2030/KPIs, impact_score: 1-10}}. Focus on high standards (e.g., SV-level execution), alignment to religious/ethical KPIs, business growth (e.g., retention multipliers), and varied business types."
