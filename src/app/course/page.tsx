import CourseHero from "@/components/sections/CourseHero";
import CurriculumSection from "@/components/sections/CurriculumSection";
import CourseFormatSection from "@/components/sections/CourseFormatSection";
import PricingSection from "@/components/sections/PricingSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Course - Calm Amid AI Chaos",
  description:
    "Evidence-based decision frameworks for modern managers. 7 focused modules teaching practical decision-making skills for AI-era leadership. Enroll now.",
  path: "/course",
});

export default function CoursePage() {
  return (
    <>
      <CourseHero />
      <CurriculumSection />
      <CourseFormatSection />
      <PricingSection />
      <FinalCTA />
    </>
  );
}

