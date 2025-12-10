"use client";

import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";

const features = [
  "12 comprehensive modules",
  "30+ hours of video content",
  "All templates and frameworks",
  "6 months of community access",
  "Lifetime course access",
  "Monthly live Q&A sessions",
  "Certificate of completion",
  "30-day money-back guarantee",
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-section-mobile md:py-section bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="flex justify-center"
        >
          <motion.div variants={zenVariants.staggerChild} className="w-full max-w-2xl">
            <Card variant="elevated" className="text-center">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-sm font-medium">
                  Early Bird Pricing
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-5xl font-bold text-amber-600">
                    ₹15,000
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹25,000
                  </span>
                </div>
                <p className="mt-2 text-gray-600">One-time payment</p>
              </div>

              {/* Features */}
              <div className="mb-8 text-left">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      variants={zenVariants.staggerChild}
                      custom={index}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    // TODO: Replace with actual Gumroad link
                    window.open("https://gumroad.com/placeholder", "_blank");
                  }}
                >
                  Enroll Now
                </Button>
              </div>

              {/* Guarantee Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-chisoku-cyan-500" />
                <span>30-day money-back guarantee</span>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

