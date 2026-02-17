"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";

const features = [
  "7 complete decision framework modules (50+ short video chapters)",
  "~5 hours of video content (binge-able or self-paced)",
  "14+ downloadable templates, worksheets, and frameworks",
  "Lifetime course access and updates",
  "Monthly live Q&A sessions (starting at launch)",
  "Private community access (launching with course)",
  "Certificate of completion",
  "30-day money-back guarantee",
];

export default function PricingSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "course-waitlist" }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.error || "Failed to join waitlist. Please try again.");
      }
    } catch {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Pre-Launch Pricing
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl font-bold text-amber-600">
                      ₹2,999
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ₹4,999
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Early bird waitlist price (full price at launch: ₹4,999 / $59 USD)
                  </p>
                  <p className="text-sm text-gray-500">
                    Approx. $39 USD early bird when converted.
                  </p>
                </div>
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

              {/* CTA - Email Waitlist */}
              <div className="mb-6">
                {isSubmitted ? (
                  <p className="text-chisoku-cyan-600 font-medium" role="status">
                    You&apos;re on the list! Check your email to confirm.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-chisoku-navy placeholder-gray-400 focus:border-chisoku-cyan-500 focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500/20 disabled:opacity-50"
                      required
                      aria-label="Email for waitlist"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </form>
                )}
                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
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

