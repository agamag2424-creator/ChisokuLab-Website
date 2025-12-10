"use client";

import { motion } from "framer-motion";
import { zenVariants } from "@/lib/animations";
import Card from "@/components/ui/Card";
import { ReactNode } from "react";

interface ServicePageTemplateProps {
  icon: ReactNode;
  title: string;
  heroDescription: string;
  whatItIs: string;
  whoItsFor: string[];
  deliverables: string[];
  timeline: string;
  investment: string;
  children?: React.ReactNode;
}

export default function ServicePageTemplate({
  icon,
  title,
  heroDescription,
  whatItIs,
  whoItsFor,
  deliverables,
  timeline,
  investment,
  children,
}: ServicePageTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 py-section-mobile md:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={zenVariants.staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={zenVariants.staggerChild}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-chisoku-cyan-500/20 flex items-center justify-center mx-auto">
                <div className="w-10 h-10 text-chisoku-cyan-500">
                  {icon}
                </div>
              </div>
            </motion.div>
            <motion.div variants={zenVariants.staggerChild}>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {heroDescription}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="py-section-mobile md:py-section bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.fadeInUp}
          >
            <h2 className="text-3xl font-bold text-chisoku-navy mb-6">
              What It Is
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {whatItIs}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={zenVariants.staggerChild}>
              <h2 className="text-3xl font-bold text-chisoku-navy mb-6">
                Who It's For
              </h2>
            </motion.div>
            <ul className="space-y-4">
              {whoItsFor.map((item, index) => (
                <motion.li
                  key={index}
                  variants={zenVariants.staggerChild}
                  custom={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-gray-700 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Deliverables & Details Section */}
      <section className="py-section-mobile md:py-section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Deliverables */}
            <div className="lg:col-span-2">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={zenVariants.fadeInUp}
              >
                <h2 className="text-3xl font-bold text-chisoku-navy mb-6">
                  Deliverables
                </h2>
                <Card className="h-full">
                  <ul className="space-y-4">
                    {deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>

            {/* Timeline & Investment */}
            <div className="space-y-6">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={zenVariants.fadeInUp}
              >
                <Card>
                  <h3 className="text-xl font-semibold text-chisoku-navy mb-4">
                    Timeline
                  </h3>
                  <p className="text-2xl font-bold text-chisoku-cyan-500">
                    {timeline}
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={zenVariants.fadeInUp}
              >
                <Card>
                  <h3 className="text-xl font-semibold text-chisoku-navy mb-4">
                    Investment
                  </h3>
                  <p className="text-2xl font-bold text-chisoku-cyan-500">
                    {investment}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (passed as children) */}
      {children}
    </>
  );
}

