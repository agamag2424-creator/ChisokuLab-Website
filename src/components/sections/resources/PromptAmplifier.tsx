'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PromptInput from '@/components/tools/prompt-amplifier/PromptInput';
import AmplifiedOutput from '@/components/tools/prompt-amplifier/AmplifiedOutput';
import CopyButton from '@/components/tools/prompt-amplifier/CopyButton';
import ClarifyingQuestions from '@/components/tools/prompt-amplifier/ClarifyingQuestions';
import Disclaimer from '@/components/tools/prompt-amplifier/Disclaimer';
import { ClarifyingQuestion } from '@/lib/prompt-amplifier/clarifyingQuestions';
import { AmplificationSource } from '@/lib/prompt-amplifier/promptAmplifier';
import { zenVariants } from '@/lib/animations';

type AppState = 'input' | 'clarifying' | 'amplifying' | 'done';

export default function PromptAmplifierSection() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<AmplificationSource | null>(null);
  
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
    <section className="py-section-mobile md:py-section bg-gradient-to-b from-gray-50 to-white">
      {/* Clarifying Questions Modal */}
      {showClarifyingModal && (
        <ClarifyingQuestions
          questions={questions}
          onSubmit={handleQuestionsSubmit}
          onSkip={handleQuestionsSkip}
          isLoading={isLoading}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="text-center mb-12"
        >
          <motion.span
            variants={zenVariants.staggerChild}
            className="inline-block px-4 py-2 rounded-full bg-chisoku-cyan-50 border border-chisoku-cyan-100 text-chisoku-cyan-600 text-sm font-medium mb-4"
          >
            Free Tool
          </motion.span>
          <motion.h2
            variants={zenVariants.staggerChild}
            className="text-3xl font-bold sm:text-4xl text-chisoku-navy mb-4"
          >
            Prompt Amplifier
          </motion.h2>
          <motion.p
            variants={zenVariants.staggerChild}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Transform vague ideas into comprehensive, actionable prompts. 
            Our AI-powered tool helps you communicate more effectively with any LLM.
          </motion.p>
        </motion.div>

        {/* Tool Interface */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Input Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <PromptInput
              value={input}
              onChange={setInput}
              onAmplify={handleAmplify}
              isLoading={isLoading || appState === 'clarifying'}
            />
            {clarifyingAnswers.length > 0 && (
              <div className="mt-4 p-3 bg-chisoku-cyan-50 border border-chisoku-cyan-100 rounded-xl">
                <p className="text-xs text-chisoku-cyan-700 mb-2 font-medium">
                  Context added from your answers:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {clarifyingAnswers.map((a, i) => (
                    <li key={i} className="truncate">• {a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <AmplifiedOutput
              output={output}
              isLoading={isLoading && appState === 'amplifying'}
              error={error}
              source={source}
              hasAnswers={clarifyingAnswers.length > 0}
            />
            <div className="mt-4 flex justify-between">
              <CopyButton text={output} disabled={!output || isLoading} />
              <button
                onClick={handleClear}
                disabled={(!input && !output) || isLoading}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50
                           text-gray-600 text-sm font-medium rounded-xl transition-colors
                           disabled:cursor-not-allowed disabled:text-gray-300"
              >
                Clear All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
        >
          <Disclaimer />
        </motion.div>
      </div>
    </section>
  );
}
