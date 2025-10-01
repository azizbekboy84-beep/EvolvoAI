import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://evolvoai.uz";

  // Get all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
