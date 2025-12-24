'use client';

import { useState } from 'react';

export default function Disclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-chisoku-navy transition-colors w-full"
      >
        <svg 
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="font-medium">About this tool</span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 text-sm text-gray-600 space-y-2">
          <p>
            <strong className="text-chisoku-navy">AI-Generated Content:</strong> The amplified prompts 
            are generated using AI (Gemini or Groq when available) or rule-based templates. Results may vary and 
            should be reviewed before use.
          </p>
          <p>
            <strong className="text-chisoku-navy">No Data Storage:</strong> Your prompts are processed 
            in real-time and are not stored on our servers.
          </p>
          <p>
            <strong className="text-chisoku-navy">Best Results:</strong> For optimal results, provide 
            as much context as possible in your initial prompt or answer the clarifying questions.
          </p>
        </div>
      )}
    </div>
  );
}

