"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { zenVariants } from "@/lib/animations";

const modules = [
    {
      number: 1,
    title: "The Decision Fatigue Crisis",
    duration: "35 min",
      description:
      "Understanding why AI creates more decisions, not fewer. Learn to identify the three types of managerial decisions: strategic (your core role), operational (delegatable), and mechanical (automatable).",
    deliverable: "Decision Audit Worksheet",
    },
    {
      number: 2,
    title: "The Clarity Filter Framework",
    duration: "40 min",
      description:
      "A simple 4-question tool that cuts through complexity in 60 seconds. Learn when most decision frameworks fail and how to apply this filter to AI-related choices in real-time.",
    deliverable: "Clarity Filter Decision Template",
    },
    {
      number: 3,
    title: "The Energy Audit",
    duration: "35 min",
      description:
      "Recognize your three decision-making modes: Clarity Mode (best decisions), Reactive Mode (ego-driven, rushed), and Avoidance Mode (fear-based, inertia). Learn to diagnose and shift your state.",
    deliverable: "Decision Mode Self-Assessment",
    },
    {
      number: 4,
    title: "The Detachment Principle",
    duration: "40 min",
      description:
      "The paradox of leadership: care deeply about outcomes while remaining unshaken by them. Learn why managers burn out and how to lead your team through uncertainty without anxiety.",
    deliverable: "Detachment Practice Log",
    },
    {
      number: 5,
    title: "Building Decision Resilience",
    duration: "30 min",
      description:
      "Daily practices for maintaining steady judgment under pressure. Learn the Observer Technique for reactive moments and evidence-based routines that take just 5-10 minutes per day.",
    deliverable: "30-Day Resilience Tracker",
    },
    {
      number: 6,
    title: "Human Decisions in an AI World",
      duration: "45 min",
      description:
      "Which decisions AI should never make (people, ethics, strategy, relationships) and how to build ethical human-AI workflows. Includes scripts for the automation conversation with your team.",
    deliverable: "AI Boundaries Template + Team Communication Scripts",
    },
    {
      number: 7,
    title: "The Source",
    duration: "30 min",
      description:
      "Where these frameworks originated and how to go deeper. Discover the ancient texts that have guided leaders for 3,000 years and learn how to make these practices your own.",
    deliverable: "Further Learning Resources",
    },
];

export default function CoursePreview() {
  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={zenVariants.staggerContainer}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl">
              Course Curriculum
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              7 focused modules teaching evidence-based decision frameworks for
              AI-era management
            </p>
          </motion.div>

          {/* Modules List */}
          <motion.div variants={zenVariants.staggerChild}>
                  <Accordion type="single" collapsible className="space-y-4">
              {modules.map((module) => (
                      <AccordionItem
                        key={module.number}
                        value={`module-${module.number}`}
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left w-full">
                            <div className="w-10 h-10 rounded-full bg-chisoku-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                              {module.number}
                            </div>
                      <div className="flex-1">
                              <h3 className="font-semibold text-chisoku-navy">
                                {module.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {module.duration}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                    <div className="space-y-4 pt-2 pb-4 pl-14">
                      <p className="text-gray-700 leading-relaxed">
                        {module.description}
                      </p>
                            <div className="bg-chisoku-cyan-50 border border-chisoku-cyan-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-chisoku-cyan-900 mb-1">
                                Deliverable:
                              </p>
                              <p className="text-chisoku-cyan-700">
                                {module.deliverable}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
                </motion.div>
      </div>
    </section>
  );
}

