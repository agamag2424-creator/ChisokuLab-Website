"use client";

import Image from "next/image";
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
          className="flex flex-col items-center gap-12"
        >
          {/* Image at top */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="w-full max-w-[800px]"
          >
            <div 
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(0, 176, 208, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Image
                src="/images/about-hero-focused.png"
                alt="About ChisokuLab"
                width={1200}
                height={950}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Heading and description below */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center max-w-4xl"
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

