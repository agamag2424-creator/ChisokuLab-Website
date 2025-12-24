"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";

export default function ConsultingHero() {
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
              Enterprise AI Deployment
              <br />
              <span className="text-chisoku-cyan-500">
                Without Trial-and-Error Tax
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Deploy AI tools across your organization with expert guidance on
              readiness, strategy, and governance. Stop wasting time and resources
              on tools that don't fit your needs.
            </p>
            <div className="inline-block px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-sm font-medium">
              Launching Q1 2026
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

