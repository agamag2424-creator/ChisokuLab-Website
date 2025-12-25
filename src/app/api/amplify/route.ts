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
    // Read at runtime (critical for Vercel serverless functions)
    // EXACT VARIABLE NAME: process.env.GROQ_API_KEY (case-sensitive, all caps)
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    const groqKey = (process.env.GROQ_API_KEY || '').trim();
    
    console.log('=== API ROUTE DEBUG START ===');
    console.log('🔍 Environment Variable Access in API Route:');
    console.log('  - Accessing: process.env.GROQ_API_KEY (exact name, case-sensitive)');
    console.log('  - Accessing: process.env.GEMINI_API_KEY (exact name, case-sensitive)');
    console.log('  - Raw process.env.GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
    console.log('  - Raw process.env.GROQ_API_KEY type:', typeof process.env.GROQ_API_KEY);
    
    // List ALL environment variables that might be related (case-insensitive search)
    const allEnvKeys = Object.keys(process.env);
    const groqRelatedKeys = allEnvKeys.filter(k => k.toUpperCase().includes('GROQ'));
    const geminiRelatedKeys = allEnvKeys.filter(k => k.toUpperCase().includes('GEMINI'));
    
    console.log('🔍 All environment variables containing "GROQ":', groqRelatedKeys);
    console.log('🔍 All environment variables containing "GEMINI":', geminiRelatedKeys);
    
    console.log('API Route - Environment check:', {
      hasGemini: !!geminiKey,
      hasGroq: !!groqKey,
      geminiLength: geminiKey.length,
      groqLength: groqKey.length,
      geminiPrefix: geminiKey.substring(0, 5) || 'empty',
      groqPrefix: groqKey.substring(0, 5) || 'empty',
      groqSuffix: groqKey.length > 3 ? groqKey.substring(groqKey.length - 3) : 'empty',
      geminiValid: geminiKey.length > 10 && !geminiKey.includes('your_gemini'),
      groqValid: groqKey.length > 10 && !groqKey.includes('your_groq') && !groqKey.includes('placeholder'),
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('GROQ')),
      groqRelatedEnvVars: groqRelatedKeys,
      geminiRelatedEnvVars: geminiRelatedKeys,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
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

