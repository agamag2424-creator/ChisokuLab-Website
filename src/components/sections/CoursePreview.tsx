"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { zenVariants } from "@/lib/animations";

const modules = {
  efficiency: [
    {
      number: 1,
      title: "AI Landscape Overview",
      duration: "45 min",
      description:
        "Understand the current AI ecosystem and identify tools that matter for your role.",
      deliverable: "AI Tool Audit Template",
    },
    {
      number: 2,
      title: "Workflow Automation Basics",
      duration: "60 min",
      description:
        "Build your first automated workflows using no-code and low-code tools.",
      deliverable: "Automation Playbook",
    },
    {
      number: 3,
      title: "Prompt Engineering Mastery",
      duration: "90 min",
      description:
        "Learn to communicate effectively with AI systems for better outcomes.",
      deliverable: "Prompt Library",
    },
    {
      number: 4,
      title: "Data Analysis with AI",
      duration: "75 min",
      description:
        "Transform raw data into actionable insights using AI-powered analytics.",
      deliverable: "Analysis Framework",
    },
    {
      number: 5,
      title: "Content Creation at Scale",
      duration: "60 min",
      description:
        "Create high-quality content faster using AI assistance and templates.",
      deliverable: "Content Templates",
    },
    {
      number: 6,
      title: "Meeting & Communication Efficiency",
      duration: "45 min",
      description:
        "Streamline meetings, emails, and team communication with AI tools.",
      deliverable: "Communication Toolkit",
    },
    {
      number: 7,
      title: "Decision Support Systems",
      duration: "90 min",
      description:
        "Build AI-powered decision frameworks for complex business choices.",
      deliverable: "Decision Framework",
    },
    {
      number: 8,
      title: "AI Deployment Strategy",
      duration: "75 min",
      description:
        "Plan and execute AI tool rollouts in your organization effectively.",
      deliverable: "Deployment Plan",
    },
  ],
  philosophy: [
    {
      number: 9,
      title: "Introduction to the Three Gunas",
      duration: "60 min",
      description:
        "Understand Sattva (clarity), Rajas (activity), and Tamas (inertia) in decision-making.",
      deliverable: "Guna Assessment Tool",
    },
    {
      number: 10,
      title: "The Path of Karma Yoga",
      duration: "75 min",
      description:
        "Learn to act without attachment to outcomes, reducing decision anxiety.",
      deliverable: "Action Framework",
    },
    {
      number: 11,
      title: "Wisdom vs. Knowledge",
      duration: "90 min",
      description:
        "Distinguish between information overload and true understanding.",
      deliverable: "Wisdom Practices",
    },
    {
      number: 12,
      title: "Integrating Ancient Wisdom with Modern AI",
      duration: "60 min",
      description:
        "Synthesize timeless principles with cutting-edge technology for leadership.",
      deliverable: "Integration Framework",
    },
  ],
};

export default function CoursePreview() {
  const [activeTab, setActiveTab] = useState("efficiency");

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl">
              Course Curriculum
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              12 comprehensive modules combining AI efficiency with timeless
              wisdom
            </p>
          </div>

          {/* Tabs */}
          <Tabs.Root
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <Tabs.List className="flex border-b border-gray-200 mb-8">
              <Tabs.Trigger
                value="efficiency"
                className="flex-1 px-6 py-4 text-sm font-medium text-gray-600 data-[state=active]:text-chisoku-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-chisoku-cyan-500 transition-colors hover:text-chisoku-cyan-500"
              >
                AI Efficiency (1-8)
              </Tabs.Trigger>
              <Tabs.Trigger
                value="philosophy"
                className="flex-1 px-6 py-4 text-sm font-medium text-gray-600 data-[state=active]:text-chisoku-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-chisoku-cyan-500 transition-colors hover:text-chisoku-cyan-500"
              >
                Hindu Decision Science (9-12)
              </Tabs.Trigger>
            </Tabs.List>

            <AnimatePresence mode="wait">
              <Tabs.Content value="efficiency" key="efficiency">
                <motion.div
                  variants={zenVariants.fadeTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Accordion type="single" collapsible className="space-y-4">
                    {modules.efficiency.map((module) => (
                      <AccordionItem
                        key={module.number}
                        value={`module-${module.number}`}
                        className="border border-gray-200 rounded-lg px-6"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-full bg-chisoku-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                              {module.number}
                            </div>
                            <div>
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
                          <div className="space-y-4 pt-2 pb-4">
                            <p className="text-gray-700">{module.description}</p>
                            <div className="bg-chisoku-cyan-50 border border-chisoku-cyan-200 rounded-lg p-4">
                              <p className="text-sm font-medium text-chisoku-cyan-900">
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
              </Tabs.Content>

              <Tabs.Content value="philosophy" key="philosophy">
                <motion.div
                  variants={zenVariants.fadeTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Accordion type="single" collapsible className="space-y-4">
                    {modules.philosophy.map((module) => (
                      <AccordionItem
                        key={module.number}
                        value={`module-${module.number}`}
                        className="border border-gray-200 rounded-lg px-6"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                              {module.number}
                            </div>
                            <div>
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
                          <div className="space-y-4 pt-2 pb-4">
                            <p className="text-gray-700">{module.description}</p>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                              <p className="text-sm font-medium text-amber-900">
                                Deliverable:
                              </p>
                              <p className="text-amber-700">
                                {module.deliverable}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </Tabs.Content>
            </AnimatePresence>
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
}

