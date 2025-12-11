"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Clock, Twitter, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot field - should be empty
  website: z.string().max(0, "Spam detected").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/chisokulab",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/chisokulab",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/chisokulab",
    icon: Github,
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-600 to-chisoku-navy-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200">
              Have questions about our course or consulting services? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-section-mobile md:py-section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form - Left 60% */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-chisoku-navy mb-6">
                  Send us a Message
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-green-800">
                      Thank you! Your message has been sent. We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    {...register("website")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>

                  <Input
                    label="Subject"
                    type="text"
                    placeholder="What's this about?"
                    {...register("subject")}
                    error={errors.subject?.message}
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    {...register("message")}
                    error={errors.message?.message}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    disabled={isLoading || isSubmitted}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info - Right 40% */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-chisoku-cyan-50 to-chisoku-cyan-100 rounded-2xl p-8 h-full">
                <h2 className="text-2xl font-bold text-chisoku-navy mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-chisoku-cyan-500 rounded-lg p-3">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-chisoku-navy mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@chisokulab.com"
                        className="text-chisoku-navy-700 hover:text-chisoku-cyan-600 transition-colors"
                      >
                        hello@chisokulab.com
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-chisoku-cyan-500 rounded-lg p-3">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-chisoku-navy mb-1">
                        Response Time
                      </h3>
                      <p className="text-chisoku-navy-700">
                        We typically respond within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4">
                    <h3 className="font-semibold text-chisoku-navy mb-4">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-lg p-3 text-chisoku-navy hover:text-chisoku-cyan-500 hover:bg-chisoku-cyan-50 transition-all duration-300 shadow-sm hover:shadow-md"
                            aria-label={item.name}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
