'use client';

interface SourceIndicatorProps {
  source: 'gemini' | 'groq' | 'template' | null;
  hasAnswers: boolean;
}

export default function SourceIndicator({ source, hasAnswers }: SourceIndicatorProps) {
  if (!source) return null;

  const getSourceLabel = () => {
    switch (source) {
      case 'gemini':
        return '✨ Gemini AI';
      case 'groq':
        return '✨ Groq AI';
      case 'template':
        return '📝 Template Based';
      default:
        return '';
    }
  };

  const getSourceStyles = () => {
    switch (source) {
      case 'gemini':
        return 'bg-chisoku-cyan-50 text-chisoku-cyan-600 border border-chisoku-cyan-200';
      case 'groq':
        return 'bg-purple-50 text-purple-600 border border-purple-200';
      case 'template':
        return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {/* Generation Source */}
      <span 
        className={`px-2 py-1 rounded ${getSourceStyles()}`}
      >
        {getSourceLabel()}
      </span>
      
      {/* Context Indicator */}
      {hasAnswers && (
        <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200">
          📋 With your context
        </span>
      )}
    </div>
  );
}

