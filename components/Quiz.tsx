"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { questions } from '@/lib/quiz-data';
import { submitQuiz } from '@/app/quiz/actions';

export default function Quiz() {
    const router = useRouter();
    const supabase = createClient();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [showWhy, setShowWhy] = useState(false);

    const question = questions[currentStep];

    const handleSelect = (option: string) => {
        if (question.type === 'single') {
            setAnswers({ ...answers, [question.key]: option });
            if (currentStep < questions.length - 1) {
                setTimeout(() => {
                    setCurrentStep(currentStep + 1);
                    setShowWhy(false);
                }, 300); // Small delay for visual feedback
            } else {
                // Prepare for submission on last step if single select
            }
        } else {
            // Multi-select logic
            const current = answers[question.key] || [];
            const isSelected = current.includes(option);
            let newSelection;
            if (isSelected) {
                newSelection = current.filter((item: string) => item !== option);
            } else {
                if (question.key === 'domains' && current.length >= 3) return; // Max 3
                if (question.key === 'principles' && current.length >= 2) return; // Max 2
                newSelection = [...current, option];
            }
            setAnswers({ ...answers, [question.key]: newSelection });
        }
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setShowWhy(false);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Construct DNA object (though 'answers' is mostly it, we might want to ensure schema match)
        const dna = { ...answers };

        try {
            await submitQuiz(dna);
        } catch (error) {
            console.error("Quiz Submission Error:", error);
            alert("Failed to submit quiz. Please ensure you are logged in using the 'Sign In' button on the homepage, or try again.");
            setLoading(false);
        }
    };

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto w-full">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: progress + '%' }}
                />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 min-h-[400px] flex flex-col">
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{question.text}</h2>
                    <p className="text-gray-400 text-sm mb-6">Question {currentStep + 1} of {questions.length}</p>

                    <div className="space-y-3">
                        {question.options.map((option) => {
                            const isSelected = question.type === 'single'
                                ? answers[question.key] === option
                                : (answers[question.key] || []).includes(option);

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${isSelected
                                        ? 'border-primary bg-primary/5 text-primary font-medium'
                                        : 'border-gray-200 hover:border-primary/50 text-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {isSelected && <span className="text-primary">✓</span>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setShowWhy(!showWhy)}
                            className="text-xs text-gray-500 underline hover:text-primary transition-colors focus:outline-none"
                        >
                            {showWhy ? "Hide Reasoning" : "Why do we ask this?"}
                        </button>
                        {showWhy && (
                            <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg animate-fade-in-up">
                                {question.whyDescription}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    {/* Back Button Optional */}
                    {question.type === 'multi' && (
                        <button
                            onClick={handleNext}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
                            disabled={!answers[question.key] || answers[question.key].length === 0}
                        >
                            {currentStep === questions.length - 1 ? (loading ? 'Saving...' : 'Finish') : 'Next'}
                        </button>
                    )}
                    {question.type === 'single' && currentStep === questions.length - 1 && answers[question.key] && (
                        <button
                            onClick={handleSubmit}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Finish'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
