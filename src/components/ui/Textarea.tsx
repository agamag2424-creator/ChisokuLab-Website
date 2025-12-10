"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      "w-full rounded-lg border px-4 py-3 text-chisoku-navy placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 resize-none";

    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : success
      ? "border-chisoku-cyan-500 focus:border-chisoku-cyan-500 focus:ring-chisoku-cyan-500/20"
      : "border-gray-300 focus:border-chisoku-cyan-500 focus:ring-chisoku-cyan-500/20";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-chisoku-navy"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(baseStyles, stateStyles, className)}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {success && !error && (
          <p className="mt-1 text-sm text-chisoku-cyan-500" role="status">
            Looks good!
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
