"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { zenVariants } from "@/lib/animations";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSuccess?: () => void;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  title,
  description,
  onSuccess,
}: EmailGateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
          source: "resources-modal",
        }),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        if (onSuccess) {
          onSuccess();
        }
        // Auto-close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        alert(result.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              variants={zenVariants.fadeInUp}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-chisoku-cyan-50 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-chisoku-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-chisoku-navy mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-600">{description}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get Access"}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

