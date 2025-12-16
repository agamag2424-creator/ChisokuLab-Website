"use client";

import { motion } from "framer-motion";
import { FileText, Download, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const templates = [
  {
    title: "AI Tool Evaluation Checklist",
    description:
      "A comprehensive checklist to evaluate AI tools before adoption. Includes criteria for functionality, security, cost, and team fit.",
    icon: FileText,
  },
  {
    title: "Decision-Making Framework Template",
    description:
      "A structured template for making important decisions. Uses a proven 4-question framework to help you think through options systematically and avoid common decision-making pitfalls.",
    icon: FileText,
  },
  {
    title: "Team AI Readiness Assessment",
    description:
      "A self-assessment tool to evaluate your team's readiness for AI adoption. Identify strengths and areas for improvement.",
    icon: FileText,
  },
];

export default function FreeTemplates() {
  return (
    <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
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
              Free Templates
            </h2>
            <p className="text-lg text-gray-600">
              Download ready-to-use templates to help you make better decisions
              and evaluate AI tools.
            </p>
          </motion.div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => {
              const Icon = template.icon;
              return (
                <motion.div
                  key={template.title}
                  variants={zenVariants.staggerChild}
                  custom={index}
                >
                  <Card variant="elevated" className="h-full group hover:border-chisoku-cyan-500 transition-colors">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-50 group-hover:bg-chisoku-cyan-500 transition-colors flex items-center justify-center">
                        <Icon className="w-6 h-6 text-chisoku-cyan-500 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {template.description}
                      </p>
                      <button
                        onClick={() => {
                          // In production, this would download the actual template
                          alert("Template download coming soon!");
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-chisoku-cyan-500 hover:text-chisoku-cyan-600 group-hover:underline"
                      >
                        <Download className="w-4 h-4" />
                        Download Template
                      </button>
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

