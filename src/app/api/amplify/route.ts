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

    const result = await amplifyPrompt(input, clarifyingAnswers);

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

