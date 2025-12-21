import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from "@/lib/mdx";
import BlogPostTemplate from "@/components/sections/blog/BlogPostTemplate";
import { generateMetadata as genMeta } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  // Filter out any posts with undefined or empty slugs
  return posts
    .filter((post) => post.slug && post.slug.trim() !== "")
    .map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  if (!slug) {
    return genMeta({
      title: "Post Not Found",
      path: "/blog",
    });
  }

  const post = await getBlogPost(slug);
  if (!post) {
    return genMeta({
      title: "Post Not Found",
      path: `/blog/${slug}`,
    });
  }

  return genMeta({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image || "/og-image.jpg",
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  if (!slug) {
    notFound();
  }

  const post = await getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(
    post.slug,
    post.frontmatter.category
  );

  return (
    <BlogPostTemplate post={post} relatedPosts={relatedPosts} />
  );
}

