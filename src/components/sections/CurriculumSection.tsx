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
      "Understand why AI creates more decisions, not fewer. Learn to categorize your decisions into three types: strategic (your core role), operational (delegatable), and mechanical (automatable). Complete a personal decision audit to identify where you're spending energy unnecessarily.",
    deliverables: "Decision Audit Worksheet, Three Types Framework Template",
  },
  {
    number: 2,
    title: "The Clarity Filter Framework",
    duration: "40 min",
    description:
      "Master a simple 4-question decision tool that cuts through complexity in 60 seconds. Learn why most decision frameworks fail under pressure and how this filter addresses the root causes. Apply the framework to real AI-related decisions through guided case studies.",
    deliverables: "Clarity Filter Decision Template, Case Study Workbook",
  },
  {
    number: 3,
    title: "The Energy Audit",
    duration: "35 min",
    description:
      "Identify your three decision-making modes: Clarity Mode (analytical, grounded), Reactive Mode (ego-driven, rushed), and Avoidance Mode (fear-based, procrastination). Learn to recognize which mode you're in during high-pressure moments and how to consciously shift states.",
    deliverables: "Decision Mode Self-Assessment, Mode Shift Practice Guide",
  },
  {
    number: 4,
    title: "The Detachment Principle",
    duration: "40 min",
    description:
      "Explore the leadership paradox: how to care deeply about outcomes while remaining unshaken by them. Understand why attachment to results causes burnout and poor decisions. Learn practical techniques for maintaining commitment without anxiety, especially when leading teams through uncertain AI transformations.",
    deliverables: "Detachment Practice Log, Team Leadership Scripts",
  },
  {
    number: 5,
    title: "Building Decision Resilience",
    duration: "30 min",
    description:
      "Develop daily practices (5-10 minutes each) that build unshakeable judgment under pressure. Learn the Observer Technique for staying calm during reactive moments. Establish routines for morning intention-setting, midday recalibration, and evening reflection that fit into a busy manager's schedule.",
    deliverables: "30-Day Resilience Tracker, Daily Practice Guide",
  },
  {
    number: 6,
    title: "Human Decisions in an AI World",
    duration: "45 min",
    description:
      "Define clear boundaries: which decisions humans must always make (people, ethics, strategy, trust-building) and which can be automated. Learn to design human-AI workflows that honor both efficiency and human judgment. Includes ready-to-use scripts for the automation conversation with your team.",
    deliverables:
      "AI Boundaries Framework, Team Communication Scripts, Workflow Design Templates",
  },
  {
    number: 7,
    title: "The Source",
    duration: "30 min",
    description:
      "Discover where these frameworks originated and why they've worked for 3,000 years. Introduction to the ancient texts (Bhagavad Gita, Yoga Sutras) that have guided leaders through chaos across millennia. Learn how to go deeper into these traditions if you choose, with beginner-friendly resources and next steps.",
    deliverables: "Reading List, Sanskrit Terms Glossary, Further Learning Pathways",
  },
];

export default function CurriculumSection() {
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
              Complete Curriculum
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              7 focused modules teaching evidence-based decision frameworks for
              AI-era leadership
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
                      <div className="w-12 h-12 rounded-full bg-chisoku-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {module.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-chisoku-navy">
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {module.duration}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2 pb-4 pl-16">
                      <p className="text-gray-700 leading-relaxed">
                        {module.description}
                                  </p>
                        <div className="bg-chisoku-cyan-50 border border-chisoku-cyan-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-chisoku-cyan-900 mb-1">
                          Deliverables:
                          </p>
                          <p className="text-chisoku-cyan-700">
                          {module.deliverables}
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

