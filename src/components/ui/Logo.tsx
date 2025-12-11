"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: "light" | "dark";
  size?: "header" | "footer" | "mobile";
}

export default function Logo({
  className = "",
  width = 180,
  height = 60,
  priority = false,
  variant = "dark",
  size = "header",
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Size configurations
  // Logo file is 1024x1024px with transparent background (RGBA)
  // Header is h-20 (80px tall) - logo should fit the white ribbon/header height
  // Footer uses container padding (px-4 sm:px-6 lg:px-8) - header matches this
  const sizeConfig = {
    header: {
      mobile: "w-[900px] h-[80px]", // 1300px equivalent for mobile
      tablet: "md:w-[1100px] md:h-[80px]", // 1300px equivalent for tablet
      desktop: "lg:w-[1300px] lg:h-[80px]", // 1300px wide as requested
      intrinsicWidth: 1024, // Actual file width
      intrinsicHeight: 1024, // Actual file height
    },
    footer: {
      mobile: "w-[120px] h-[45px]", // Footer sizes
      desktop: "lg:w-[140px] lg:h-[52px]",
      intrinsicWidth: 1024,
      intrinsicHeight: 1024,
    },
    mobile: {
      mobile: "w-[160px] h-[60px]", // Mobile menu drawer
      desktop: "lg:w-[160px] lg:h-[60px]",
      intrinsicWidth: 1024,
      intrinsicHeight: 1024,
    },
  };

  const config = sizeConfig[size];

  if (imageError) {
    // Fallback to text logo
    return (
      <span
        className={`text-2xl font-bold ${
          variant === "light" ? "text-white" : "text-chisoku-navy"
        } ${className}`}
      >
        ChisokuLab
      </span>
    );
  }

  // Build className with available size properties
  const sizeClasses = [
    config.mobile,
    ("tablet" in config ? config.tablet : ""),
    config.desktop,
  ].filter(Boolean).join(" ");

  return (
    <Image
      src="/logo.png"
      alt="ChisokuLab"
      width={config.intrinsicWidth}
      height={config.intrinsicHeight}
      priority={priority}
      className={`${sizeClasses} object-contain object-center transition-all duration-200 ${className}`}
      onError={() => setImageError(true)}
    />
  );
}
