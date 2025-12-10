"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      "w-full rounded-lg border px-4 py-3 text-chisoku-navy placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2";

    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : success
      ? "border-chisoku-cyan-500 focus:border-chisoku-cyan-500 focus:ring-chisoku-cyan-500/20"
      : "border-gray-300 focus:border-chisoku-cyan-500 focus:ring-chisoku-cyan-500/20";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-chisoku-navy"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
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

Input.displayName = "Input";

export default Input;

