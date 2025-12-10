import { HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "rounded-xl bg-white transition-all duration-300 p-8 md:p-12";

    const variants = {
      default: "shadow-md",
      elevated:
        "shadow-md hover:shadow-xl hover:-translate-y-1 hover:shadow-chisoku-cyan-500/20",
    };

    const cardContent = (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );

    if (variant === "elevated") {
      return (
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="block"
        >
          {cardContent}
        </motion.div>
      );
    }

    return cardContent;
  }
);

Card.displayName = "Card";

export default Card;

