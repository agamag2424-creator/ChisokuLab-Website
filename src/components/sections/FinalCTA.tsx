"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Check, Shield, Clock, Infinity } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zenVariants } from "@/lib/animations";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

const trustBadges = [
  { icon: Shield, text: "30-Day Money-Back Guarantee" },
  { icon: Clock, text: "Lifetime Access" },
  { icon: Infinity, text: "Free Updates Forever" },
];

export default function FinalCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    // TODO: Connect to API endpoint
    console.log("Email submitted:", data.email);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-section-mobile md:py-section bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="space-y-12 text-center"
        >
          {/* Headline */}
          <motion.div variants={zenVariants.staggerChild}>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Stop Reacting and Start Leading?
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Join hundreds of managers who've transformed their approach to AI
              and decision-making. Get started today.
            </p>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div variants={zenVariants.staggerChild}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto space-y-4"
            >
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                error={errors.email?.message}
                className="bg-white/95 backdrop-blur-sm"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitted}
              >
                {isSubmitted ? "Subscribed!" : "Get Started Free"}
              </Button>
            </form>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20"
          >
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.text}
                  variants={zenVariants.staggerChild}
                  custom={index}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon className="w-6 h-6 text-white" />
                  <p className="text-sm text-white/90">{badge.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

