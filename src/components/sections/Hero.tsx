"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
              className="text-lg text-gray-300 leading-relaxed sm:text-xl lg:text-2xl max-w-xl"
            >
              Evidence-based decision frameworks for modern managers. make confident
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
                  Explore Course
                </Button>
              </Link>
              <Link href="/consulting">
                <Button variant="secondary" size="lg">
                  Enterprise Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            variants={zenVariants.fadeInUp}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-image.png"
                alt="AI efficiency and decision frameworks visualization"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 576px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

