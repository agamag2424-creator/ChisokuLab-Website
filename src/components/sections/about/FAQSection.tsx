"use client";

import { useState } from "react";
import { getAllFAQItems } from "@/data/faqData";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  const faqItems = getAllFAQItems();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="bg-[#F8FAFB] py-[60px] md:py-[80px]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0A1929] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-normal text-[#6B7280]">
            Everything you need to know about our approach to decision-making in the AI era.
          </p>
        </div>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
