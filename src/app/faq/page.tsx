"use client";

import { useState } from "react";
import Script from "next/script";
import FAQHero from "@/components/sections/faq/FAQHero";
import FAQList from "@/components/sections/faq/FAQList";
import { generateFAQSchema } from "@/lib/faq-schema";

const faqs = [
  {
    category: "Course",
    questions: [
      {
        question: "What's included in the course?",
        answer:
          "The course includes 7 comprehensive modules covering AI efficiency and Hindu decision science, ~4 hours of video content, all templates and frameworks, private community access (launching with course), lifetime course access, monthly live Q&A sessions (starting at launch), and a certificate of completion.",
      },
      {
        question: "How long does it take to complete the course?",
        answer:
          "The course is self-paced, but we recommend completing it over 12 weeks (one module per week). Most students spend 2-3 hours per week on course content and exercises.",
      },
      {
        question: "Do I need prior experience with AI tools?",
        answer:
          "No prior experience is required. The course is designed for managers and leaders who want to learn how to use AI tools effectively, regardless of their technical background.",
      },
      {
        question: "Is there a money-back guarantee?",
        answer:
          "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course, contact us within 30 days for a full refund.",
      },
      {
        question: "Can I access the course on mobile?",
        answer:
          "Yes, the course platform is fully responsive and works on desktop, tablet, and mobile devices. You can learn on the go.",
      },
    ],
  },
  {
    category: "Consulting",
    questions: [
      {
        question: "When do consulting services launch?",
        answer:
          "Our Enterprise AI Deployment Advisory services are launching in Q4 2026. Join the waitlist to get early access and a free consultation when we launch.",
      },
      {
        question: "What types of organizations do you work with?",
        answer:
          "We work with enterprise leaders, IT and operations teams, innovation managers, and growing companies that are ready to deploy AI strategically. Our services are designed for organizations that want to avoid the trial-and-error tax.",
      },
      {
        question: "How long does a typical consulting engagement take?",
        answer:
          "Engagement timelines vary by service: AI Readiness Assessment (4-6 weeks), LLM Deployment Strategy (6-8 weeks), Governance Architecture (6-8 weeks), and Advisory Retainer (ongoing monthly).",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes, we work with clients globally. Most of our consulting can be done remotely, though we also offer on-site engagements for larger organizations.",
      },
    ],
  },
  {
    category: "General",
    questions: [
      {
        question: "What is Chisoku?",
        answer:
          "Chisoku is a concept from Hindu decision science that means 'calm decision-making.' It's about making decisions from a place of clarity rather than reactivity, especially when navigating uncertainty and change.",
      },
      {
        question: "How is this different from other AI training?",
        answer:
          "Most AI training focuses on tools and techniques. We combine AI efficiency training with decision science principles, helping you not just use AI tools, but make confident decisions about which tools to use, when, and why.",
      },
      {
        question: "Do I need to be familiar with Hindu philosophy?",
        answer:
          "No, you don't need any prior knowledge of Hindu philosophy. We explain the relevant concepts in practical, modern terms that apply directly to leadership and decision-making challenges.",
      },
      {
        question: "How do I get started?",
        answer:
          "You can start by exploring our free resources, reading our blog, or enrolling in the course. For enterprise consulting, join the waitlist to be notified when services launch.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQHero onSearch={setSearchQuery} />
      <FAQList faqs={faqs} searchQuery={searchQuery} />
    </>
  );
}
