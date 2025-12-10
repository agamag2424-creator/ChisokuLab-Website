import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content/curriculum");

export interface ModuleFrontmatter {
  moduleNumber: number;
  title: string;
  category: "efficiency" | "philosophy";
  duration: string;
}

export interface Module {
  slug: string;
  frontmatter: ModuleFrontmatter;
  content: string;
  htmlContent?: string;
}

/**
 * Get all modules from the curriculum directory
 */
export function getAllModules(): Module[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const modules = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as ModuleFrontmatter,
        content,
      };
    })
    .sort((a, b) => a.frontmatter.moduleNumber - b.frontmatter.moduleNumber);

  return modules;
}

/**
 * Get a single module by slug
 */
export async function getModule(slug: string): Promise<Module | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: data as ModuleFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading module ${slug}:`, error);
    return null;
  }
}

/**
 * Get modules by category
 */
export function getModulesByCategory(
  category: "efficiency" | "philosophy"
): Module[] {
  return getAllModules().filter(
    (module) => module.frontmatter.category === category
  );
}

// Blog utilities
const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: "AI Tools" | "Decision Science" | "Philosophy" | "Enterprise";
  author: string;
  readTime: number;
  featured?: boolean;
  image?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  htmlContent?: string;
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as BlogPostFrontmatter,
        content,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Newest first
    });

  return posts;
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: data as BlogPostFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get unique blog categories
 */
export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    categories.add(post.frontmatter.category);
  });
  return Array.from(categories).sort();
}

/**
 * Get related posts (3 posts from same category, excluding current post)
 */
export function getRelatedPosts(
  currentSlug: string,
  category: string
): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter(
      (post) =>
        post.slug !== currentSlug && post.frontmatter.category === category
    )
    .slice(0, 3);

  // If not enough posts in same category, fill with other posts
  if (related.length < 3) {
    const otherPosts = allPosts
      .filter(
        (post) =>
          post.slug !== currentSlug &&
          post.frontmatter.category !== category
      )
      .slice(0, 3 - related.length);
    return [...related, ...otherPosts].slice(0, 3);
  }

  return related;
}

