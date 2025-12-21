"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem as FAQItemType } from "@/data/faqData";

interface FAQItemProps {
  item: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`answer-${item.id}`}
        className="group w-full flex items-center justify-between px-5 py-5 text-left transition-colors duration-200 ease-in-out hover:bg-[#F3F4F6] focus:outline-none cursor-pointer min-h-[48px] sm:px-6"
        style={{
          transition: "background-color 200ms ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = "2px solid #00B0D0";
          e.currentTarget.style.outlineOffset = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = "none";
          e.currentTarget.style.outlineOffset = "0";
        }}
      >
        <h3 className="text-lg font-semibold text-[#0A1929] pr-4 sm:text-xl">
          {item.question}
        </h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
            isOpen
              ? "rotate-180 text-[#00B0D0]"
              : "text-[#0A1929] group-hover:text-[#00B0D0]"
          }`}
          style={{
            transition: "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1), color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
          aria-hidden="true"
        />
      </button>
      <div
        id={`answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transition: "max-height 300ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
          <p className="text-base font-normal text-[#374151] leading-relaxed" style={{ lineHeight: "1.6" }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
