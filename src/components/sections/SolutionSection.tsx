"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { zenVariants } from "@/lib/animations";

const aiEfficiencyPoints = [
  "Master the AI tools that actually matter",
  "Build systematic workflows, not scattered experiments",
  "Measure impact, not just activity",
  "Deploy with confidence, not trial-and-error",
];

const philosophyPoints = [
  "Understand the three gunas (modes of nature)",
  "Apply timeless decision frameworks",
  "Cultivate inner clarity amid external chaos",
  "Lead from wisdom, not reactivity",
];

const quote = {
  text: "The wise see knowledge and action as one.",
  source: "Bhagavad Gita 5.4",
};

export default function SolutionSection() {
  return (
    <section className="py-section-mobile md:py-section bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={zenVariants.staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl">
              The Solution: Two Pillars
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              AI efficiency meets timeless wisdom
            </p>
          </motion.div>

          {/* Two-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Left: AI Efficiency */}
            <motion.div
              variants={zenVariants.staggerChild}
              className="lg:pr-12 space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-chisoku-navy">
                  AI Efficiency
                </h3>
                <div className="w-16 h-1 bg-chisoku-cyan-500 rounded-full" />
              </div>
              <ul className="space-y-4">
                {aiEfficiencyPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={zenVariants.staggerChild}
                    custom={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Center Divider */}
            <div className="hidden lg:block relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-chisoku-cyan-500 transform -translate-x-1/2" />
            </div>

            {/* Right: Hindu Philosophy */}
            <motion.div
              variants={zenVariants.staggerChild}
              className="lg:pl-12 space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-chisoku-navy">
                  Hindu Decision Science
                </h3>
                <div className="w-16 h-1 bg-amber-500 rounded-full" />
              </div>
              <ul className="space-y-4">
                {philosophyPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={zenVariants.staggerChild}
                    custom={index + 4}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quote Below */}
          <motion.div
            variants={zenVariants.fadeInUp}
            className="text-center max-w-2xl mx-auto pt-8 border-t border-gray-200"
          >
            <blockquote className="text-xl font-serif text-chisoku-navy italic">
              "{quote.text}"
            </blockquote>
            <cite className="mt-2 block text-sm text-gray-500 not-italic">
              — {quote.source}
            </cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

