'use client';

import { AmplificationSource } from '@/lib/prompt-amplifier/promptAmplifier';

interface SourceIndicatorProps {
  source: AmplificationSource | null;
  hasAnswers: boolean;
}

export default function SourceIndicator({ source, hasAnswers }: SourceIndicatorProps) {
  if (!source) return null;

  const getSourceStyle = () => {
    switch (source) {
      case 'gemini':
        return 'bg-chisoku-cyan-50 text-chisoku-cyan-700 border border-chisoku-cyan-200';
      case 'groq':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'template':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getSourceLabel = () => {
    switch (source) {
      case 'gemini':
        return 'Gemini AI';
      case 'groq':
        return 'Groq AI';
      case 'template':
        return 'Template';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {/* Generation Source */}
      <span className={`px-2 py-1 rounded-lg font-medium ${getSourceStyle()}`}>
        {source === 'template' ? '📝' : '✨'} {getSourceLabel()}
      </span>
      
      {/* Context Indicator */}
      {hasAnswers && (
        <span className="px-2 py-1 rounded-lg bg-chisoku-navy/5 text-chisoku-navy border border-chisoku-navy/10 font-medium">
          📋 With context
        </span>
      )}
    </div>
  );
}
