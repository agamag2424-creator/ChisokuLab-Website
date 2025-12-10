"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Twitter, Linkedin, Copy, Check } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostTemplate({
  post,
  relatedPosts,
}: BlogPostTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    // Extract headings from HTML content for table of contents
    if (post.htmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.htmlContent, "text/html");
      const headingElements = doc.querySelectorAll("h2, h3");
      const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];

      headingElements.forEach((heading) => {
        const id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "";
        heading.id = id;
        extractedHeadings.push({
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        });
      });

      setHeadings(extractedHeadings);
    }
  }, [post.htmlContent]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(
    `${post.frontmatter.title} - ChisokuLab`
  );

  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-chisoku-cyan-500/20 border-4 border-chisoku-cyan-500/30 mb-4" />
            <p className="text-gray-600 font-medium">Hero Image</p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-section-mobile md:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-chisoku-cyan-50 text-chisoku-cyan-600 text-sm font-medium">
                  {post.frontmatter.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-chisoku-navy sm:text-5xl mb-6">
                {post.frontmatter.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(post.frontmatter.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.frontmatter.readTime} min read
                </div>
                <div className="text-sm">By {post.frontmatter.author}</div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  aria-label="Copy link"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>

              {/* Body Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-chisoku-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-chisoku-cyan-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-chisoku-navy prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
              />
            </article>

            {/* Sidebar - Table of Contents (Desktop) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <h3 className="text-lg font-semibold text-chisoku-navy mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`block text-sm text-gray-600 hover:text-chisoku-cyan-500 transition-colors ${
                            heading.level === 3 ? "pl-4" : ""
                          }`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </Card>
                </div>
              </aside>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-chisoku-navy mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card variant="elevated" className="h-full group hover:border-chisoku-cyan-500 transition-colors">
                      <div className="space-y-4">
                        <div className="aspect-video rounded-lg bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-chisoku-cyan-500/20 border-2 border-chisoku-cyan-500/30" />
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-chisoku-cyan-50 text-chisoku-cyan-600 text-sm font-medium">
                          {relatedPost.frontmatter.category}
                        </div>
                        <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                          {relatedPost.frontmatter.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedPost.frontmatter.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}

