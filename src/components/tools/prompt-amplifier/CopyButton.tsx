'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

/**
 * CopyButton Component - ChisokuLab Branded
 * Copies text to clipboard with visual feedback
 */
export default function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
      aria-live="polite"
      className="px-4 py-2 bg-chisoku-cyan-500 hover:bg-chisoku-cyan-600 disabled:bg-gray-200
                 text-white text-sm font-medium rounded-xl transition-colors
                 disabled:cursor-not-allowed disabled:text-gray-400
                 flex items-center gap-2 shadow-sm"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
