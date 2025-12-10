"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-chisoku-cyan-500 text-white hover:bg-chisoku-cyan-600 shadow-md hover:shadow-lg hover:shadow-chisoku-cyan-500/50",
      secondary:
        "border-2 border-chisoku-cyan-500 text-chisoku-cyan-500 bg-transparent hover:bg-chisoku-cyan-500 hover:text-white",
      ghost:
        "text-chisoku-navy hover:bg-chisoku-cyan-50 hover:text-chisoku-cyan-500",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
    };

    const buttonClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    if (disabled || isLoading) {
      return (
        <button
          ref={ref}
          className={buttonClassName}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            children
          )}
        </button>
      );
    }

    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <button
          ref={ref}
          className={buttonClassName}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            children
          )}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";

export default Button;

