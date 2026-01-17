"use client";

import { motion } from "framer-motion";
import { TrendingDown, Brain, Zap, BookOpen, Quote } from "lucide-react";
import {
  getAllStatistics,
  getWisdomQuotes,
  getExpertQuotes,
} from "@/data/decision-crisis";
import { zenVariants } from "@/lib/animations";

const statIcons = [Brain, Zap, TrendingDown];

export default function DecisionCrisisSection() {
  const statistics = getAllStatistics();
  const wisdomQuotes = getWisdomQuotes();
  const expertQuotes = getExpertQuotes();

  return (
    <section className="py-section-mobile md:py-section bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-600 to-chisoku-navy-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 md:left-20 opacity-10 pointer-events-none">
        <Quote className="h-32 w-32 md:h-48 md:w-48 text-chisoku-cyan-500" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 opacity-10 pointer-events-none rotate-180">
        <Quote className="h-32 w-32 md:h-48 md:w-48 text-chisoku-cyan-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={zenVariants.staggerChild}
            className="inline-block px-4 py-2 rounded-full bg-chisoku-cyan-500/20 border border-chisoku-cyan-500/30 text-chisoku-cyan-400 text-sm font-medium mb-6"
          >
            The Challenge Leaders Face
          </motion.span>
          <motion.h2
            variants={zenVariants.staggerChild}
            className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4"
          >
            The Decision Crisis
          </motion.h2>
          <motion.p
            variants={zenVariants.staggerChild}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Why the best leaders are rethinking how they make choices in the age of AI
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {statistics.map((stat, index) => {
            const IconComponent = statIcons[index] || Brain;
            return (
              <motion.div
                key={stat.id}
                variants={zenVariants.staggerChild}
                className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-chisoku-cyan-500/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chisoku-cyan-500/20 mb-6">
                  <IconComponent className="w-8 h-8 text-chisoku-cyan-400" />
                </div>
                <div className="text-5xl font-bold text-chisoku-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-white mb-3">
                  {stat.label}
                </div>
                <p className="text-gray-400 text-sm mb-4">{stat.description}</p>
                <p className="text-xs text-gray-500 italic">
                  Source: {stat.source}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Wisdom Quotes Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="mb-20"
        >
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-chisoku-cyan-400 mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Timeless Wisdom
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Ancient Solutions for Modern Challenges
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {wisdomQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                variants={zenVariants.staggerChild}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
              >
                <Quote className="absolute top-6 left-6 w-8 h-8 text-chisoku-cyan-500/30" />
                <blockquote className="relative z-10 pt-8">
                  <p className="text-gray-200 text-lg leading-relaxed mb-6 font-serif italic">
                    "{quote.quote}"
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <span className="block text-chisoku-cyan-400 font-semibold">
                        — {quote.author}
                      </span>
                      <span className="block text-gray-500 text-sm mt-1">
                        {quote.source}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expert Quotes Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
        >
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-chisoku-cyan-400 mb-4">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Modern Validation
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              What Today's Experts Confirm
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                variants={zenVariants.staggerChild}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-chisoku-cyan-500/20 transition-colors"
              >
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{quote.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{quote.author}</p>
                  <p className="text-sm text-gray-400">{quote.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{quote.source}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connecting Statement */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
          className="text-center mt-16 pt-16 border-t border-white/10"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The challenge is real. The wisdom exists. What's been missing is a{" "}
            <span className="text-chisoku-cyan-400 font-semibold">
              practical framework
            </span>{" "}
            that bridges ancient decision science with modern AI realities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
