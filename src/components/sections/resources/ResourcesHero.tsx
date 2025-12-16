"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";

export default function ResourcesHero() {
  return (
    <section className="relative bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={zenVariants.staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={zenVariants.staggerChild}>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Start Learning Now
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Free guides, templates, videos, and articles to help you make
              better decisions in the AI era. No email required to get started.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

