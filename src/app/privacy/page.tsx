import { generateMetadata as genMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = genMeta({
  title: "Privacy Policy",
  description:
    "ChisokuLab's Privacy Policy. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-600 to-chisoku-navy-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-section-mobile md:py-section bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              ChisokuLab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We may collect information about you in various ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and other contact information you provide when subscribing to our newsletter, contacting us, or enrolling in our course.</li>
              <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you newsletters, updates, and marketing communications (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process transactions and send related information</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700 mb-6">
              We use third-party services to help us operate our website and deliver services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>ConvertKit:</strong> For email newsletter management and marketing automation</li>
              <li><strong>Resend:</strong> For transactional emails and contact form submissions</li>
              <li><strong>Vercel:</strong> For website hosting and analytics</li>
            </ul>
            <p className="text-gray-700 mb-6">
              These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Unsubscribe from marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Cookies
            </h2>
            <p className="text-gray-700 mb-6">
              We use cookies to enhance your experience on our website. You can set your browser to refuse cookies or alert you when cookies are being sent. However, some parts of our website may not function properly if you disable cookies.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@chisokulab.com" className="text-chisoku-cyan-500 hover:underline">
                hello@chisokulab.com
              </a>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-chisoku-cyan-500 hover:underline">
                contact page
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
