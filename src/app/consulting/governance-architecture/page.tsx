import { generateMetadata as genMeta } from "@/lib/seo";
import ServicePageTemplate from "@/components/sections/consulting/ServicePageTemplate";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = genMeta({
  title: "Governance Architecture - Enterprise AI Deployment Advisory",
  description:
    "Framework for managing AI risks, compliance, and ethical considerations. Ensure responsible AI deployment with proper governance.",
  path: "/consulting/governance-architecture",
});

const serviceData = {
  icon: <Shield className="w-10 h-10 text-chisoku-cyan-500" />,
  title: "Governance Architecture",
  heroDescription:
    "Build a comprehensive framework for managing AI risks, ensuring compliance, and maintaining ethical standards in your AI deployment.",
  whatItIs: `A complete governance framework for managing AI risks, compliance, and ethical considerations. We help you establish policies, procedures, and controls to ensure responsible AI deployment.

Our governance architecture covers data privacy, model explainability, bias detection, security protocols, and compliance requirements. We create clear guidelines for AI tool usage, establish approval workflows, and set up monitoring systems. We also help you navigate regulatory requirements and industry standards.`,
  whoItsFor: [
    "Organizations in regulated industries",
    "Companies concerned about AI risks and compliance",
    "Leaders who need to ensure ethical AI usage",
    "Organizations deploying AI at scale",
  ],
  deliverables: [
    "AI Governance Framework Document",
    "Risk Assessment & Mitigation Plan",
    "Compliance Checklist & Procedures",
    "Ethical AI Guidelines",
    "Data Privacy & Security Protocols",
    "Model Monitoring & Auditing Framework",
    "Approval Workflows & Decision Trees",
    "Training Materials for Teams",
  ],
  timeline: "6-8 weeks",
  investment: "Starting at ₹3,50,000",
};

export default function GovernanceArchitecturePage() {
  return (
    <ServicePageTemplate {...serviceData}>
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl mb-6">
            Ready to Build Your AI Governance Framework?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your governance needs
            and learn how we can help.
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

