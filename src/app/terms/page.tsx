import { generateMetadata as genMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = genMeta({
  title: "Terms of Service",
  description:
    "ChisokuLab's Terms of Service. Read our terms and conditions for using our website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-600 to-chisoku-navy-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-200">
              Please read these terms carefully before using our website and services.
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
              Agreement to Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By accessing or using ChisokuLab's website, courses, or services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Use License
            </h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on ChisokuLab's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Course Access and Content
            </h2>
            <p className="text-gray-700 mb-4">
              When you enroll in our course:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>You receive lifetime access to the course materials</li>
              <li>Course content is for your personal use only and may not be shared, distributed, or resold</li>
              <li>We reserve the right to update, modify, or remove course content at any time</li>
              <li>All course materials are protected by copyright and intellectual property laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Refund Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We offer a 30-day money-back guarantee for our course. If you are not satisfied with the course, contact us within 30 days of purchase for a full refund. Refund requests must be submitted via email to{" "}
              <a href="mailto:hello@chisokulab.com" className="text-chisoku-cyan-500 hover:underline">
                hello@chisokulab.com
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              User Accounts
            </h2>
            <p className="text-gray-700 mb-6">
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Prohibited Uses
            </h2>
            <p className="text-gray-700 mb-4">
              You agree not to use our services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-700 mb-6">
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of ChisokuLab or its content suppliers and is protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-700 mb-6">
              The materials on ChisokuLab's website are provided on an "as is" basis. ChisokuLab makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              In no event shall ChisokuLab or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ChisokuLab's website, even if ChisokuLab or a ChisokuLab authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-bold text-chisoku-navy mt-8 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at{" "}
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
