"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import { zenVariants } from "@/lib/animations";

interface FAQHeroProps {
  onSearch?: (query: string) => void;
}

export default function FAQHero({ onSearch }: FAQHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={zenVariants.staggerContainer}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={zenVariants.staggerChild}>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Find answers to common questions about our course, consulting
              services, and approach.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div variants={zenVariants.staggerChild} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) {
                    onSearch(e.target.value);
                  }
                }}
                className="pl-12 bg-white/95 backdrop-blur-sm"
              />
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
