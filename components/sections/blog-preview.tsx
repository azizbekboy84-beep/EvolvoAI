"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  readTime: number;
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

// Mock data - will be replaced with real data from API
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "AI Chatbotlar: Biznesingiz Uchun Kelajak",
    excerpt: "Qanday qilib AI chatbotlar mijozlar bilan muloqotni yaxshilaydi va sotuvni oshiradi",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    publishDate: "2025-09-28",
    readTime: 5,
  },
  {
    id: "2",
    title: "Telegram Bot Marketing: To'liq Qo'llanma",
    excerpt: "Telegram botlar orqali marketing avtomatlashtirish va mijozlarni jalb qilish usullari",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
    publishDate: "2025-09-27",
    readTime: 7,
  },
  {
    id: "3",
    title: "Next.js 14 bilan Zamonaviy Web Sayt Yaratish",
    excerpt: "Next.js 14 ning yangi imkoniyatlari va SEO-optimallashtirilgan saytlar yaratish",
    category: "Dasturlash",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    publishDate: "2025-09-26",
    readTime: 6,
  },
];

export default function BlogPreviewSection() {
  return (
    <section id="blog" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">AI-Generated</span> Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Har kuni yangi maqolalar va professional maslahatlar
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/blog/${post.id}`}>
                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString("uz-UZ")}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button variant="gradient" size="lg">
              Barcha Maqolalar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Yoki{" "}
            <Link href="https://t.me/evolvoai" className="text-primary-500 hover:underline">
              Telegram kanalimizga
            </Link>{" "}
            qo&apos;shiling
          </p>
        </motion.div>
      </div>
    </section>
  );
}
