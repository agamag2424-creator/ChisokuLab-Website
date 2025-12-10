"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { zenVariants } from "@/lib/animations";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQ[];
}

interface FAQListProps {
  faqs: FAQCategory[];
  searchQuery?: string;
}

export default function FAQList({ faqs, searchQuery = "" }: FAQListProps) {
  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs;
    }

    const query = searchQuery.toLowerCase();
    return faqs
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [faqs, searchQuery]);

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No FAQs found matching your search.
            </p>
          </div>
        ) : (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.staggerContainer}
            className="space-y-12"
          >
            {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={zenVariants.staggerChild}
                custom={categoryIndex}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-chisoku-navy">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="border border-gray-200 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold text-chisoku-navy hover:text-chisoku-cyan-500 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Link */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
          className="mt-16 pt-12 border-t border-gray-200 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-chisoku-cyan-500 hover:text-chisoku-cyan-600 font-medium"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

