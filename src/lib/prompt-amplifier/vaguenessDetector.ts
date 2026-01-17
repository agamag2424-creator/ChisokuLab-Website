/**
 * Vagueness Detection Module
 */

export interface VaguenessResult {
  isVague: boolean;
  reason: string | null;
  score: number;
  suggestions: string[];
}

const VAGUE_KEYWORDS = [
  'help', 'something', 'thing', 'things', 'stuff', 'maybe', 'perhaps',
  'kind of', 'sort of', 'a bit', 'somewhat', 'not sure', 'idk',
  'anything', 'whatever', 'somehow', 'someone', 'somewhere',
  'good', 'better', 'best', 'nice', 'cool', 'awesome', 'great'
];

const GENERIC_TERMS = [
  'app', 'application', 'website', 'system', 'platform', 'tool',
  'project', 'idea', 'business', 'startup', 'product', 'service',
  'solution', 'program', 'software', 'code', 'script'
];

const SPECIFIC_KEYWORDS = [
  'react', 'vue', 'angular', 'next', 'node', 'python', 'java',
  'typescript', 'javascript', 'api', 'database', 'sql', 'mongodb',
  'aws', 'docker', 'authentication', 'login', 'crud', 'rest',
  'graphql', 'frontend', 'backend', 'mobile', 'ios', 'android'
];

export function analyzeVagueness(input: string): VaguenessResult {
  const trimmed = input.trim();
  const lowerInput = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  let score = 0;
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Length checks
  if (trimmed.length < 15) {
    score += 40;
    issues.push('Input is very short');
    suggestions.push('Add more details about what you want to achieve');
  } else if (trimmed.length < 30) {
    score += 25;
    issues.push('Input is quite brief');
    suggestions.push('Consider adding context or requirements');
  }
  
  // Word count checks
  if (wordCount < 3) {
    score += 35;
    issues.push('Too few words to understand intent');
    suggestions.push('Describe your goal in more detail');
  } else if (wordCount < 5) {
    score += 20;
    issues.push('Very few words provided');
    suggestions.push('Add specific requirements or constraints');
  }
  
  // Vague keywords detection
  const foundVague = VAGUE_KEYWORDS.filter(kw => lowerInput.includes(kw));
  if (foundVague.length > 0) {
    score += Math.min(foundVague.length * 8, 25);
    if (foundVague.length >= 2) {
      issues.push('Contains vague terms');
      suggestions.push('Replace vague terms with specific requirements');
    }
  }
  
  // Generic terms detection
  const foundGeneric = GENERIC_TERMS.filter(term => 
    new RegExp('\\b' + term + '\\b', 'i').test(lowerInput)
  );
  if (foundGeneric.length > 0 && wordCount < 10) {
    score += 15;
    issues.push('Uses generic terms without details');
    suggestions.push('Specify features, technology, or audience');
  }
  
  // Specificity indicators (reduce score)
  const foundSpecific = SPECIFIC_KEYWORDS.filter(kw => lowerInput.includes(kw));
  if (foundSpecific.length > 0) {
    score -= foundSpecific.length * 12;
  }
  
  // Numbers indicate specificity
  if (/\d+/.test(trimmed)) {
    score -= 10;
  }
  
  // Normalize score 0-100
  score = Math.max(0, Math.min(100, score));
  
  const isVague = score >= 40;
  const reason = isVague && issues.length > 0 ? issues[0] : null;
  
  return {
    isVague,
    reason,
    score,
    suggestions: isVague ? suggestions.slice(0, 3) : []
  };
}

export function checkVaguenessHeuristic(input: string): boolean {
  return analyzeVagueness(input).isVague;
}

export function getVaguenessReason(input: string): string | null {
  return analyzeVagueness(input).reason;
}

export function getVaguenessSuggestions(input: string): string[] {
  return analyzeVagueness(input).suggestions;
}
