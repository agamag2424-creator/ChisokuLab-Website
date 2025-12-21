export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is this another AI tools course?',
    answer: 'No. We don\'t teach you how to use ChatGPT or build prompts. We teach decision-making frameworks that help you determine which AI tools to use, when to use them, and why. Think of it this way: we\'re not teaching you how to drive individual cars—we\'re teaching you how to navigate any road, regardless of what vehicle you\'re in. The frameworks work whether you\'re using today\'s AI tools or whatever replaces them in five years.',
  },
  {
    id: 'faq-2',
    question: 'I don\'t have time for philosophy. Is this practical?',
    answer: 'Extremely practical. Every lesson includes specific workplace scenarios: delegating to AI, managing team concerns about automation, making budget decisions under pressure, and handling ethical gray areas. You won\'t study ancient texts—you\'ll apply frameworks to real situations you face this week. Each module includes implementation worksheets that take 15-30 minutes to complete. If it doesn\'t help you make better decisions on Monday morning, it doesn\'t belong in the course.',
  },
  {
    id: 'faq-3',
    question: 'How is this different from executive coaching or MBA programs?',
    answer: 'MBA programs teach you what to do in specific scenarios. Executive coaching helps you reflect on your approach. We teach you how to think when facing decisions you\'ve never encountered before. The frameworks we teach have guided leaders through technological disruptions for 3,000 years—from ancient trade route decisions to modern AI implementation. They\'re not tied to any specific industry, company structure, or technology stack. That\'s why they still work.',
  },
  {
    id: 'faq-4',
    question: 'Will this help me keep my job as AI advances?',
    answer: 'Here\'s the truth: AI won\'t replace you—indecision will. The managers who thrive aren\'t the ones who know every AI tool. They\'re the ones who can make clear, confident decisions about which tools to adopt, how to integrate them ethically, and when to trust human judgment over algorithms. This course teaches you to become that manager. The frameworks work regardless of what AI can or can\'t do next year.',
  },
  {
    id: 'faq-5',
    question: 'Do I need to know anything about Hindu philosophy to take this course?',
    answer: 'No. You don\'t need any background in philosophy, religion, or Eastern wisdom traditions. We teach decision-making frameworks that happen to have their roots in ancient systems. You\'ll learn why they work and how to apply them—the historical context is interesting, but it\'s not required knowledge. Think of it like using aspirin: you don\'t need to know it came from willow bark to benefit from it. But understanding the origins can deepen your trust in its effectiveness.',
  },
  {
    id: 'faq-6',
    question: 'How long does the course take?',
    answer: 'The core course is designed to be completed in 6-8 weeks with 2-3 hours of work per week. But it\'s self-paced—you can go faster or slower based on your schedule. Each module is structured as: 20-30 minute video lesson, 15-30 minute practical worksheet, and optional deep-dive readings if you want more context. Most people see improvements in their decision-making within the first two modules. The remaining modules deepen and refine your approach.',
  },
  {
    id: 'faq-7',
    question: 'Is there a money-back guarantee?',
    answer: 'Yes. If you complete the first two modules and don\'t feel the frameworks are helping you make clearer decisions, email us within 30 days for a full refund. We\'re confident in these frameworks because they\'ve worked for millennia. But we also know they\'re not for everyone. If you give it an honest try and it\'s not clicking, we\'ll refund you—no hard feelings.',
  },
  {
    id: 'faq-8',
    question: 'Can I expense this through my company?',
    answer: 'Many managers successfully expense this as professional development under \'Leadership Training\' or \'Decision-Making Skills.\' We provide: official invoice/receipt for expense reporting, course completion certificate, and detailed course outline showing business-relevant competencies. We can also work directly with your L&D team if they need more information about the course structure and learning outcomes. Email us at contact@chisokulab.com for enterprise inquiries.',
  },
];

/**
 * Get all FAQ items
 */
export function getAllFAQItems(): FAQItem[] {
  return faqData;
}
