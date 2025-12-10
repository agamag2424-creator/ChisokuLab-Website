"use client";

import { motion } from "framer-motion";
import { FileCheck, Target, Shield, Headphones } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { zenVariants } from "@/lib/animations";

const services = [
  {
    icon: FileCheck,
    title: "AI Readiness Assessment",
    description:
      "Comprehensive evaluation of your organization's AI maturity, current tool usage, and readiness for deployment.",
    href: "/consulting/readiness-assessment",
  },
  {
    icon: Target,
    title: "LLM Deployment Strategy",
    description:
      "Custom roadmap for rolling out large language models and AI tools across your teams with minimal disruption.",
    href: "/consulting/llm-deployment",
  },
  {
    icon: Shield,
    title: "Governance Architecture",
    description:
      "Framework for managing AI risks, compliance, and ethical considerations. Ensure responsible AI deployment.",
    href: "/consulting/governance-architecture",
  },
  {
    icon: Headphones,
    title: "Advisory Retainer",
    description:
      "Ongoing support and guidance as you navigate AI adoption. Get expert advice when you need it most.",
    href: "/consulting/advisory-retainer",
  },
];

export default function ServicesGrid() {
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
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Four core offerings designed to guide your organization through
              successful AI deployment.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={zenVariants.staggerChild}
                  custom={index}
                >
                  <Link href={service.href}>
                    <Card variant="elevated" className="h-full group hover:border-chisoku-cyan-500 transition-colors duration-300">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-500/10 group-hover:bg-chisoku-cyan-500 transition-colors duration-300 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-chisoku-cyan-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="text-sm font-medium text-chisoku-cyan-500 group-hover:underline">
                          Learn more →
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

