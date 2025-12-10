"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import { zenVariants } from "@/lib/animations";

const videos = [
  {
    title: "Introduction to Chisoku: Calm Decision-Making",
    description:
      "Learn the fundamentals of Chisoku and how to apply calm decision-making principles to your work.",
    youtubeId: "placeholder-1",
    duration: "12:34",
  },
  {
    title: "5 AI Tools Every Manager Needs",
    description:
      "A practical overview of essential AI tools for managers, plus how to choose which ones to adopt.",
    youtubeId: "placeholder-2",
    duration: "15:20",
  },
  {
    title: "The Bhagavad Gita and Modern Leadership",
    description:
      "Exploring how ancient wisdom from the Bhagavad Gita applies to leadership in the age of AI.",
    youtubeId: "placeholder-3",
    duration: "18:45",
  },
];

export default function LatestVideos() {
  return (
    <section className="py-section-mobile md:py-section bg-chisoku-cyan-50">
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-chisoku-navy sm:text-4xl lg:text-5xl mb-4">
              Latest Videos
            </h2>
            <p className="text-lg text-gray-600">
              Watch our latest videos on AI efficiency, decision science, and
              leadership.
            </p>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.youtubeId}
                variants={zenVariants.staggerChild}
                custom={index}
              >
                <Card variant="elevated" className="h-full group hover:border-chisoku-cyan-500 transition-colors">
                  <div className="space-y-4">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video rounded-lg bg-gradient-to-br from-chisoku-cyan-500/20 to-chisoku-cyan-900/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                          <Play className="w-8 h-8 text-chisoku-cyan-500 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-chisoku-navy group-hover:text-chisoku-cyan-500 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {video.description}
                    </p>
                    <a
                      href={`https://youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-chisoku-cyan-500 hover:underline"
                    >
                      Watch on YouTube
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

