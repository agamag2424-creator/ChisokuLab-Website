import { generateMetadata as genMeta } from "@/lib/seo";
import ServicePageTemplate from "@/components/sections/consulting/ServicePageTemplate";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FileCheck } from "lucide-react";

export const metadata = genMeta({
  title: "AI Readiness Assessment - Enterprise AI Deployment Advisory",
  description:
    "Comprehensive evaluation of your organization's AI maturity, current tool usage, and readiness for deployment. Get expert guidance on your AI journey.",
  path: "/consulting/readiness-assessment",
});

const serviceData = {
  icon: <FileCheck className="w-10 h-10 text-chisoku-cyan-500" />,
  title: "AI Readiness Assessment",
  heroDescription:
    "Understand where your organization stands on the AI maturity curve and identify the best path forward for strategic AI deployment.",
  whatItIs: `A comprehensive evaluation of your organization's current AI capabilities, tool usage, team readiness, and infrastructure. We assess your technical maturity, organizational culture, and strategic alignment to provide a clear picture of your AI readiness.

Our assessment goes beyond a simple checklist. We examine how AI tools are currently being used (or not used), identify gaps in knowledge and infrastructure, and evaluate your team's capacity for AI adoption. We also assess your data readiness, security considerations, and compliance requirements.`,
  whoItsFor: [
    "Organizations considering their first major AI deployment",
    "Companies that have tried AI tools but struggled with adoption",
    "Leaders who want to understand their current AI maturity level",
    "Teams preparing for a strategic AI transformation initiative",
  ],
  deliverables: [
    "Comprehensive AI Readiness Report (30-40 pages)",
    "Current State Analysis with maturity scoring",
    "Gap Analysis identifying key areas for improvement",
    "Prioritized Roadmap for AI adoption",
    "Team Readiness Assessment",
    "Infrastructure & Security Evaluation",
    "90-minute presentation and Q&A session",
  ],
  timeline: "4-6 weeks",
  investment: "Starting at ₹2,50,000",
};

export default function ReadinessAssessmentPage() {
  return (
    <ServicePageTemplate {...serviceData}>
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl mb-6">
            Ready to Assess Your AI Readiness?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your organization's
            needs and learn how our assessment can help.
          </p>
          <Link href="/consulting/waitlist">
            <Button variant="primary" size="lg">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </ServicePageTemplate>
  );
}

