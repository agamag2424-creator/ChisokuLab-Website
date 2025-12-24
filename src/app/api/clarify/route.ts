import { NextRequest, NextResponse } from 'next/server';
import { generateClarifyingQuestions } from '@/lib/prompt-amplifier/clarifyingQuestions';
import { checkVaguenessHeuristic } from '@/lib/prompt-amplifier/vaguenessDetector';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body;

    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    // Check if input is vague
    const isVague = checkVaguenessHeuristic(input);
    
    if (!isVague) {
      return NextResponse.json({
        isVague: false,
        questions: []
      });
    }

    // Generate clarifying questions
    const result = await generateClarifyingQuestions(input);

    return NextResponse.json({
      isVague: true,
      questions: result.questions,
      source: result.source
    });
  } catch (error) {
    console.error('Clarify error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}

