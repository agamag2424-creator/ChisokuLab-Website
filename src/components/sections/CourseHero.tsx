"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Users, Infinity, Star, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";
import { getAverageRating } from "@/data/testimonials";
import { enrollmentCount, getRandomRecentEnrollment, type RecentEnrollment } from "@/data/social-proof";

const stats = [
  { icon: BookOpen, label: "Modules", value: "7" },
  { icon: Clock, label: "Hours", value: "~4" },
  { icon: Infinity, label: "Lifetime Access", value: "∞" },
  { icon: RefreshCw, label: "Updates Forever", value: "Free" },
];

export default function CourseHero() {
  const [recentEnrollment, setRecentEnrollment] = useState<RecentEnrollment>(
    getRandomRecentEnrollment()
  );
  const averageRating = getAverageRating();

  // Rotate recent enrollment every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentEnrollment(getRandomRecentEnrollment());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-section-mobile md:py-section bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={zenVariants.staggerContainer}
          className="space-y-8 text-center"
        >
          {/* Badge */}
          <motion.div variants={zenVariants.staggerChild}>
            <span className="inline-block px-4 py-2 rounded-full bg-chisoku-cyan-500/20 border border-chisoku-cyan-500/30 text-chisoku-cyan-500 text-sm font-medium">
              7-Module Decision Framework Course
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={zenVariants.staggerChild}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Calm Amid AI Chaos
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={zenVariants.staggerChild}
            className="text-lg text-gray-300 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
          >
            Evidence-based decision frameworks for modern managers. Make confident
            choices in the age of artificial intelligence. Stop reacting. Start
            leading.
          </motion.p>

          {/* Social Proof Indicators */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="flex flex-col items-center gap-4 pt-6"
          >
            {/* Enrollment Count & Rating */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-chisoku-cyan-500" />
                <span className="text-lg font-semibold">
                  {enrollmentCount} managers enrolled
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {averageRating.toFixed(1)} avg. rating
                </span>
              </div>
            </div>

            {/* Recent Enrollment Ticker */}
            <AnimatePresence mode="wait">
              <motion.div
                key={recentEnrollment.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-gray-200">
                  <span className="font-semibold">{recentEnrollment.name}</span> from{" "}
                  <span className="font-semibold">{recentEnrollment.location}</span> enrolled{" "}
                  {recentEnrollment.timeAgo}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 pt-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={zenVariants.staggerChild}
                  custom={index}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-chisoku-cyan-500" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center pt-8"
          >
            <Button variant="primary" size="lg" onClick={scrollToPricing}>
              Enroll Now
            </Button>
            <Button variant="secondary" size="lg">
              Download Syllabus
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

