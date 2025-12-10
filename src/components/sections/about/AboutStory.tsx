"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";

const storySections = [
  {
    title: "Why I Built This",
    content: `After years of working with AI tools and witnessing the chaos they create in organizations, I realized something fundamental was missing. Managers were drowning in options, paralyzed by indecision, and constantly reacting to the latest AI trend.

I saw brilliant leaders making poor decisions not because they lacked intelligence, but because they lacked a framework for navigating uncertainty. That's when I turned to the wisdom I'd grown up with—Hindu decision science, particularly the concept of Chisoku (calm decision-making).

ChisokuLab was born from the belief that we don't need more tools or more information. We need better ways to think about decisions, especially when AI is involved.`,
  },
  {
    title: "What We Believe",
    content: `We believe that AI won't replace you—indecision will. The managers who thrive in this new era aren't the ones who adopt every tool first. They're the ones who can make clear, confident decisions about which tools to use, when to use them, and why.

We believe in combining the best of both worlds: cutting-edge AI efficiency techniques with timeless decision-making wisdom. This isn't about choosing between technology and philosophy—it's about using both to create something more powerful than either alone.

We believe that calm, deliberate decision-making is a skill that can be learned, practiced, and mastered.`,
  },
  {
    title: "The Philosophy",
    content: `Chisoku (calm decision-making) comes from Hindu decision science, which teaches us to step back from reactive thinking and approach choices with clarity and purpose.

Our philosophy centers on three principles:

**Clarity Over Speed**: Better to make one good decision than ten rushed ones. We teach you to slow down, gather the right information, and think clearly before acting.

**Purpose Over Pressure**: External pressure to adopt AI tools is constant. We help you develop internal clarity about what actually matters for your goals, so you can ignore the noise and focus on what's essential.

**Wisdom Over Information**: More data doesn't mean better decisions. We combine AI efficiency techniques with decision science principles to help you process information effectively and make choices aligned with your values and objectives.

This isn't just about AI—it's about becoming the kind of leader who can navigate any uncertainty with confidence and calm.`,
  },
];

export default function AboutStory() {
  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="space-y-16"
        >
          {storySections.map((section, index) => (
            <motion.article
              key={section.title}
              variants={zenVariants.staggerChild}
              custom={index}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-chisoku-navy mb-6">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

