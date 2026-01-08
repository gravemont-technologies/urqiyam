export type Question = {
    id: string;
    key: string; // matches DB column
    text: string;
    type: 'single' | 'multi';
    options: string[];
    whyDescription?: string;
};

export const questions: Question[] = [
    {
        id: '1',
        key: 'age_group',
        text: 'What is your current life stage?',
        type: 'single',
        options: ['Student', 'Fresh Graduate', 'Professional', 'Experienced Founder'],
        whyDescription: 'Helps us tailor the language and challenge difficulty to your context.'
    },
    {
        id: '2',
        key: 'vibe',
        text: 'What vibe are you aiming for?',
        type: 'single',
        options: ['Hustle/Grind', 'Balanced/Steady', 'Impact/Legacy', 'Spiritual/Barakah'],
        whyDescription: 'Determines the tone of the challenges and UI highlights.'
    },
    {
        id: '3',
        key: 'ethics_preference',
        text: 'What is your primary ethical focus?',
        type: 'single',
        options: ['Standard Business Ethics', 'Islamic/Sharia-Compliant', 'Social Impact', 'Environmental Sustainability'],
        whyDescription: 'Ensures your venture ideas align with your core values.'
    },
    {
        id: '4',
        key: 'college',
        text: 'What was your field of study?',
        type: 'single',
        options: ['Engineering/Tech', 'Computing/IT', 'Health Sciences', 'Business', 'General Ed/Arts', 'None'],
        whyDescription: 'Leverages your academic background for competency-based ideas.'
    },
    {
        id: '5',
        key: 'domains',
        text: 'Which industries interest you? (Select up to 3)',
        type: 'multi',
        options: ['FinTech', 'EdTech', 'HealthTech', 'E-commerce', 'Sustainability', 'Logistics', 'Food & Bev', 'Services'],
        whyDescription: 'Focuses idea generation on sectors you care about.'
    },
    {
        id: '6',
        key: 'experience',
        text: 'How would you rate your entrepreneurial experience?',
        type: 'single',
        options: ['Beginner', 'Intermediate (Launched before)', 'Expert (Scaled/Exited)'],
        whyDescription: 'Adjusts the complexity of the weekly challenges.'
    },
    {
        id: '7',
        key: 'timeline_horizon',
        text: 'What is your time horizon for results?',
        type: 'single',
        options: ['< 1 Year', '1-3 Years', '3-5 Years', '5+ Years (Legacy)'],
        whyDescription: 'Matches you with ideas that fit your patience and capital runway.'
    },
    {
        id: '8',
        key: 'principles',
        text: 'Select your guiding principles (Select up to 2)',
        type: 'multi',
        options: ['Profit-First', 'Community-First', 'Innovation-Driven', 'Tradition-Respecting'],
        whyDescription: 'Filters for business models that respect your operating philosophy.'
    },
    {
        id: '9',
        key: 'advantage',
        text: 'What is your unfair advantage?',
        type: 'single',
        options: ['Technical Skills', 'Deep Network', 'Access to Capital', 'Domain Expertise', 'Grit/Hustle'],
        whyDescription: 'We build ventures around your strengths, not your weaknesses.'
    },
    {
        id: '10',
        key: 'compliance_style',
        text: 'How do you approach rules and regulations?',
        type: 'single',
        options: ['Strict/Formal', 'Pragmatic', 'Guided (Need help)'],
        whyDescription: 'Customizes the level of legal/compliance guidance you receive.'
    },
    {
        id: '11',
        key: 'risk_appetite',
        text: 'What is your risk appetite?',
        type: 'single',
        options: ['Low (Safe bets)', 'Medium (Calculated)', 'High (Moonshots)'],
        whyDescription: 'Aligns idea volatility with your comfort zone.'
    },
    {
        id: '12',
        key: 'goal',
        text: 'What is your ultimate goal?',
        type: 'single',
        options: ['Financial Freedom', 'Social Impact', 'National Contribution (QNV2030)', 'Personal Mastery'],
        whyDescription: 'Keeps you motivated by tying daily tasks to your big picture.'
    }
];
