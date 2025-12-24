'use client';

import Button from '@/components/ui/Button';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onAmplify: () => void;
  isLoading: boolean;
}

/**
 * PromptInput Component
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
          placeholder="Enter your prompt idea... (e.g., 'Build me a business idea')"
          maxLength={maxLength}
          disabled={isLoading}
          aria-describedby="char-count keyboard-hint"
          aria-busy={isLoading}
          className="w-full h-full min-h-[200px] p-4 bg-white border border-gray-300 rounded-lg 
                     text-chisoku-navy placeholder-gray-400 resize-none
                     focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        />
        <div 
          id="char-count"
          className="absolute bottom-2 right-2 text-xs text-gray-500"
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={onAmplify}
          disabled={isLoading || !value.trim()}
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Amplifying...' : 'Amplify Prompt'}
        </Button>
      </div>
      <p id="keyboard-hint" className="mt-2 text-xs text-gray-500 text-center">
        Press ⌘+Enter or Ctrl+Enter to amplify
      </p>
    </div>
  );
}

