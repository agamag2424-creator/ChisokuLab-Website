"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

interface PopularArticlesProps {
  posts: BlogPost[];
}

export default function PopularArticles({ posts }: PopularArticlesProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-section-mobile md:py-section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={zenVariants.staggerContainer}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={zenVariants.staggerChild}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl mb-4">
                Popular Articles
              </h2>
              <p className="text-lg text-gray-600">
                Our most-read articles on AI efficiency and decision science.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-chisoku-cyan-500 hover:text-chisoku-cyan-600 font-medium"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={zenVariants.staggerChild}
                custom={index}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card variant="elevated" className="h-full group hover:border-chisoku-cyan-500 transition-colors">
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20 relative">
                        {post.frontmatter.image ? (
                          <Image
                            src={post.frontmatter.image}
                            alt={post.frontmatter.title}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-chisoku-cyan-500/20 border-2 border-chisoku-cyan-500/30" />
                          </div>
                        )}
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-chisoku-cyan-50 text-chisoku-cyan-600 text-sm font-medium">
                        {post.frontmatter.category}
                      </div>
                      <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {post.frontmatter.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.frontmatter.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.frontmatter.readTime} min
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-chisoku-cyan-500 hover:text-chisoku-cyan-600 font-medium"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

