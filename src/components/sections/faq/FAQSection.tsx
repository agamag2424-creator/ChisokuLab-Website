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
  title: string;
  questions: FAQ[];
}

interface FAQSectionProps {
  categories: FAQCategory[];
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function FAQSection({ categories, searchQuery: externalSearchQuery, onClearSearch }: FAQSectionProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const [openCategory, setOpenCategory] = useState<string | null>(
    categories[0]?.title || null
  );

  // Filter FAQs based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [categories, searchQuery]);

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="space-y-12"
        >
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No FAQs found matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  if (onClearSearch) {
                    onClearSearch();
                  } else {
                    setInternalSearchQuery("");
                  }
                }}
                className="mt-4 text-chisoku-cyan-500 hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={zenVariants.staggerChild}
                custom={categoryIndex}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-chisoku-navy">
                  {category.title}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  value={openCategory === category.title ? category.title : undefined}
                  onValueChange={(value) =>
                    setOpenCategory(value === category.title ? category.title : null)
                  }
                  className="space-y-4"
                >
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.title}-${index}`}
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
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}

