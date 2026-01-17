/**
 * Prompt Amplifier
 * Uses Gemini API (primary), Groq API (secondary), with template fallback
 */

import { generateTemplateFramework, frameworkToMarkdown } from './promptTemplate';
import { checkVaguenessHeuristic } from './vaguenessDetector';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

// Re-export vagueness functions
export { checkVaguenessHeuristic, analyzeVagueness, getVaguenessReason, getVaguenessSuggestions } from './vaguenessDetector';

export type AmplificationSource = 'gemini' | 'groq' | 'template';

function getAmplificationPrompt(userInput: string, clarifyingAnswers?: string[]): string {
  const answersText = clarifyingAnswers && clarifyingAnswers.length > 0
    ? `\n\nAdditional context from clarifying questions:\n${clarifyingAnswers.join('\n')}`
    : '';

  return `You are a prompt engineering expert. Transform the following vague or brief user input into a comprehensive, detailed, and well-structured prompt that is ready to use.

The output should be a SINGLE CONTINUOUS PROMPT (not separated into sections or headers). It should be copy-ready and flow naturally as one cohesive prompt.

Consider these aspects when amplifying (but integrate them naturally into the flow, don't list them as separate sections):
- Context and background
- Clear objectives and goals
- Specific requirements and constraints
- Expected output format
- Examples or use cases
- Edge cases to consider
- Success criteria

User Input: "${userInput}"${answersText}

Generate a single, comprehensive, continuous prompt that expands on the user's input. Make it detailed, specific, and actionable. Do NOT use headers, sections, or numbered lists. Write it as one flowing, natural prompt that can be copied and used directly.`;
}

/**
 * Call Gemini API (Primary)
 */
async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  
  throw new Error('Unexpected Gemini API response format');
}

/**
 * Call Groq API (Secondary fallback)
 */
async function callGroqAPI(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Unexpected Groq API response format');
}

function cleanApiResponse(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^(here's?|here is|here are|the following|below):?\s*/i, '');
  cleaned = cleaned.replace(/^#+\s*/gm, '');
  cleaned = cleaned.replace(/^\d+\.\s+/gm, '');
  cleaned = cleaned.replace(/^##\s*\d*\.?\s*[A-Z][^\n]*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/^\*\s+/gm, '');
  cleaned = cleaned.replace(/\n\n+/g, ' ');
  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
}

/**
 * Main amplification function
 * Fallback chain: Gemini → Groq → Template
 */
export async function amplifyPrompt(
  userInput: string,
  clarifyingAnswers?: string[]
): Promise<{ output: string; source: AmplificationSource }> {
  if (!userInput || userInput.trim().length === 0) {
    throw new Error('Input cannot be empty');
  }

  const amplificationPrompt = getAmplificationPrompt(userInput, clarifyingAnswers);

  // Try Gemini API first (primary)
  if (GEMINI_API_KEY) {
    try {
      console.log('Attempting Gemini API amplification...');
      const apiResponse = await callGeminiAPI(amplificationPrompt);
      const cleanedResponse = cleanApiResponse(apiResponse);
      
      if (cleanedResponse.length > 100) {
        console.log('Gemini API amplification successful');
        return { output: cleanedResponse, source: 'gemini' };
      }
    } catch (error) {
      console.error('Gemini API amplification failed:', error);
    }
  }

  // Try Groq API as fallback (secondary)
  if (GROQ_API_KEY) {
    try {
      console.log('Attempting Groq API amplification...');
      const apiResponse = await callGroqAPI(amplificationPrompt);
      const cleanedResponse = cleanApiResponse(apiResponse);
      
      if (cleanedResponse.length > 100) {
        console.log('Groq API amplification successful');
        return { output: cleanedResponse, source: 'groq' };
      }
    } catch (error) {
      console.error('Groq API amplification failed, falling back to template:', error);
    }
  }

  // Template fallback (always available)
  console.log('Using template-based amplification');
  const framework = generateTemplateFramework(userInput, clarifyingAnswers);
  const markdown = frameworkToMarkdown(framework);
  
  return { output: markdown, source: 'template' };
}
