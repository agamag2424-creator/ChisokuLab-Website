/**
 * Prompt Amplifier
 * Uses Gemini API (primary), Groq API (secondary), with template fallback
 */

import { generateTemplateFramework, frameworkToMarkdown } from './promptTemplate';
import { checkVaguenessHeuristic } from './vaguenessDetector';

// Re-export vagueness functions
export { checkVaguenessHeuristic, analyzeVagueness, getVaguenessReason, getVaguenessSuggestions } from './vaguenessDetector';

function getAmplificationPrompt(userInput: string, clarifyingAnswers?: string[]): string {
  const answersText = clarifyingAnswers && clarifyingAnswers.length > 0
    ? `\n\nAdditional context from clarifying questions:\n${clarifyingAnswers.join('\n')}`
    : '';

  const instruction = `You are a prompt engineering expert. Transform the following vague or brief user input into a comprehensive, detailed, and well-structured prompt that is ready to use.

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

  return instruction;
}

async function callGeminiAPI(prompt: string): Promise<string> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
  
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
        topP: 0.9,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Gemini API request failed: ${response.status}`;
    
    // Handle quota exceeded errors specifically
    if (response.status === 429) {
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = `Gemini API quota exceeded: ${errorData.error.message}`;
        }
      } catch (e) {
        errorMessage = `Gemini API quota exceeded. Please check your quota limits or wait before retrying.`;
      }
    } else {
      errorMessage = `${errorMessage} ${errorText}`;
    }
    
    throw new Error(errorMessage);
  }

  const data = await response.json();
  
  if (data.candidates && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      return candidate.content.parts[0].text || '';
    }
  }

  throw new Error('Unexpected Gemini API response format');
}

async function callGroqAPI(prompt: string): Promise<string> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
  
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
        {
          role: 'user',
          content: prompt
        }
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
  
  if (data.choices && data.choices.length > 0) {
    const choice = data.choices[0];
    if (choice.message && choice.message.content) {
      return choice.message.content;
    }
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

export async function amplifyPrompt(
  userInput: string,
  clarifyingAnswers?: string[]
): Promise<{ output: string; source: 'gemini' | 'groq' | 'template' }> {
  if (!userInput || userInput.trim().length === 0) {
    throw new Error('Input cannot be empty');
  }

  // Read API keys at runtime (required for Vercel serverless functions)
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
  const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

  // Debug logging (remove in production if needed)
  console.log('API Keys check:', {
    hasGemini: !!GEMINI_API_KEY,
    hasGroq: !!GROQ_API_KEY,
    geminiLength: GEMINI_API_KEY?.length || 0,
    groqLength: GROQ_API_KEY?.length || 0
  });

  // Try Gemini API first (primary)
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' && GEMINI_API_KEY.length > 10) {
    try {
      console.log('Attempting Gemini API amplification...', {
        keyLength: GEMINI_API_KEY.length,
        keyPrefix: GEMINI_API_KEY.substring(0, 5)
      });
      const amplificationPrompt = getAmplificationPrompt(userInput, clarifyingAnswers);
      const apiResponse = await callGeminiAPI(amplificationPrompt);
      const cleanedResponse = cleanApiResponse(apiResponse);
      
      if (cleanedResponse && cleanedResponse.length > 100) {
        console.log('✅ Gemini API amplification successful, length:', cleanedResponse.length);
        return { output: cleanedResponse, source: 'gemini' };
      } else {
        console.warn('⚠️ Gemini API response too short or empty:', cleanedResponse?.length || 0);
      }
    } catch (error) {
      // Log the full error for debugging
      if (error instanceof Error) {
        if (error.message.includes('quota exceeded') || error.message.includes('429')) {
          console.warn('⚠️ Gemini API quota exceeded, falling back to Groq:', error.message);
        } else {
          console.error('❌ Gemini API amplification failed, trying Groq:', error.message);
          console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        }
      } else {
        console.error('❌ Gemini API amplification failed, trying Groq:', error);
      }
    }
  } else {
    console.warn('⚠️ Gemini API key not configured or invalid:', {
      hasKey: !!GEMINI_API_KEY,
      isPlaceholder: GEMINI_API_KEY === 'your_gemini_api_key_here',
      keyLength: GEMINI_API_KEY?.length || 0,
      skipping: true
    });
  }

  // Try Groq API as fallback (secondary)
  if (GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here' && GROQ_API_KEY.length > 10) {
    try {
      console.log('Attempting Groq API amplification...', {
        keyLength: GROQ_API_KEY.length,
        keyPrefix: GROQ_API_KEY.substring(0, 5)
      });
      const amplificationPrompt = getAmplificationPrompt(userInput, clarifyingAnswers);
      const apiResponse = await callGroqAPI(amplificationPrompt);
      const cleanedResponse = cleanApiResponse(apiResponse);
      
      if (cleanedResponse && cleanedResponse.length > 100) {
        console.log('✅ Groq API amplification successful, length:', cleanedResponse.length);
        return { output: cleanedResponse, source: 'groq' };
      } else {
        console.warn('⚠️ Groq API response too short or empty:', cleanedResponse?.length || 0);
      }
    } catch (error) {
      console.error('❌ Groq API amplification failed, falling back to template:', error);
      if (error instanceof Error) {
        console.error('Groq error details:', error.message);
        console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      }
    }
  } else {
    console.warn('⚠️ Groq API key not configured or invalid:', {
      hasKey: !!GROQ_API_KEY,
      isPlaceholder: GROQ_API_KEY === 'your_groq_api_key_here',
      keyLength: GROQ_API_KEY?.length || 0,
      skipping: true
    });
  }

  // Fallback to template (always available)
  console.log('Using template-based amplification');
  const framework = generateTemplateFramework(userInput, clarifyingAnswers);
  const markdown = frameworkToMarkdown(framework);
  
  return { output: markdown, source: 'template' };
}

