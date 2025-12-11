import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow unoptimized images for development
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
