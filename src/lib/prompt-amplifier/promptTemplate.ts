/**
 * Prompt Template Module
 * Template-based prompt generation as fallback
 */

export interface PromptFramework {
  context: string;
  objective: string;
  constraints: string;
  requirements: string;
  outputFormat: string;
  examples: string;
  assumptions: string;
  edgeCases: string;
  successCriteria: string;
  constraintsAndLimitations: string;
  additionalContext: string;
  nextSteps: string;
}

export function extractKeywords(input: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'can', 'i', 'me', 'my',
    'we', 'our', 'you', 'your', 'it', 'its', 'this', 'that', 'these'
  ]);
  
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

export function generateTemplateFramework(
  input: string, 
  clarifyingAnswers?: string[]
): PromptFramework {
  const keywords = extractKeywords(input);
  const hasApp = keywords.some(k => ['app', 'application', 'website', 'platform'].includes(k));
  const hasBusiness = keywords.some(k => ['business', 'startup', 'company', 'idea'].includes(k));
  
  // Incorporate clarifying answers into additional context
  const answersContext = clarifyingAnswers && clarifyingAnswers.length > 0
    ? ` Additional context provided: ${clarifyingAnswers.join('. ')}.`
    : '';
  
  return {
    context: `I need assistance with the following request: "${input}".${answersContext} This involves understanding the core requirements and developing a comprehensive solution.`,
    objective: `The primary goal is to ${input.toLowerCase()}. This should result in a clear, actionable outcome that addresses all aspects of the request.`,
    constraints: hasApp 
      ? 'Consider technical constraints such as performance, scalability, security, and user experience requirements.'
      : 'Consider practical constraints including time, resources, and feasibility.',
    requirements: 'The solution should be comprehensive, well-structured, and actionable. Include specific details and clear steps.',
    outputFormat: 'Provide a detailed response with clear explanations and practical recommendations.',
    examples: hasBusiness
      ? 'Consider successful examples in the market and industry best practices.'
      : 'Include relevant examples or use cases where applicable.',
    assumptions: 'Assume standard conditions unless otherwise specified. Clarify any assumptions made.',
    edgeCases: 'Consider edge cases and potential challenges that may arise.',
    successCriteria: 'Success is measured by the completeness and actionability of the solution.',
    constraintsAndLimitations: 'Note any limitations or trade-offs in the proposed approach.',
    additionalContext: keywords.length > 0 
      ? `Key topics to address: ${keywords.slice(0, 5).join(', ')}.`
      : 'Consider all relevant aspects of the request.',
    nextSteps: 'Outline clear next steps for implementation or further development.'
  };
}

export function frameworkToMarkdown(framework: PromptFramework): string {
  const sections = [
    framework.context,
    framework.objective,
    framework.requirements,
    framework.constraints,
    framework.outputFormat,
    framework.examples,
    framework.assumptions,
    framework.edgeCases,
    framework.successCriteria,
    framework.constraintsAndLimitations,
    framework.additionalContext,
    framework.nextSteps
  ].filter(section => section && section.trim().length > 0);

  let prompt = sections[0] || '';
  for (let i = 1; i < sections.length; i++) {
    const prevSection = sections[i - 1];
    const currentSection = sections[i];
    if (!prevSection.endsWith('.') && !prevSection.endsWith('!') && !prevSection.endsWith('?')) {
      prompt += '.';
    }
    prompt += ' ' + currentSection;
  }
  if (!prompt.endsWith('.') && !prompt.endsWith('!') && !prompt.endsWith('?')) {
    prompt += '.';
  }
  return prompt.trim();
}

