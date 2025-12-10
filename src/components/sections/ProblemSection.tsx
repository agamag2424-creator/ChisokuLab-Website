"use client";

import { motion } from "framer-motion";
import { Zap, Target, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const problems = [
  {
    icon: Zap,
    title: "Pressure to Adopt AI",
    description:
      "Every day brings new AI tools. The pressure to adopt them all is overwhelming, leaving you scattered and ineffective.",
  },
  {
    icon: Target,
    title: "Decision Fatigue",
    description:
      "Too many choices, too little clarity. You're paralyzed by indecision, unable to move forward with confidence.",
  },
  {
    icon: RefreshCw,
    title: "Fear of Obsolescence",
    description:
      "The constant worry that you're falling behind, that AI will replace you, creates anxiety that blocks clear thinking.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={zenVariants.staggerContainer}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl">
              The Problem We're Solving
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three challenges that keep managers stuck in reactive mode
            </p>
          </motion.div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-stretch">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={problem.title}
                  variants={zenVariants.staggerChild}
                  custom={index}
                  className="flex"
                >
                  <Card variant="elevated" className="flex flex-col h-full w-full group hover:border-chisoku-cyan-500 transition-colors duration-300">
                    <div className="flex flex-col space-y-4 flex-grow">
                      <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-50 flex items-center justify-center group-hover:bg-chisoku-cyan-500 transition-colors duration-300 flex-shrink-0">
                        <Icon className="w-6 h-6 text-chisoku-cyan-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-chisoku-navy">
                        {problem.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {problem.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

