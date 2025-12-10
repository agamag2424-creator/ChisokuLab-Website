import { generateMetadata as genMeta } from "@/lib/seo";
import ServicePageTemplate from "@/components/sections/consulting/ServicePageTemplate";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Headphones } from "lucide-react";

export const metadata = genMeta({
  title: "Advisory Retainer - Enterprise AI Deployment Advisory",
  description:
    "Ongoing support and guidance as you navigate AI adoption. Get expert advice when you need it most with our advisory retainer service.",
  path: "/consulting/advisory-retainer",
});

const serviceData = {
  icon: <Headphones className="w-10 h-10 text-chisoku-cyan-500" />,
  title: "Advisory Retainer",
  heroDescription:
    "Get ongoing support and expert guidance as you navigate AI adoption. Access our expertise when you need it most.",
  whatItIs: `A retainer-based advisory service that provides ongoing support and guidance as you navigate AI adoption. Instead of one-time engagements, you get continuous access to our expertise.

We serve as your strategic AI advisor, helping you make decisions about new tools, troubleshoot implementation challenges, and stay updated on AI developments relevant to your organization. This is ideal for organizations that want expert guidance without committing to large project engagements.`,
  whoItsFor: [
    "Organizations actively deploying AI tools",
    "Companies that need ongoing strategic guidance",
    "Leaders who want expert advice on-demand",
    "Organizations between major AI projects",
  ],
  deliverables: [
    "Monthly Strategy Sessions (2 hours)",
    "Unlimited Email Support",
    "Tool Evaluation & Recommendations",
    "Quick Decision Support (48-hour turnaround)",
    "Quarterly AI Readiness Reviews",
    "Access to AI Best Practices Library",
    "Priority Support for Urgent Questions",
    "Quarterly Executive Briefings",
  ],
  timeline: "Ongoing (monthly retainer)",
  investment: "Starting at ₹1,50,000/month",
};

export default function AdvisoryRetainerPage() {
  return (
    <ServicePageTemplate {...serviceData}>
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl mb-6">
            Ready for Ongoing AI Advisory Support?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your needs and explore
            how our retainer service can help.
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

