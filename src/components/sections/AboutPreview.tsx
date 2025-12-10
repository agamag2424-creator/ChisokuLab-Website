"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";

export default function AboutPreview() {
  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: Image (40%) */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.fadeInUp}
            className="lg:col-span-2"
          >
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-chisoku-cyan-500/20 border-4 border-chisoku-cyan-500/30 mb-4" />
                <p className="text-gray-600 font-medium">Photo of Agam</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text (60%) */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.staggerContainer}
            className="lg:col-span-3 space-y-6"
          >
            <motion.div variants={zenVariants.staggerChild}>
              <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl">
                Who's Teaching This?
              </h2>
            </motion.div>

            <motion.div
              variants={zenVariants.staggerChild}
              className="space-y-4 text-gray-700 leading-relaxed"
            >
              <p>
                I'm Agam Agrawal, and I've spent years navigating the chaos of
                AI adoption while drawing on the wisdom of Hindu philosophy to
                make better decisions. This course combines my practical
                experience deploying AI tools in enterprise settings with
                timeless frameworks for clarity and confidence.
              </p>
              <p>
                I've seen too many managers paralyzed by choice, overwhelmed by
                tools, and stuck in reactive mode. This isn't about learning
                every AI tool—it's about mastering the ones that matter and
                developing the inner clarity to use them wisely.
              </p>
              <p>
                The frameworks you'll learn here have helped me and hundreds of
                others move from indecision to confident leadership. They're
                practical, tested, and grounded in wisdom that's stood the test
                of millennia.
              </p>
            </motion.div>

            <motion.div variants={zenVariants.staggerChild}>
              <Link href="/about">
                <Button variant="secondary" size="md">
                  Read My Full Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

