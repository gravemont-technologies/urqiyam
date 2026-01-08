"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
    { id: 'Product', label: 'Product', color: 'bg-red-50 text-red-700' },
    { id: 'Growth', label: 'Growth', color: 'bg-orange-50 text-orange-700' },
    { id: 'Revenue', label: 'Revenue', color: 'bg-green-50 text-green-700' },
    { id: 'Customer', label: 'Customer', color: 'bg-blue-50 text-blue-700' },
    { id: 'Finance', label: 'Finance', color: 'bg-emerald-50 text-emerald-700' },
    { id: 'People', label: 'People', color: 'bg-purple-50 text-purple-700' },
    { id: 'Operations', label: 'Operations', color: 'bg-gray-50 text-gray-700' },
    { id: 'Strategy', label: 'Strategy', color: 'bg-indigo-50 text-indigo-700' },
];

export default function VentureAccordion({ challenges }: { challenges: any[] }) {
    const [expandedDomain, setExpandedDomain] = useState<string | null>('Product');

    return (
        <div className="space-y-4">
            {DOMAINS.map((domain) => {
                const isExpanded = expandedDomain === domain.id;
                // Filter challenges for this domain
                const domainChallenges = challenges?.filter(c => c.domain === domain.id) || [];
                const activeChallenge = domainChallenges.find(c => c.status === 'pending') || domainChallenges[0];

                return (
                    <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <button
                            onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                            className={`w-full flex items-center justify-between p-4 transition-colors ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${domain.color}`}>
                                    {domain.label}
                                </span>
                                {activeChallenge && !isExpanded && (
                                    <span className="text-sm text-gray-500 truncate max-w-[200px] md:max-w-md">
                                        Focus: {activeChallenge.title}
                                    </span>
                                )}
                            </div>
                            <span className={`text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 border-t border-gray-100">
                                        {activeChallenge ? (
                                            <ChallengeDetail challenge={activeChallenge} />
                                        ) : (
                                            <div className="text-center py-8 text-gray-400 text-sm">
                                                No active challenges in this domain yet.
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

function ChallengeDetail({ challenge }: { challenge: any }) {
    const [showWhy, setShowWhy] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">Week {challenge.week_number}</span>
            </div>

            <p className="text-gray-600 mb-6">{challenge.description}</p>

            {/* Sub-challenges would go here if schema supports explicit sub-items, or we parse them */}
            {/* Assuming sub_challenges is JSONB array */}
            {challenge.sub_challenges && Array.isArray(challenge.sub_challenges) && (
                <div className="space-y-3 mb-6">
                    {challenge.sub_challenges.map((sub: any, idx: number) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 text-primary focus:ring-primary rounded" />
                                    <span className="text-sm text-gray-900 font-medium">{sub.title || sub}</span>
                                </div>
                                {sub.impact_score && (
                                    <span className="shrink-0 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded">
                                        Impact: {sub.impact_score}
                                    </span>
                                )}
                            </div>
                            {sub.rationale && (
                                <p className="text-xs text-gray-500 ml-7 leading-relaxed">
                                    <span className="font-semibold text-gray-400">Why:</span> {sub.rationale}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div>
                <button
                    onClick={() => setShowWhy(!showWhy)}
                    className="text-xs text-gray-500 underline hover:text-primary mb-2"
                >
                    {showWhy ? "Hide Rationale" : "Why is this important?"}
                </button>
                {showWhy && (
                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded italic animate-fade-in-up">
                        "Building this capability early prevents standard Qatari market pitfalls..."
                    </div>
                )}
            </div>
        </div>
    );
}
