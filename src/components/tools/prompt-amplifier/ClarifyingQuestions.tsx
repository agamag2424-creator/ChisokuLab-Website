'use client';

import { useState, useEffect, useRef } from 'react';
import { ClarifyingQuestion } from '@/lib/prompt-amplifier/clarifyingQuestions';

interface ClarifyingQuestionsProps {
  questions: ClarifyingQuestion[];
  onSubmit: (answers: Record<string, string>) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

/**
 * ClarifyingQuestions Component - ChisokuLab Branded
 * Modal dialog for gathering additional context from users
 */
export default function ClarifyingQuestions({
  questions,
  onSubmit,
  onSkip,
  isLoading = false
}: ClarifyingQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onSkip();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLoading, onSkip]);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const hasAnswers = Object.values(answers).some(a => a.trim().length > 0);

  return (
    <div 
      className="fixed inset-0 bg-chisoku-navy/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div 
        ref={dialogRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-chisoku-cyan-50 to-white">
          <h2 id="dialog-title" className="text-xl font-semibold text-chisoku-navy">
            Help us understand your request better
          </h2>
          <p id="dialog-description" className="text-gray-500 text-sm mt-1">
            Answer these questions to get a more tailored prompt (press Esc to skip)
          </p>
        </div>

        {/* Questions */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-2">
              <label 
                htmlFor={`question-${q.id}`}
                className="block text-sm font-medium text-chisoku-navy"
              >
                {index + 1}. {q.question}
              </label>
              <input
                ref={index === 0 ? firstInputRef : undefined}
                id={`question-${q.id}`}
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                disabled={isLoading}
                aria-describedby={`hint-${q.id}`}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl
                           text-chisoku-navy placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500 focus:bg-white
                           disabled:opacity-50 transition-colors"
              />
              <span id={`hint-${q.id}`} className="sr-only">
                {q.placeholder}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-between gap-4 bg-gray-50">
          <button
            onClick={onSkip}
            disabled={isLoading}
            className="px-6 py-3 bg-white hover:bg-gray-100 border border-gray-200
                       text-gray-600 font-medium rounded-xl transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip Questions
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !hasAnswers}
            aria-busy={isLoading}
            className="px-6 py-3 bg-chisoku-cyan-500 hover:bg-chisoku-cyan-600 
                       text-white font-medium rounded-xl transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2 shadow-md"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" 
                          stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              'Continue with Answers'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
