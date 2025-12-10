"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Lock } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zenVariants } from "@/lib/animations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function FeaturedGuide() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          source: "resources-guide",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsUnlocked(true);
      } else {
        alert(result.error || "Failed to unlock guide. Please try again.");
      }
    } catch (error) {
      alert("Failed to unlock guide. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.fadeInUp}
        >
          <Card variant="elevated" className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-sm font-medium">
                  Featured Free Guide
                </div>
                <h2 className="text-3xl font-bold text-chisoku-navy">
                  The Manager's Guide to AI Tool Selection
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  A comprehensive 20-page guide that helps you choose the right
                  AI tools for your team. Includes decision frameworks, tool
                  evaluation criteria, and real-world case studies.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span>Decision framework for tool selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span>Tool evaluation checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-chisoku-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span>Real-world case studies</span>
                  </li>
                </ul>
              </div>

              {/* Right: Email Gate */}
              <div className="space-y-4">
                {isUnlocked ? (
                  <div className="text-center space-y-4 p-8 border-2 border-dashed border-chisoku-cyan-500 rounded-lg bg-chisoku-cyan-50">
                    <Download className="w-12 h-12 text-chisoku-cyan-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-chisoku-navy">
                      Guide Unlocked!
                    </h3>
                    <p className="text-gray-600">
                      Check your email for the download link. The guide will
                      arrive within a few minutes.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        // In production, this would download the actual PDF
                        alert("Download link sent to your email!");
                      }}
                    >
                      Download Guide
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 border-2 border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-gray-500" />
                      <h3 className="text-lg font-semibold text-chisoku-navy">
                        Unlock Free Guide
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Enter your email to get instant access to this free guide.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email?.message}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Unlocking..." : "Get Free Guide"}
                      </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

