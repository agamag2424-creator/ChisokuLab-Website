"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";

const storySections = [
  {
    title: "Why I Built This",
    content: `After years helping managers implement AI, I noticed a pattern: the chaos wasn't from the technology—it was from poor decision-making under pressure.

Managers weren't struggling because they lacked information—they were drowning in it. They needed decision-making frameworks that actually held up when stakes were high, not just quarterly earnings guidance.

I saw brilliant leaders making poor decisions not because they lacked intelligence, but because contemporary management frameworks failed under pressure. That's when I started researching decision-making systems that have actually worked across millennia—frameworks battle-tested by leaders facing life-or-death choices, not just quarterly earnings.

ChisokuLab was born from the belief that we don't need more tools or more information. We need frameworks for decision-making that actually hold up when the stakes are high and the path forward is unclear. That's what we teach.`,
  },
  {
    title: "What We Believe",
    content: `We believe that AI won't replace you—indecision will. The managers who thrive in this new era aren't the ones who adopt every tool first. They're the ones who can make clear, confident decisions about which tools to use, when to use them, and why.

We believe in combining the best of both worlds: cutting-edge AI implementation strategies with time-tested decision-making frameworks. This isn't about choosing between modern tools and proven principles—it's about using both to create something more powerful than either alone.

We believe that calm, deliberate decision-making is a skill that can be learned, practiced, and mastered.`,
  },
  {
    title: "Our Approach",
    content: `Our decision-making approach is built on frameworks that have guided leaders through uncertainty for millennia. The core principle: step back from reactive thinking and approach choices with clarity and purpose.

Our approach centers on three principles:

**Clarity Over Speed**: Better to make one good decision than ten rushed ones. We teach you to slow down, gather the right information, and think clearly before acting.

**Purpose Over Pressure**: External pressure to adopt AI tools is constant. We help you develop internal clarity about what actually matters for your goals, so you can ignore the noise and focus on what's essential.

**Frameworks Over Information**: More data doesn't mean better decisions. We combine AI efficiency techniques with decision frameworks to help you process information effectively and make choices aligned with your values and objectives.

These frameworks have their roots in ancient decision-making systems that have guided leaders for over 3,000 years. In our course, you'll learn not just how to apply them, but where they come from and why they've stood the test of time. The origins themselves are a fascinating study in what makes decision-making frameworks truly timeless.

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

