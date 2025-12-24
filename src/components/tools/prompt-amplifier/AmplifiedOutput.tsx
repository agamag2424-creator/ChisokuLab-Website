'use client';

import ReactMarkdown from 'react-markdown';
import SourceIndicator from './SourceIndicator';
import CopyButton from './CopyButton';

interface AmplifiedOutputProps {
  output: string;
  isLoading: boolean;
  error: string | null;
  source: 'gemini' | 'groq' | 'template' | null;
  hasAnswers?: boolean;
}

export default function AmplifiedOutput({ 
  output, 
  isLoading, 
  error, 
  source,
  hasAnswers = false 
}: AmplifiedOutputProps) {
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <label className="text-sm font-medium text-chisoku-navy mb-2">Amplified Prompt</label>
        <div className="flex-1 p-4 bg-white border border-red-500 rounded-lg">
          <div className="flex items-center gap-2 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Please try again or check your connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-chisoku-navy">Amplified Prompt</label>
        <SourceIndicator source={source} hasAnswers={hasAnswers} />
      </div>
      <div className="flex-1 p-4 bg-white border border-gray-300 rounded-lg overflow-y-auto min-h-[200px] max-h-[600px] relative">
        {output && !isLoading && (
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={output} disabled={isLoading} />
          </div>
        )}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <svg className="animate-spin h-8 w-8 text-chisoku-cyan-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-gray-600 text-sm">Amplifying your prompt...</span>
          </div>
        ) : output ? (
          <div className="prose prose-sm max-w-none text-chisoku-navy pr-20">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 italic">Your amplified prompt will appear here...</p>
            <p className="text-gray-400 text-xs mt-2">Enter a prompt and click "Amplify" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

