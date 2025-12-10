"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";

const headlineWords = "AI Won't Replace You. Indecision Will.".split(" ");

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={zenVariants.staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Headline with word-by-word stagger */}
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={zenVariants.staggerChild}
                  custom={index}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline with fade-in */}
            <motion.p
              variants={zenVariants.fadeInUp}
              className="text-lg text-gray-300 sm:text-xl lg:text-2xl max-w-xl"
            >
              Master AI efficiency and Hindu decision science. Make confident
              choices in the age of artificial intelligence. Stop reacting. Start
              leading.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              variants={zenVariants.fadeInUp}
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              <Link href="/course">
                <Button variant="primary" size="lg">
                  Start Learning
                </Button>
              </Link>
              <Link href="/consulting">
                <Button variant="secondary" size="lg">
                  Enterprise Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual Placeholder */}
          <motion.div
            variants={zenVariants.fadeInUp}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20 border border-chisoku-cyan-500/30 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-chisoku-cyan-500/20 border-2 border-chisoku-cyan-500/50 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-chisoku-cyan-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <p className="text-chisoku-cyan-500/70 text-sm font-medium">
                  Visual Placeholder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

