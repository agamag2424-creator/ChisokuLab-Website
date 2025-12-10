import { getAllBlogPosts } from "@/lib/mdx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chisokulab.com";

export async function GET() {
  const posts = getAllBlogPosts().slice(0, 20); // Latest 20 posts

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const postDate = new Date(post.frontmatter.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${postDate}</pubDate>
      <category>${post.frontmatter.category}</category>
      <author>${post.frontmatter.author}</author>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ChisokuLab Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Insights on AI efficiency, decision science, and Hindu philosophy</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

