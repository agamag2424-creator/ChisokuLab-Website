import { generateMetadata as genMeta } from "@/lib/seo";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = genMeta({
  title: "About ChisokuLab",
  description:
    "Learn about ChisokuLab's mission to teach evidence-based decision frameworks for modern managers. Discover how we help leaders make confident choices in the age of AI.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutStory />
      {/* CTA Section */}
      <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl mb-6">
            Ready to Transform Your Approach?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive course that teaches evidence-based decision
            frameworks for the AI era.
          </p>
          <Link href="/course">
            <Button variant="primary" size="lg">
              Explore the Course
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

