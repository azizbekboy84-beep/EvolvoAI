"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  readTime: number;
  views: number;
}

const categories = [
  "Barcha",
  "AI",
  "Biznes",
  "Texnologiya",
  "Marketing",
  "Dasturlash",
  "Startaplar",
  "E-commerce",
];

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Barcha");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPosts(0, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchPosts = async (currentOffset: number, reset: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory,
        limit: "12",
        offset: currentOffset.toString(),
      });

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (reset) {
        setPosts(data.posts || []);
      } else {
        setPosts((prev) => [...prev, ...(data.posts || [])]);
      }

      setHasMore(data.hasMore || false);
      setOffset(currentOffset + 12);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchPosts(offset);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOffset(0);
  };

  return (
    <section className="py-24 min-h-screen" style={{ background: "linear-gradient(180deg, #0A0E27 0%, #1A1F3A 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
            <span style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI-Generated</span> Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Har kuni yangi maqolalar va professional maslahatlar
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
              style={selectedCategory === category ? {
                background: "linear-gradient(135deg, #FF0080, #7928CA)",
              } : {
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && posts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4 text-white">Hozircha maqolalar yo&apos;q</h3>
            <p className="text-gray-300">
              Tez orada yangi maqolalar paydo bo&apos;ladi!
            </p>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div 
                      className="h-full overflow-hidden rounded-2xl group transition-all duration-300 hover:scale-105"
                      style={{
                        background: "rgba(26, 31, 58, 0.5)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white group-hover:text-[#FF0080] transition-colors">
                          {post.title}
                        </h3>
                        {!post.slug && <p className="text-red-500 text-xs">⚠️ Slug yo'q: {post.id}</p>}
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(post.publishDate).toLocaleDateString("uz-UZ")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="inline mr-2 w-5 h-5 animate-spin" />
                      Yuklanmoqda...
                    </>
                  ) : (
                    "Ko'proq yuklash"
                  )}
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Hozircha maqolalar mavjud emas
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
