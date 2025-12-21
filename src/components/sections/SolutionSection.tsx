"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { zenVariants } from "@/lib/animations";

const unifiedFrameworkPoints = [
  "Practical AI integration strategies for modern workflows",
  "Evidence-based decision-making frameworks tested across millennia",
  "Daily practices for maintaining clarity under pressure",
  "Team leadership tools for navigating technological change",
  "Ethical guidelines for human-AI collaboration",
];

const businessFrameworkPoints = [
  "Identify which decisions are yours vs. delegatable vs. automatable",
  "Apply the 4-Question Clarity Filter to complex choices",
  "Recognize when you're deciding from clarity vs. reaction",
  "Build resilience through evidence-based daily practices",
  "Create ethical boundaries for AI in your organization",
];

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
              The Solution: Integrated Decision Frameworks
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Practical tools backed by 3,000 years of evidence
            </p>
          </motion.div>

          {/* Unified Framework */}
            <motion.div
              variants={zenVariants.staggerChild}
            className="max-w-4xl mx-auto"
            >
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-chisoku-navy mb-6">
                  Our approach combines:
                </h3>
                <div className="w-16 h-1 bg-chisoku-cyan-500 rounded-full" />
              </div>
              
              <ul className="space-y-4">
                {unifiedFrameworkPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={zenVariants.staggerChild}
                    custom={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-200 mt-8">
                <h4 className="text-lg font-semibold text-chisoku-navy mb-4">
                  You'll learn to:
                </h4>
                <ul className="space-y-3">
                  {businessFrameworkPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={zenVariants.staggerChild}
                      custom={index + unifiedFrameworkPoints.length}
                    className="flex items-start gap-3"
                  >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
              </div>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

