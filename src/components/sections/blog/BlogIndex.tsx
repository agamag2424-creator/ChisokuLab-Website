"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";
import type { BlogPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface BlogIndexProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.frontmatter.category === selectedCategory);

  // Get featured post (first post)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = featuredPost
    ? filteredPosts.slice(1)
    : filteredPosts;

  // Pagination
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-chisoku-navy-500 via-chisoku-navy-500 to-chisoku-navy-800 py-section-mobile md:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={zenVariants.fadeInUp}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Insights on AI efficiency, decision science, and Hindu philosophy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-chisoku-cyan-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-chisoku-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-section-mobile md:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No blog posts found in this category.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && currentPage === 1 && (
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={zenVariants.fadeInUp}
                  className="mb-12"
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Card variant="elevated" className="group hover:border-chisoku-cyan-500 transition-colors">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20 relative">
                          {featuredPost.frontmatter.image ? (
                            <Image
                              src={featuredPost.frontmatter.image}
                              alt={featuredPost.frontmatter.title}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-chisoku-cyan-500/20 border-4 border-chisoku-cyan-500/30 mb-4" />
                                <p className="text-gray-600 font-medium">
                                  Featured Image
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="inline-block px-3 py-1 rounded-full bg-chisoku-cyan-50 text-chisoku-cyan-600 text-sm font-medium mb-4 w-fit">
                            {featuredPost.frontmatter.category}
                          </div>
                          <h2 className="text-3xl font-bold text-chisoku-navy mb-4 group-hover:text-chisoku-cyan-500 transition-colors">
                            {featuredPost.frontmatter.title}
                          </h2>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {featuredPost.frontmatter.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(featuredPost.frontmatter.date)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {featuredPost.frontmatter.readTime} min read
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              {paginatedPosts.length > 0 && (
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={zenVariants.staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {paginatedPosts.map((post, index) => (
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
                                  <div className="text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-chisoku-cyan-500/20 border-2 border-chisoku-cyan-500/30 mb-2" />
                                    <p className="text-gray-600 text-xs">Image</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="inline-block px-3 py-1 rounded-full bg-chisoku-cyan-50 text-chisoku-cyan-600 text-sm font-medium">
                              {post.frontmatter.category}
                            </div>
                            <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                              {post.frontmatter.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
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
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

