import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import CoursePreview from "@/components/sections/CoursePreview";
import DecisionCrisisSection from "@/components/sections/DecisionCrisisSection";
import AboutPreview from "@/components/sections/AboutPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Calm Amid AI Chaos",
  description:
    "Master AI efficiency and Hindu decision science. Stop reacting, start leading. Join our comprehensive course combining AI tools with timeless wisdom.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CoursePreview />
      <DecisionCrisisSection />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}
