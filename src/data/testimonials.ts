export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string; // URL or path to avatar image
  rating: number; // 1-5 stars
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "This course transformed how I approach AI tools. I went from being overwhelmed by options to confidently choosing the right tools for my team. The combination of practical AI training with decision science principles is exactly what managers need.",
    author: "Priya Sharma",
    role: "Operations Manager",
    company: "TechCorp India",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The Hindu decision science frameworks are game-changers. I've applied the three gunas framework to every major decision since taking this course. It's helped me stay calm and make better choices even when everything feels chaotic.",
    author: "Rajesh Kumar",
    role: "Product Director",
    company: "InnovateLabs",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "As someone who was skeptical about mixing philosophy with business training, I was pleasantly surprised. The course is incredibly practical. The AI efficiency modules alone are worth the investment, but the decision science component is what makes it unique.",
    author: "Anita Desai",
    role: "VP of Strategy",
    company: "Global Solutions Inc.",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "I've taken several AI courses, but none have addressed the decision-making aspect like this one. Learning to use AI tools is one thing, but learning when and why to use them is another. This course covers both beautifully.",
    author: "Vikram Patel",
    role: "Engineering Manager",
    company: "CloudTech Solutions",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "The community support and lifetime access make this course exceptional. I've been able to revisit modules as new AI tools emerge, and the frameworks help me evaluate them systematically. Highly recommend for any leader navigating AI adoption.",
    author: "Meera Reddy",
    role: "Chief Innovation Officer",
    company: "FutureForward",
    rating: 5,
  },
];

/**
 * Get all testimonials
 */
export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

/**
 * Get testimonials by rating (minimum rating)
 */
export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return testimonials.filter((t) => t.rating >= minRating);
}

/**
 * Get average rating across all testimonials
 */
export function getAverageRating(): number {
  if (testimonials.length === 0) return 0;
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / testimonials.length) * 10) / 10; // Round to 1 decimal
}
