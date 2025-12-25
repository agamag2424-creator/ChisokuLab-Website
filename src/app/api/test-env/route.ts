import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // This endpoint helps debug environment variable access in Vercel
  const geminiKey = process.env.GEMINI_API_KEY || '';
  const groqKey = process.env.GROQ_API_KEY || '';
  
  // Get all environment variables (for debugging)
  const allEnvVars = Object.keys(process.env)
    .filter(key => key.includes('GEMINI') || key.includes('GROQ') || key.includes('API'))
    .reduce((acc, key) => {
      const value = process.env[key] || '';
      acc[key] = {
        exists: !!value,
        length: value.length,
        prefix: value.substring(0, 5) || 'empty',
        // Don't expose full keys for security
      };
      return acc;
    }, {} as Record<string, { exists: boolean; length: number; prefix: string }>);

  return NextResponse.json({
    success: true,
    environment: {
      gemini: {
        exists: !!geminiKey,
        length: geminiKey.length,
        prefix: geminiKey.substring(0, 5) || 'empty',
        isValid: geminiKey.length > 10 && geminiKey !== 'your_gemini_api_key_here'
      },
      groq: {
        exists: !!groqKey,
        length: groqKey.length,
        prefix: groqKey.substring(0, 5) || 'empty',
        isValid: groqKey.length > 10 && groqKey !== 'your_groq_api_key_here'
      },
      allRelatedEnvVars: allEnvVars,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    },
    message: 'Check this endpoint to verify environment variables are accessible'
  });
}

