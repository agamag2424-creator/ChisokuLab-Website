"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { zenVariants } from "@/lib/animations";
import type { Module } from "@/lib/mdx";

interface CurriculumSectionProps {
  efficiencyModules: Module[];
  philosophyModules: Module[];
}

export default function CurriculumSection({
  efficiencyModules,
  philosophyModules,
}: CurriculumSectionProps) {

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
              All 12 modules designed to transform your approach to AI and
              decision-making
            </p>
          </motion.div>

          {/* AI Efficiency Modules */}
          <motion.div variants={zenVariants.staggerChild} className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-chisoku-navy">
                AI Efficiency (Modules 1-8)
              </h3>
              <div className="flex-1 h-px bg-chisoku-cyan-500" />
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {efficiencyModules.map((module) => (
                <AccordionItem
                  key={module.slug}
                  value={module.slug}
                  className="border border-gray-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="w-12 h-12 rounded-full bg-chisoku-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {module.frontmatter.moduleNumber}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-chisoku-navy">
                          {module.frontmatter.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {module.frontmatter.duration}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2 pb-4 pl-16">
                      <div className="prose prose-sm max-w-none">
                        {module.content.split("##")[1] && (
                          <div className="text-gray-700">
                            {module.content
                              .split("##")
                              .slice(1)
                              .map((section, idx) => (
                                <div key={idx} className="mb-4">
                                  <h5 className="font-semibold text-chisoku-navy mb-2">
                                    {section.split("\n")[0]}
                                  </h5>
                                  <p className="text-gray-600">
                                    {section
                                      .split("\n")
                                      .slice(1)
                                      .join("\n")
                                      .trim()}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {module.content.includes("Deliverable") && (
                        <div className="bg-chisoku-cyan-50 border border-chisoku-cyan-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-chisoku-cyan-900 mb-1">
                            Deliverable:
                          </p>
                          <p className="text-chisoku-cyan-700">
                            {module.content
                              .split("**")[1]
                              ?.replace(/\*\*/g, "")
                              .trim() || "See module content"}
                          </p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Hindu Philosophy Modules */}
          <motion.div variants={zenVariants.staggerChild} className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-chisoku-navy">
                Hindu Decision Science (Modules 9-12)
              </h3>
              <div className="flex-1 h-px bg-amber-500" />
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {philosophyModules.map((module) => (
                <AccordionItem
                  key={module.slug}
                  value={module.slug}
                  className="border border-gray-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {module.frontmatter.moduleNumber}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-chisoku-navy">
                          {module.frontmatter.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {module.frontmatter.duration}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2 pb-4 pl-16">
                      <div className="prose prose-sm max-w-none">
                        {module.content.split("##")[1] && (
                          <div className="text-gray-700">
                            {module.content
                              .split("##")
                              .slice(1)
                              .map((section, idx) => (
                                <div key={idx} className="mb-4">
                                  <h5 className="font-semibold text-chisoku-navy mb-2">
                                    {section.split("\n")[0]}
                                  </h5>
                                  <p className="text-gray-600">
                                    {section
                                      .split("\n")
                                      .slice(1)
                                      .join("\n")
                                      .trim()}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {module.content.includes("Deliverable") && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-amber-900 mb-1">
                            Deliverable:
                          </p>
                          <p className="text-amber-700">
                            {module.content
                              .split("**")[1]
                              ?.replace(/\*\*/g, "")
                              .trim() || "See module content"}
                          </p>
                        </div>
                      )}
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

