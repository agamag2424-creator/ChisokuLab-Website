import { generateMetadata as genMeta } from "@/lib/seo";
import ServicePageTemplate from "@/components/sections/consulting/ServicePageTemplate";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Target } from "lucide-react";

export const metadata = genMeta({
  title: "LLM Deployment Strategy - Enterprise AI Deployment Advisory",
  description:
    "Custom roadmap for rolling out large language models and AI tools across your teams with minimal disruption. Strategic AI deployment guidance.",
  path: "/consulting/llm-deployment",
});

const serviceData = {
  icon: <Target className="w-10 h-10 text-chisoku-cyan-500" />,
  title: "LLM Deployment Strategy",
  heroDescription:
    "Get a custom roadmap for rolling out large language models and AI tools across your organization with minimal disruption and maximum impact.",
  whatItIs: `A strategic plan for deploying large language models (LLMs) and AI tools across your organization. We work with you to identify the right tools for your specific use cases, create a phased rollout plan, and ensure smooth adoption.

Our strategy considers your team's current workflows, technical infrastructure, and business objectives. We help you choose between building custom solutions, using existing platforms, or a hybrid approach. We also address change management, training needs, and success metrics.`,
  whoItsFor: [
    "Organizations ready to deploy LLMs at scale",
    "Companies with multiple teams that need AI tools",
    "Leaders who want a strategic approach to AI rollout",
    "Organizations that have completed a readiness assessment",
  ],
  deliverables: [
    "Custom LLM Deployment Roadmap",
    "Tool Selection Framework & Recommendations",
    "Phased Rollout Plan (3-6-12 month timeline)",
    "Change Management Strategy",
    "Training & Enablement Plan",
    "Success Metrics & KPIs",
    "Risk Mitigation Plan",
    "Ongoing support during first 3 months",
  ],
  timeline: "6-8 weeks",
  investment: "Starting at ₹4,00,000",
};

export default function LLMDeploymentPage() {
  return (
    <ServicePageTemplate {...serviceData}>
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl mb-6">
            Ready to Deploy LLMs Strategically?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your deployment needs
            and explore how we can help.
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

