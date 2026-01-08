"use client";
import { useState } from 'react';

const DOMAINS = ['Product', 'Growth', 'Revenue', 'Customer', 'Finance', 'People', 'Operations', 'Strategy'];

export default function VentureKanban({ challenges }: { challenges: any[] }) {
    const [selectedChallenge, setSelectedChallenge] = useState<any | null>(null);

    return (
        <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-[1200px]">
                {DOMAINS.map(domain => {
                    const domainChallenges = challenges.filter(c => c.domain === domain);

                    return (
                        <div key={domain} className="w-[300px] shrink-0 bg-gray-100/50 rounded-xl p-3 border border-gray-100 flex flex-col h-[600px]">
                            <h3 className="font-bold text-gray-700 mb-3 px-1 flex justify-between items-center">
                                {domain} <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{domainChallenges.length}</span>
                            </h3>

                            <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                                {domainChallenges.map(challenge => (
                                    <div
                                        key={challenge.id}
                                        className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow group"
                                        onClick={() => setSelectedChallenge(challenge)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">W{challenge.week_number}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900 mb-1 leading-snug group-hover:text-primary transition-colors">{challenge.title}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-3">{challenge.description}</p>
                                    </div>
                                ))}
                                {domainChallenges.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 text-xs italic border-2 border-dashed border-gray-200 rounded-lg">
                                        No tasks
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for Details */}
            {selectedChallenge && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedChallenge(null)}>
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-wide">{selectedChallenge.domain} • Week {selectedChallenge.week_number}</span>
                                <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedChallenge.title}</h2>
                            </div>
                            <button onClick={() => setSelectedChallenge(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{selectedChallenge.description}</p>

                        <h3 className="font-bold text-sm text-gray-900 mb-3 bg-gray-50 p-2 rounded">Sub-Challenges Execution</h3>
                        <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto">
                            {selectedChallenge.sub_challenges?.map((sub: any, i: number) => (
                                <div key={i} className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <div className="flex gap-2">
                                            <input type="checkbox" className="mt-1 text-primary rounded border-gray-300" />
                                            <span className="text-sm font-medium text-gray-800">{sub.title}</span>
                                        </div>
                                        <span className="shrink-0 text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                                            Impact: {sub.impact_score}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 italic pl-6 border-l-2 border-primary/20">{sub.rationale}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setSelectedChallenge(null)} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
                            Close Logic
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
