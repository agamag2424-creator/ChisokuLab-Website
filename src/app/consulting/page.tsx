import { generateMetadata as genMeta } from "@/lib/seo";
import ConsultingHero from "@/components/sections/consulting/ConsultingHero";
import WhoItsFor from "@/components/sections/consulting/WhoItsFor";
import ServicesGrid from "@/components/sections/consulting/ServicesGrid";
import WhyChisokuLab from "@/components/sections/consulting/WhyChisokuLab";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = genMeta({
  title: "Enterprise AI Deployment Advisory",
  description:
    "Deploy AI tools across your organization without the trial-and-error tax. Get expert guidance on readiness, strategy, and governance. Launching Q1 2025.",
  path: "/consulting",
});

export default function ConsultingPage() {
  return (
    <>
      <ConsultingHero />
      <WhoItsFor />
      <ServicesGrid />
      <WhyChisokuLab />
      {/* CTA Section */}
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-500">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Deploy AI Without the Trial-and-Error Tax?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free AI Readiness Call to discuss your organization's
            needs and explore how we can help.
          </p>
          <Link href="/consulting/waitlist">
            <Button variant="secondary" size="lg" className="bg-white text-chisoku-cyan-500 hover:bg-gray-100">
              Schedule AI Readiness Call
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

