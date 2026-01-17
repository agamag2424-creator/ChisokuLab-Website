"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { getAllTestimonials, type Testimonial } from "@/data/testimonials";
import { zenVariants } from "@/lib/animations";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const INITIAL_DISPLAY_COUNT = 3;

export default function TestimonialsSection() {
  const allTestimonials = getAllTestimonials();
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedTestimonials = allTestimonials.slice(0, displayCount);
  const hasMore = allTestimonials.length > displayCount;

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (displayedTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayedTestimonials.length]);

  const handleLoadMore = () => {
    setDisplayCount(allTestimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderAvatar = (testimonial: Testimonial) => {
    if (testimonial.avatar) {
      return (
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-16 h-16 rounded-full object-cover"
        />
      );
    }
    // Placeholder avatar with initials
    const initials = testimonial.author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-chisoku-cyan-500 to-chisoku-cyan-600 flex items-center justify-center text-white font-semibold text-lg">
        {initials}
      </div>
    );
  };

  return (
    <section className="py-section-mobile md:py-section bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-600 to-chisoku-navy-800 text-white relative overflow-hidden">
      {/* Decorative quotation marks */}
      <div className="absolute top-20 left-10 md:left-20 opacity-20 pointer-events-none">
        <Quote className="h-32 w-32 md:h-48 md:w-48 text-chisoku-cyan-500" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 opacity-20 pointer-events-none rotate-180">
        <Quote className="h-32 w-32 md:h-48 md:w-48 text-chisoku-cyan-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={zenVariants.staggerChild}
            className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            variants={zenVariants.staggerChild}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Built for managers navigating AI adoption and decision-making challenges
          </motion.p>
        </motion.div>

        {/* Testimonials Grid/Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <AnimatePresence mode="wait">
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={zenVariants.fadeInUp}
                custom={index}
              >
                <Card variant="elevated" className="h-full bg-white/95 backdrop-blur-sm">
                  <div className="flex flex-col h-full">
                    {/* Rating */}
                    <div className="mb-4">{renderStars(testimonial.rating)}</div>

                    {/* Quote */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 font-serif flex-grow">
                      "{testimonial.quote}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      {renderAvatar(testimonial)}
                      <div>
                        <p className="font-semibold text-chisoku-navy">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={zenVariants.fadeInUp}
            className="text-center"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLoadMore}
              className="bg-white text-chisoku-navy hover:bg-chisoku-cyan-50"
            >
              Load More Testimonials
            </Button>
          </motion.div>
        )}

        {/* Dots Navigation (for carousel view) */}
        {displayedTestimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-chisoku-cyan-500"
                    : "w-2 bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
