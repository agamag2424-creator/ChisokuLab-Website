"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Infinity } from "lucide-react";
import Button from "@/components/ui/Button";
import { zenVariants } from "@/lib/animations";

const stats = [
  { icon: BookOpen, label: "12 Modules", value: "12" },
  { icon: Clock, label: "30+ Hours", value: "30+" },
  { icon: Users, label: "6 Months Support", value: "6" },
  { icon: Infinity, label: "Lifetime Access", value: "∞" },
];

export default function CourseHero() {
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
              12-Module Comprehensive Course
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
            Master AI efficiency tools and Hindu decision science frameworks to
            make confident choices in the age of artificial intelligence. Stop
            reacting. Start leading.
          </motion.p>

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

