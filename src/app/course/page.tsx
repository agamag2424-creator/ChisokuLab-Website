import CourseHero from "@/components/sections/CourseHero";
import CurriculumSection from "@/components/sections/CurriculumSection";
import CourseFormatSection from "@/components/sections/CourseFormatSection";
import PricingSection from "@/components/sections/PricingSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { getAllModules } from "@/lib/mdx";

export const metadata = {
  title: "Course - Calm Amid AI Chaos",
  description:
    "Master AI efficiency and Hindu decision science. 12 comprehensive modules designed to transform your approach to AI and decision-making.",
};

export default function CoursePage() {
  const allModules = getAllModules();
  const efficiencyModules = allModules.filter(
    (m) => m.frontmatter.category === "efficiency"
  );
  const philosophyModules = allModules.filter(
    (m) => m.frontmatter.category === "philosophy"
  );

  return (
    <>
      <CourseHero />
      <CurriculumSection
        efficiencyModules={efficiencyModules}
        philosophyModules={philosophyModules}
      />
      <CourseFormatSection />
      <PricingSection />
      <FinalCTA />
    </>
  );
}

