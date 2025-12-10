"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const reasons = [
  {
    title: "Proven Framework",
    description:
      "Our approach combines AI efficiency best practices with decision science principles, tested across multiple organizations.",
  },
  {
    title: "No Trial-and-Error Tax",
    description:
      "Avoid costly mistakes by getting expert guidance upfront. We help you choose the right tools for your specific needs.",
  },
  {
    title: "Strategic Focus",
    description:
      "We don't just help you adopt tools—we help you build a sustainable AI strategy aligned with your business objectives.",
  },
  {
    title: "Calm Decision-Making",
    description:
      "Our Chisoku philosophy helps you navigate AI adoption with clarity and confidence, not reactive panic.",
  },
];

export default function WhyChisokuLab() {
  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl mb-4">
              Why ChisokuLab?
            </h2>
            <p className="text-lg text-gray-600">
              We bring a unique combination of AI expertise and decision science
              to help you deploy AI tools the right way, the first time.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={zenVariants.staggerChild}
                custom={index}
              >
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chisoku-cyan-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-chisoku-cyan-500" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-chisoku-navy mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

