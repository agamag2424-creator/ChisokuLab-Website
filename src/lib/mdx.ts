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

