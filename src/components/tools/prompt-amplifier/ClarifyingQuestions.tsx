'use client';

import { useState, useEffect, useRef } from 'react';
import { ClarifyingQuestion } from '@/lib/prompt-amplifier/clarifyingQuestions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ClarifyingQuestionsProps {
  questions: ClarifyingQuestion[];
  onSubmit: (answers: Record<string, string>) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

/**
 * ClarifyingQuestions Component
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
  const firstInputId = `question-${questions[0]?.id || 'q1'}`;

  // Focus first input on mount
  useEffect(() => {
    if (questions.length > 0) {
      const firstInput = document.getElementById(firstInputId);
      firstInput?.focus();
    }
  }, [firstInputId, questions.length]);

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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div 
        ref={dialogRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 id="dialog-title" className="text-xl font-semibold text-chisoku-navy">
            Help us understand your request better
          </h2>
          <p id="dialog-description" className="text-gray-600 text-sm mt-1">
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
              <Input
                id={`question-${q.id}`}
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                disabled={isLoading}
                aria-describedby={`hint-${q.id}`}
              />
              <span id={`hint-${q.id}`} className="sr-only">
                {q.placeholder}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between gap-4">
          <Button
            onClick={onSkip}
            disabled={isLoading}
            variant="ghost"
          >
            Skip Questions
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !hasAnswers}
            isLoading={isLoading}
          >
            Continue with Answers
          </Button>
        </div>
      </div>
    </div>
  );
}

