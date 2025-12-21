"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={zenVariants.staggerContainer}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left: Photo */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 mx-auto rounded-full bg-chisoku-cyan-500/20 border-4 border-chisoku-cyan-500/30 mb-6" />
                  <p className="text-gray-600 font-medium text-lg">
                    Photo of Agam Agrawal
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Founder, ChisokuLab
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Headline */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              About ChisokuLab
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We teach evidence-based decision frameworks that help managers make
              confident choices in the age of artificial intelligence. Our approach
              combines practical AI integration strategies with frameworks that have
              guided leaders for 3,000 years.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

