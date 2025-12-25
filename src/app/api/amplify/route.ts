import { NextRequest, NextResponse } from 'next/server';
import { amplifyPrompt } from '@/lib/prompt-amplifier/promptAmplifier';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, clarifyingAnswers } = body;

    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Debug: Log environment variable availability in API route
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const groqKey = process.env.GROQ_API_KEY || '';
    
    console.log('=== API ROUTE DEBUG START ===');
    console.log('API Route - Environment check:', {
      hasGemini: !!geminiKey,
      hasGroq: !!groqKey,
      geminiLength: geminiKey.length,
      groqLength: groqKey.length,
      geminiPrefix: geminiKey.substring(0, 5) || 'empty',
      groqPrefix: groqKey.substring(0, 5) || 'empty',
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('GROQ'))
    });
    console.log('=== API ROUTE DEBUG END ===');

    const result = await amplifyPrompt(input, clarifyingAnswers);

    console.log('API Route - Amplification result:', {
      source: result.source,
      outputLength: result.output.length
    });

    return NextResponse.json({
      output: result.output,
      source: result.source
    });
  } catch (error) {
    console.error('Amplification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

