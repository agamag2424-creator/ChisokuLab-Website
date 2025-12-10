"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { CheckCircle, FileCheck, Target, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zenVariants } from "@/lib/animations";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

const comingFeatures = [
  {
    icon: FileCheck,
    title: "AI Readiness Assessment",
    description:
      "Comprehensive evaluation of your organization's AI maturity and readiness for deployment.",
  },
  {
    icon: Target,
    title: "Deployment Strategy",
    description:
      "Custom roadmap for rolling out AI tools across your teams with minimal disruption.",
  },
  {
    icon: Shield,
    title: "Governance Architecture",
    description:
      "Framework for managing AI risks, compliance, and ethical considerations.",
  },
];

export default function ConsultingWaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          source: "consulting-waitlist",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        // Handle error - you could add error state here
        console.error("Waitlist subscription error:", result.error);
        alert(result.error || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      console.error("Waitlist subscription error:", error);
      alert("Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={zenVariants.staggerContainer}
          className="space-y-12 text-center"
        >
          {/* Hero Section */}
          <motion.div variants={zenVariants.staggerChild} className="space-y-6">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Enterprise AI Deployment Advisory
            </h1>
            <p className="text-xl text-gray-300 sm:text-2xl">
              Launching Q1 2025
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Deploy AI tools across your organization without the trial-and-error
              tax. Get expert guidance on readiness, strategy, and governance.
            </p>
          </motion.div>

          {/* What's Coming Section */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="space-y-8 pt-8"
          >
            <h2 className="text-2xl font-semibold text-white">
              What's Coming
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {comingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={zenVariants.staggerChild}
                    custom={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 rounded-lg bg-chisoku-cyan-500/20 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-chisoku-cyan-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md mx-auto"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <CheckCircle className="w-16 h-16 text-chisoku-cyan-500 mx-auto" />
                <h3 className="text-xl font-semibold text-white">
                  You're on the list!
                </h3>
                <p className="text-gray-300">
                  We'll notify you when consulting services launch and send you
                  details about your free consultation.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join the Waitlist
                </h3>
                <p className="text-gray-300 mb-6">
                  Get early access and a free consultation when we launch.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your work email"
                    error={errors.email?.message}
                    className="bg-white/95 backdrop-blur-sm"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={isLoading || isSubmitted}
                  >
                    Join Waitlist for Early Access + Free Consultation
                  </Button>
                </form>
              </>
            )}
          </motion.div>

          {/* Trust Message */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            <p>
              We respect your privacy. Your email will only be used to notify
              you about the consulting launch and your free consultation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

