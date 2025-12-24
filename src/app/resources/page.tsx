import { generateMetadata as genMeta } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/mdx";
import ResourcesHero from "@/components/sections/resources/ResourcesHero";
import FeaturedGuide from "@/components/sections/resources/FeaturedGuide";
import PromptAmplifier from "@/components/sections/resources/PromptAmplifier";
import LatestVideos from "@/components/sections/resources/LatestVideos";
import PopularArticles from "@/components/sections/resources/PopularArticles";
import FreeTemplates from "@/components/sections/resources/FreeTemplates";

export const metadata = genMeta({
  title: "Resources - Free Guides, Templates & Articles",
  description:
    "Access free guides, templates, videos, and articles on AI efficiency and decision science. Start learning now.",
  path: "/resources",
});

export default function ResourcesPage() {
  const blogPosts = getAllBlogPosts();
  const popularPosts = blogPosts.slice(0, 6); // Top 6 posts

  return (
    <div>
      <ResourcesHero />
      <FeaturedGuide />
      <PromptAmplifier />
      <LatestVideos />
      <PopularArticles posts={popularPosts} />
      <FreeTemplates />
    </div>
  );
}

