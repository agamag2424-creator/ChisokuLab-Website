"use client";

import { motion } from "framer-motion";
import { Video, FileText, Users, MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const formats = [
  {
    icon: Video,
    title: "Video Lessons",
    description:
      "High-quality video content with clear explanations and real-world examples.",
  },
  {
    icon: FileText,
    title: "Templates",
    description:
      "Ready-to-use templates and frameworks you can implement immediately.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Access to a private community of managers (launching with course).",
  },
  {
    icon: MessageCircle,
    title: "Live Q&A",
    description:
      "Monthly live sessions starting at launch to answer your questions.",
  },
];

export default function CourseFormatSection() {
  return (
    <section className="py-section-mobile md:py-section bg-gray-50">
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
              Course Format
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Multiple ways to learn and apply the material
            </p>
          </motion.div>

          {/* Format Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {formats.map((format, index) => {
              const Icon = format.icon;
              return (
                <motion.div
                  key={format.title}
                  variants={zenVariants.staggerChild}
                  custom={index}
                >
                  <Card variant="default" className="h-full">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-50 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-chisoku-cyan-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-chisoku-navy">
                        {format.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {format.description}
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

