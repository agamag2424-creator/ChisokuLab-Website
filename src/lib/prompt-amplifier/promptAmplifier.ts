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
  const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
  
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
  // Read API key at runtime (critical for Vercel serverless functions)
  const GROQ_API_KEY = (process.env.GROQ_API_KEY || '').trim();
  
  console.log('🔍 Groq API Key Check:', {
    exists: !!GROQ_API_KEY,
    length: GROQ_API_KEY.length,
    prefix: GROQ_API_KEY.substring(0, 5) || 'empty',
    isValid: GROQ_API_KEY.length > 10 && !GROQ_API_KEY.includes('your_groq')
  });
  
  if (!GROQ_API_KEY || GROQ_API_KEY.length < 10) {
    const errorMsg = `Groq API key not configured or invalid. Length: ${GROQ_API_KEY.length}`;
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  if (GROQ_API_KEY === 'your_groq_api_key_here' || GROQ_API_KEY.includes('placeholder')) {
    const errorMsg = 'Groq API key appears to be a placeholder';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  console.log('🚀 Calling Groq API...', {
    model: 'llama-3.3-70b-versatile',
    promptLength: prompt.length
  });

  try {
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
      console.error('❌ Groq API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText.substring(0, 200)
      });
      throw new Error(`Groq API request failed: ${response.status} ${errorText.substring(0, 200)}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      const choice = data.choices[0];
      if (choice.message && choice.message.content) {
        const content = choice.message.content;
        console.log('✅ Groq API Success:', {
          contentLength: content.length,
          firstChars: content.substring(0, 50)
        });
        return content;
      }
    }

    console.error('❌ Unexpected Groq API response format:', JSON.stringify(data).substring(0, 200));
    throw new Error('Unexpected Groq API response format');
  } catch (error) {
    if (error instanceof Error && error.message.includes('Groq API')) {
      throw error; // Re-throw our formatted errors
    }
    console.error('❌ Groq API Network/Unknown Error:', error);
    throw new Error(`Groq API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
  // Trim whitespace in case keys were copied with extra spaces
  // EXACT VARIABLE NAME: process.env.GROQ_API_KEY (case-sensitive, all caps)
  const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
  const GROQ_API_KEY = (process.env.GROQ_API_KEY || '').trim();

  // Debug logging (remove in production if needed)
  console.log('=== AMPLIFY PROMPT DEBUG START ===');
  console.log('🔍 Environment Variable Access:');
  console.log('  - Accessing: process.env.GROQ_API_KEY (exact name, case-sensitive)');
  console.log('  - Accessing: process.env.GEMINI_API_KEY (exact name, case-sensitive)');
  console.log('  - Raw process.env.GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('  - Raw process.env.GROQ_API_KEY type:', typeof process.env.GROQ_API_KEY);
  console.log('  - Raw process.env.GROQ_API_KEY value:', process.env.GROQ_API_KEY ? `${process.env.GROQ_API_KEY.substring(0, 5)}...` : 'undefined/null');
  
  // List ALL environment variables that might be related (case-insensitive search)
  const allEnvKeys = Object.keys(process.env);
  const groqRelatedKeys = allEnvKeys.filter(k => k.toUpperCase().includes('GROQ'));
  const geminiRelatedKeys = allEnvKeys.filter(k => k.toUpperCase().includes('GEMINI'));
  
  console.log('🔍 All environment variables containing "GROQ":', groqRelatedKeys);
  console.log('🔍 All environment variables containing "GEMINI":', geminiRelatedKeys);
  console.log('🔍 Total environment variables:', allEnvKeys.length);
  
  console.log('API Keys check:', {
    hasGemini: !!GEMINI_API_KEY,
    hasGroq: !!GROQ_API_KEY,
    geminiLength: GEMINI_API_KEY?.length || 0,
    groqLength: GROQ_API_KEY?.length || 0,
    geminiPrefix: GEMINI_API_KEY?.substring(0, 5) || 'empty',
    groqPrefix: GROQ_API_KEY?.substring(0, 5) || 'empty',
    groqRelatedEnvVars: groqRelatedKeys,
    geminiRelatedEnvVars: geminiRelatedKeys
  });
  console.log('=== AMPLIFY PROMPT DEBUG END ===');

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
  const isGroqKeyValid = GROQ_API_KEY && 
                         GROQ_API_KEY !== 'your_groq_api_key_here' && 
                         !GROQ_API_KEY.includes('placeholder') &&
                         GROQ_API_KEY.length > 10;
  
  // Detailed logging before Groq API call
  console.log('=== GROQ API PRE-CALL DIAGNOSTICS ===');
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY?.substring(0, 4) || 'N/A');
  console.log('GROQ_API_KEY (trimmed) exists:', !!GROQ_API_KEY);
  console.log('GROQ_API_KEY (trimmed) length:', GROQ_API_KEY?.length || 0);
  console.log('GROQ_API_KEY (trimmed) starts with:', GROQ_API_KEY?.substring(0, 4) || 'N/A');
  console.log('isGroqKeyValid:', isGroqKeyValid);
  console.log('Validation details:', {
    hasKey: !!GROQ_API_KEY,
    notPlaceholder: GROQ_API_KEY !== 'your_groq_api_key_here',
    noPlaceholderText: !GROQ_API_KEY?.includes('placeholder'),
    lengthValid: GROQ_API_KEY?.length > 10,
    allChecksPass: isGroqKeyValid
  });
  console.log('=== END GROQ PRE-CALL DIAGNOSTICS ===');
  
  if (isGroqKeyValid) {
    try {
      console.log('🔄 Attempting Groq API amplification...', {
        keyLength: GROQ_API_KEY.length,
        keyPrefix: GROQ_API_KEY.substring(0, 5),
        keySuffix: GROQ_API_KEY.substring(GROQ_API_KEY.length - 3)
      });
      const amplificationPrompt = getAmplificationPrompt(userInput, clarifyingAnswers);
      
      // Wrap the actual API call with detailed error logging
      let apiResponse: string;
      try {
        console.log('📞 About to call callGroqAPI()...');
        apiResponse = await callGroqAPI(amplificationPrompt);
        console.log('✅ callGroqAPI() returned successfully, length:', apiResponse?.length || 0);
      } catch (error) {
        console.error('❌ Groq API Error in callGroqAPI():', error);
        console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        throw error; // Don't silently fall back - re-throw to be caught by outer catch
      }
      
      const cleanedResponse = cleanApiResponse(apiResponse);
      
      if (cleanedResponse && cleanedResponse.length > 100) {
        console.log('✅ Groq API amplification successful!', {
          length: cleanedResponse.length,
          source: 'groq'
        });
        return { output: cleanedResponse, source: 'groq' };
      } else {
        console.warn('⚠️ Groq API response too short or empty:', {
          length: cleanedResponse?.length || 0,
          response: cleanedResponse?.substring(0, 100) || 'empty'
        });
        throw new Error('Groq API response too short');
      }
    } catch (error) {
      console.error('❌ Groq API amplification failed, falling back to template:', {
        error: error instanceof Error ? error.message : String(error),
        errorType: error instanceof Error ? error.constructor.name : typeof error
      });
      if (error instanceof Error) {
        console.error('Groq error stack:', error.stack?.substring(0, 300));
        console.error('Groq error name:', error.name);
        console.error('Groq error cause:', error.cause);
      }
      // Don't re-throw here - we want to fall back to template
    }
  } else {
    console.warn('⚠️ Groq API key not configured or invalid - SKIPPING GROQ API CALL:', {
      hasKey: !!GROQ_API_KEY,
      isPlaceholder: GROQ_API_KEY === 'your_groq_api_key_here',
      containsPlaceholder: GROQ_API_KEY?.includes('placeholder') || false,
      keyLength: GROQ_API_KEY?.length || 0,
      isValid: isGroqKeyValid,
      skipping: true,
      reason: !GROQ_API_KEY ? 'Key is missing/empty' :
              GROQ_API_KEY === 'your_groq_api_key_here' ? 'Key is placeholder' :
              GROQ_API_KEY.includes('placeholder') ? 'Key contains placeholder text' :
              GROQ_API_KEY.length <= 10 ? 'Key too short' :
              'Unknown validation failure'
    });
  }

  // Fallback to template (always available)
  console.log('⚠️ ============================================');
  console.log('⚠️ FALLING BACK TO TEMPLATE');
  console.log('⚠️ ============================================');
  console.log('Template fallback triggered because:');
  console.log('  - Gemini attempted:', GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' && GEMINI_API_KEY.length > 10);
  console.log('  - Groq attempted:', GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here' && GROQ_API_KEY.length > 10);
  console.log('  - Gemini key exists:', !!GEMINI_API_KEY);
  console.log('  - Groq key exists:', !!GROQ_API_KEY);
  console.log('  - Gemini key length:', GEMINI_API_KEY?.length || 0);
  console.log('  - Groq key length:', GROQ_API_KEY?.length || 0);
  console.log('  - Gemini key prefix:', GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 5)}...` : 'missing');
  console.log('  - Groq key prefix:', GROQ_API_KEY ? `${GROQ_API_KEY.substring(0, 5)}...` : 'missing');
  console.log('Final state:', {
    geminiAttempted: GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' && GEMINI_API_KEY.length > 10,
    groqAttempted: GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here' && GROQ_API_KEY.length > 10,
    geminiKey: GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 5)}...` : 'missing',
    groqKey: GROQ_API_KEY ? `${GROQ_API_KEY.substring(0, 5)}...` : 'missing',
    reason: !GEMINI_API_KEY && !GROQ_API_KEY ? 'Both keys missing' :
            !GEMINI_API_KEY && GROQ_API_KEY ? 'Gemini missing, Groq failed' :
            GEMINI_API_KEY && !GROQ_API_KEY ? 'Gemini failed, Groq missing' :
            'Both APIs failed or returned invalid responses'
  });
  console.log('⚠️ ============================================');
  
  const framework = generateTemplateFramework(userInput, clarifyingAnswers);
  const markdown = frameworkToMarkdown(framework);
  
  console.log('✅ Template fallback generated, length:', markdown.length);
  
  return { output: markdown, source: 'template' };
}

