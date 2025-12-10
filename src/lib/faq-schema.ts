import { getAllBlogPosts } from "./mdx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chisokulab.com";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQ[];
}

/**
 * Generate FAQPage JSON-LD schema for SEO
 */
export function generateFAQSchema(faqs: FAQCategory[]): object {
  const mainEntity = faqs.flatMap((category) =>
    category.questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainEntity,
  };
}

