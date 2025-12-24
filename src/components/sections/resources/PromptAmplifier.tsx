'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PromptInput from '@/components/tools/prompt-amplifier/PromptInput';
import AmplifiedOutput from '@/components/tools/prompt-amplifier/AmplifiedOutput';
import CopyButton from '@/components/tools/prompt-amplifier/CopyButton';
import ClarifyingQuestions from '@/components/tools/prompt-amplifier/ClarifyingQuestions';
import Disclaimer from '@/components/tools/prompt-amplifier/Disclaimer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { zenVariants } from '@/lib/animations';
import { ClarifyingQuestion } from '@/lib/prompt-amplifier/clarifyingQuestions';

type AppState = 'input' | 'clarifying' | 'amplifying' | 'done';

export default function PromptAmplifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'gemini' | 'groq' | 'template' | null>(null);
  
  // Clarifying questions state
  const [appState, setAppState] = useState<AppState>('input');
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>([]);
  const [clarifyingAnswers, setClarifyingAnswers] = useState<string[]>([]);

  const handleAmplify = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setOutput('');
    setSource(null);

    try {
      // First check if input is vague
      const clarifyResponse = await fetch('/api/clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() }),
      });

      const clarifyData = await clarifyResponse.json();

      if (clarifyData.isVague && clarifyData.questions.length > 0) {
        // Show clarifying questions
        setQuestions(clarifyData.questions);
        setAppState('clarifying');
        setIsLoading(false);
        return;
      }

      // Not vague, proceed with amplification
      await amplifyWithAnswers([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  const amplifyWithAnswers = async (answers: string[]) => {
    setIsLoading(true);
    setAppState('amplifying');
    setClarifyingAnswers(answers);

    try {
      const response = await fetch('/api/amplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          input: input.trim(),
          clarifyingAnswers: answers.length > 0 ? answers : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to amplify prompt');
      }

      setOutput(data.output);
      setSource(data.source);
      setAppState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAppState('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionsSubmit = (answersMap: Record<string, string>) => {
    const answersList = Object.values(answersMap).filter(a => a.trim().length > 0);
    setQuestions([]);
    amplifyWithAnswers(answersList);
  };

  const handleQuestionsSkip = () => {
    setQuestions([]);
    amplifyWithAnswers([]);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setSource(null);
    setQuestions([]);
    setClarifyingAnswers([]);
    setAppState('input');
  };

  const showClarifyingModal = appState === 'clarifying' && questions.length > 0;

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-chisoku-cyan-50 border border-chisoku-cyan-200 text-chisoku-cyan-600 text-sm font-medium mb-4">
              Interactive Tool
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-chisoku-navy mb-3">
              Prompt Amplifier
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform vague ideas into comprehensive, actionable prompts using AI-powered amplification
            </p>
          </div>

          {/* Clarifying Questions Modal */}
          {showClarifyingModal && (
            <ClarifyingQuestions
              questions={questions}
              onSubmit={handleQuestionsSubmit}
              onSkip={handleQuestionsSkip}
              isLoading={isLoading}
            />
          )}

          {/* Main Tool */}
          <Card variant="elevated" className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px] mb-6">
              {/* Left: Input */}
              <div className="space-y-4 flex flex-col">
                <div className="flex-1 min-h-0">
                  <PromptInput
                    value={input}
                    onChange={setInput}
                    onAmplify={handleAmplify}
                    isLoading={isLoading || appState === 'clarifying'}
                  />
                </div>
                {clarifyingAnswers.length > 0 && (
                  <div className="mt-4 p-3 bg-chisoku-cyan-50 border border-chisoku-cyan-200 rounded-lg flex-shrink-0">
                    <p className="text-xs text-chisoku-cyan-600 mb-2 font-medium">
                      ✓ Context added from your answers:
                    </p>
                    <ul className="text-sm text-chisoku-navy space-y-1">
                      {clarifyingAnswers.map((a, i) => (
                        <li key={i} className="truncate">• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Output */}
              <div className="space-y-4 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <AmplifiedOutput
                    output={output}
                    isLoading={isLoading && appState === 'amplifying'}
                    error={error}
                    source={source}
                    hasAnswers={clarifyingAnswers.length > 0}
                  />
                </div>
                {(input || output) && (
                  <div className="flex justify-end items-center pt-2 flex-shrink-0">
                    <Button
                      onClick={handleClear}
                      disabled={isLoading}
                      variant="ghost"
                      size="sm"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer - moved outside grid with proper spacing */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Disclaimer />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

