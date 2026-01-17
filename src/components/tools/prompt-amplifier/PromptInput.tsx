'use client';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onAmplify: () => void;
  isLoading: boolean;
}

/**
 * PromptInput Component - ChisokuLab Branded
 * Handles user input for prompt amplification with keyboard shortcuts
 */
export default function PromptInput({ value, onChange, onAmplify, isLoading }: PromptInputProps) {
  const maxLength = 2000;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !isLoading && value.trim()) {
      e.preventDefault();
      onAmplify();
    }
  };

  return (
    <div className="flex flex-col h-full" role="region" aria-label="Prompt input section">
      <label 
        htmlFor="prompt-input"
        className="text-sm font-medium text-chisoku-navy mb-2"
      >
        Your Prompt
      </label>
      <div className="relative flex-1">
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your prompt idea... (e.g., 'Help me write a business proposal')"
          maxLength={maxLength}
          disabled={isLoading}
          aria-describedby="char-count keyboard-hint"
          aria-busy={isLoading}
          className="w-full h-full min-h-[200px] p-4 bg-white border border-gray-200 rounded-xl 
                     text-chisoku-navy placeholder-gray-400 resize-none
                     focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-sm"
        />
        <div 
          id="char-count"
          className="absolute bottom-2 right-2 text-xs text-gray-400"
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </div>
      </div>
      <button
        onClick={onAmplify}
        disabled={isLoading || !value.trim()}
        aria-busy={isLoading}
        className="mt-4 w-full py-3 px-4 bg-chisoku-cyan-500 hover:bg-chisoku-cyan-600 disabled:bg-gray-300
                   text-white font-medium rounded-xl transition-colors
                   disabled:cursor-not-allowed flex items-center justify-center gap-2
                   shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Amplifying...</span>
          </>
        ) : (
          'Amplify Prompt'
        )}
      </button>
      <p id="keyboard-hint" className="mt-2 text-xs text-gray-500 text-center">
        Press Cmd+Enter or Ctrl+Enter to amplify
      </p>
    </div>
  );
}
