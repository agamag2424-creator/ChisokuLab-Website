"use client";

import { motion } from "framer-motion";
import { Building2, Users, Target, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const audiences = [
  {
    icon: Building2,
    title: "Enterprise Leaders",
    description:
      "CTOs, VPs of Engineering, and senior executives who need to make strategic decisions about AI adoption across their organization.",
  },
  {
    icon: Users,
    title: "IT & Operations Teams",
    description:
      "Teams responsible for deploying and managing AI tools, who want to avoid costly mistakes and ensure smooth implementation.",
  },
  {
    icon: Target,
    title: "Innovation Managers",
    description:
      "Leaders tasked with driving digital transformation, who need a clear roadmap for integrating AI into existing workflows.",
  },
  {
    icon: TrendingUp,
    title: "Growing Companies",
    description:
      "Organizations scaling rapidly, where the cost of wrong AI decisions multiplies quickly. Get it right from the start.",
  },
];

export default function WhoItsFor() {
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
              Who It's For
            </h2>
            <p className="text-lg text-gray-600">
              Our consulting services are designed for organizations ready to
              deploy AI strategically, not reactively.
            </p>
          </motion.div>

          {/* Audience Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.div
                  key={audience.title}
                  variants={zenVariants.staggerChild}
                  custom={index}
                >
                  <Card className="h-full text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 rounded-lg bg-chisoku-cyan-50 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-chisoku-cyan-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-chisoku-navy">
                        {audience.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {audience.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

