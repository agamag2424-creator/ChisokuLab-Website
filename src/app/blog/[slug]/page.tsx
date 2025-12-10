import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from "@/lib/mdx";
import BlogPostTemplate from "@/components/sections/blog/BlogPostTemplate";
import { generateMetadata as genMeta } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return genMeta({
      title: "Post Not Found",
      path: `/blog/${params.slug}`,
    });
  }

  return genMeta({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image || "/og-image.jpg",
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
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

