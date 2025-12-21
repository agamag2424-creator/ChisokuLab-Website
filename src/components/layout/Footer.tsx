"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

const footerNavigation = {
  main: [
    { name: "Course", href: "/course" },
    { name: "Enterprise Solutions", href: "/consulting" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

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

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "footer-newsletter",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-chisoku-navy-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo Column */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-chisoku-cyan-500 transition-colors inline-block" 
              aria-label="ChisokuLab Home"
            >
              ChisokuLab
            </Link>
            <p className="text-sm text-gray-300 max-w-xs">
              Evidence-based decision frameworks for modern leaders. make confident
              choices in the age of artificial intelligence.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerNavigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-chisoku-cyan-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-300">
              Get insights on AI efficiency and decision science delivered to
              your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSubmitted}
                className="flex-1 rounded-lg border border-gray-600 bg-chisoku-navy-800 px-4 py-2 text-white placeholder-gray-400 focus:border-chisoku-cyan-500 focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="rounded-lg bg-chisoku-cyan-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-chisoku-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting
                  ? "Subscribing..."
                  : isSubmitted
                  ? "Subscribed!"
                  : "Subscribe"}
              </button>
            </form>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            {isSubmitted && !error && (
              <p className="text-sm text-chisoku-cyan-500" role="status">
                Thank you for subscribing!
              </p>
            )}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-chisoku-cyan-500 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ChisokuLab. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-chisoku-cyan-500 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

