import { generateMetadata as genMeta } from "@/lib/seo";
import { getAllBlogPosts, getBlogCategories } from "@/lib/mdx";
import BlogIndex from "@/components/sections/blog/BlogIndex";

export const metadata = genMeta({
  title: "Blog - AI Efficiency & Decision Science",
  description:
    "Insights on AI tools, decision science, and Hindu philosophy. Learn how to make better decisions in the age of AI.",
  path: "/blog",
});

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();

  return <BlogIndex posts={allPosts} categories={categories} />;
}

