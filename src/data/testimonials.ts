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
      "The decision frameworks completely changed how I approach AI adoption. I went from being overwhelmed by options to confidently choosing the right tools for my team. The combination of practical AI guidance with decision science principles is exactly what managers need.",
    author: "Priya Sharma",
    role: "Operations Manager",
    company: "TechCorp India",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The Hindu decision science frameworks are game-changers. Applying the three gunas framework to major decisions has helped me stay calm and make better choices even when everything feels chaotic. These ancient principles are surprisingly relevant to modern AI challenges.",
    author: "Rajesh Kumar",
    role: "Product Director",
    company: "InnovateLabs",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "As someone who was skeptical about mixing philosophy with business strategy, I was pleasantly surprised. The AI efficiency frameworks alone are valuable, but the decision science component is what makes this approach unique. It addresses the 'why' behind AI adoption, not just the 'how'.",
    author: "Anita Desai",
    role: "VP of Strategy",
    company: "Global Solutions Inc.",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Most AI training focuses on tools and techniques. This approach addresses the decision-making aspect that's often overlooked. Learning to use AI tools is one thing, but learning when and why to use them is what separates effective leaders from overwhelmed managers.",
    author: "Vikram Patel",
    role: "Engineering Manager",
    company: "CloudTech Solutions",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "These frameworks provide a systematic way to evaluate new AI tools as they emerge. Instead of chasing every new technology, I now have a clear methodology for deciding what fits our organization. Highly recommend for any leader navigating AI adoption.",
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
