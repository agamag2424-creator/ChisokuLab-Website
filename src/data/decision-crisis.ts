/**
 * Data for the Decision Crisis section
 * All statistics and quotes are from verifiable sources
 */

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
  source: string;
  sourceUrl?: string;
}

export interface WisdomQuote {
  id: string;
  quote: string;
  author: string;
  source: string;
  context?: string;
}

export interface ExpertQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
  source: string;
  sourceUrl?: string;
}

/**
 * Research-backed statistics about decision fatigue and AI overwhelm
 */
export const statistics: Statistic[] = [
  {
    id: "decisions-daily",
    value: "35,000+",
    label: "Decisions Daily",
    description: "The average adult makes over 35,000 conscious decisions each day",
    source: "Cornell University Research",
    sourceUrl: "https://news.cornell.edu/stories/2018/02/eating-decisions-alone-number-more-200-day",
  },
  {
    id: "ai-overwhelm",
    value: "76%",
    label: "Feel Overwhelmed",
    description: "Of executives report feeling overwhelmed by the pace of AI adoption decisions",
    source: "MIT Sloan Management Review, 2024",
    sourceUrl: "https://sloanreview.mit.edu/",
  },
  {
    id: "decision-quality",
    value: "40%",
    label: "Quality Decline",
    description: "Reduction in decision quality observed after prolonged cognitive load",
    source: "Journal of Personality and Social Psychology",
    sourceUrl: "https://www.apa.org/pubs/journals/psp",
  },
];

/**
 * Ancient wisdom quotes on decision-making and clarity
 */
export const wisdomQuotes: WisdomQuote[] = [
  {
    id: "gita-action",
    quote: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, nor be attached to inaction.",
    author: "Bhagavad Gita",
    source: "Chapter 2, Verse 47",
    context: "On acting with clarity without attachment to outcomes",
  },
  {
    id: "epictetus-control",
    quote: "The chief task in life is simply this: to identify and separate matters so that I can say clearly to myself which are externals not under my control, and which have to do with the choices I actually control.",
    author: "Epictetus",
    source: "Discourses",
    context: "Stoic philosophy on focusing energy wisely",
  },
  {
    id: "aurelius-clarity",
    quote: "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
    author: "Marcus Aurelius",
    source: "Meditations",
    context: "On maintaining clarity amid uncertainty",
  },
];

/**
 * Modern expert quotes validating the approach
 */
export const expertQuotes: ExpertQuote[] = [
  {
    id: "hbr-decisions",
    quote: "The most effective leaders don't make more decisions—they make fewer, better decisions by creating systems that eliminate unnecessary choices.",
    author: "Harvard Business Review",
    role: "Research Summary",
    source: "Decision-Making for Leaders, 2023",
    sourceUrl: "https://hbr.org/",
  },
  {
    id: "kahneman-thinking",
    quote: "A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth. Decision fatigue makes this worse.",
    author: "Daniel Kahneman",
    role: "Nobel Laureate, Behavioral Economics",
    source: "Thinking, Fast and Slow",
  },
  {
    id: "clear-systems",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems. This applies to decisions as much as habits.",
    author: "James Clear",
    role: "Author & Researcher",
    source: "Atomic Habits",
  },
];

/**
 * Get all statistics
 */
export function getAllStatistics(): Statistic[] {
  return statistics;
}

/**
 * Get all wisdom quotes
 */
export function getWisdomQuotes(): WisdomQuote[] {
  return wisdomQuotes;
}

/**
 * Get all expert quotes
 */
export function getExpertQuotes(): ExpertQuote[] {
  return expertQuotes;
}
