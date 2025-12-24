/**
 * Clarifying Questions Module
 * Generates clarifying questions for vague inputs using Gemini/Groq APIs
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

export interface ClarifyingQuestion {
  id: string;
  question: string;
  placeholder: string;
}

export interface ClarifyingQuestionsResult {
  questions: ClarifyingQuestion[];
  source: 'gemini' | 'groq' | 'template';
}

function getQuestionsPrompt(userInput: string): string {
  const instruction = `You are a helpful assistant that generates clarifying questions. Given a vague user request, generate 3-4 specific questions that would help understand what the user really wants.

User Request: "${userInput}"

Generate questions in JSON format like this:
[
  {"id": "q1", "question": "What is the main purpose?", "placeholder": "e.g., personal blog, business site"},
  {"id": "q2", "question": "Who is the target audience?", "placeholder": "e.g., developers, general public"}
]

Return ONLY valid JSON array, no other text. Generate 3-4 relevant clarifying questions.`;

  return instruction;
}

async function callGeminiAPIForQuestions(prompt: string): Promise<string> {
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
        maxOutputTokens: 500,
      }
    }),
  });

  if (!response.ok) {
    let errorMessage = `Gemini API request failed: ${response.status}`;
    
    // Handle quota exceeded errors specifically
    if (response.status === 429) {
      try {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = `Gemini API quota exceeded: ${errorData.error.message}`;
        } else {
          errorMessage = `Gemini API quota exceeded. Please check your quota limits or wait before retrying.`;
        }
      } catch (e) {
        errorMessage = `Gemini API quota exceeded. Please check your quota limits or wait before retrying.`;
      }
      throw new Error(errorMessage);
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

async function callGroqAPIForQuestions(prompt: string): Promise<string> {
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
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API request failed: ${response.status}`);
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

function parseQuestionsJSON(text: string): ClarifyingQuestion[] {
  try {
    // Find JSON array in the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON array found');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(parsed)) {
      throw new Error('Parsed result is not an array');
    }
    
    return parsed.map((q, i) => ({
      id: q.id || `q${i + 1}`,
      question: q.question || '',
      placeholder: q.placeholder || 'Enter your answer...'
    })).filter(q => q.question.length > 0);
  } catch (error) {
    console.error('Failed to parse questions JSON:', error);
    return [];
  }
}

function generateTemplateQuestions(userInput: string): ClarifyingQuestion[] {
  const lowerInput = userInput.toLowerCase();
  const questions: ClarifyingQuestion[] = [];
  
  // Always ask about the main goal
  questions.push({
    id: 'q1',
    question: 'What is the main goal or purpose of this project?',
    placeholder: 'e.g., increase sales, automate tasks, share information'
  });
  
  // Context-specific questions based on keywords
  if (lowerInput.includes('app') || lowerInput.includes('website') || lowerInput.includes('platform')) {
    questions.push({
      id: 'q2',
      question: 'Who is the target audience for this?',
      placeholder: 'e.g., businesses, students, general consumers'
    });
    questions.push({
      id: 'q3',
      question: 'What are the 2-3 most important features you need?',
      placeholder: 'e.g., user login, payment processing, search functionality'
    });
  } else if (lowerInput.includes('business') || lowerInput.includes('idea') || lowerInput.includes('startup')) {
    questions.push({
      id: 'q2',
      question: 'What industry or market are you targeting?',
      placeholder: 'e.g., healthcare, e-commerce, education'
    });
    questions.push({
      id: 'q3',
      question: 'What problem does this solve for customers?',
      placeholder: 'e.g., saves time, reduces costs, improves experience'
    });
  } else {
    questions.push({
      id: 'q2',
      question: 'What specific outcome are you looking for?',
      placeholder: 'e.g., a working prototype, a detailed plan, code examples'
    });
    questions.push({
      id: 'q3',
      question: 'Are there any constraints or requirements to consider?',
      placeholder: 'e.g., budget limits, timeline, technology preferences'
    });
  }
  
  // Always ask about success criteria
  questions.push({
    id: 'q4',
    question: 'How will you measure success?',
    placeholder: 'e.g., user engagement, revenue, efficiency gains'
  });
  
  return questions;
}

/**
 * Main function to generate clarifying questions
 * Tries Gemini API first, then Groq API, falls back to template-based generation
 */
export async function generateClarifyingQuestions(
  userInput: string
): Promise<ClarifyingQuestionsResult> {
  if (!userInput || userInput.trim().length === 0) {
    return { questions: [], source: 'template' };
  }

  // Try Gemini API first
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    try {
      console.log('Generating clarifying questions via Gemini API...');
      const prompt = getQuestionsPrompt(userInput);
      const response = await callGeminiAPIForQuestions(prompt);
      const questions = parseQuestionsJSON(response);
      
      if (questions.length >= 2) {
        console.log('Gemini API questions generated:', questions.length);
        return { questions, source: 'gemini' };
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('quota exceeded') || error.message.includes('429')) {
          console.warn('Gemini API quota exceeded for questions, falling back to Groq:', error.message);
        } else {
          console.error('Gemini API question generation failed, trying Groq:', error.message);
        }
      } else {
        console.error('Gemini API question generation failed, trying Groq:', error);
      }
    }
  } else {
    console.log('Gemini API key not configured or still placeholder, skipping Gemini');
  }

  // Try Groq API as fallback
  if (GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here') {
    try {
      console.log('Generating clarifying questions via Groq API...');
      const prompt = getQuestionsPrompt(userInput);
      const response = await callGroqAPIForQuestions(prompt);
      const questions = parseQuestionsJSON(response);
      
      if (questions.length >= 2) {
        console.log('Groq API questions generated:', questions.length);
        return { questions, source: 'groq' };
      }
    } catch (error) {
      console.error('Groq API question generation failed:', error);
      if (error instanceof Error) {
        console.error('Groq error details:', error.message);
      }
    }
  } else {
    console.log('Groq API key not configured or still placeholder, skipping Groq');
  }

  // Fallback to template
  console.log('Using template questions');
  const questions = generateTemplateQuestions(userInput);
  return { questions, source: 'template' };
}

