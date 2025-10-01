import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Activity {
  id: string;
  type: "blog" | "project" | "order" | "customer";
  title: string;
  description: string;
  time: string;
}

export async function GET() {
  try {
    const activities: Activity[] = [];

    // Get recent blog posts
    const recentPosts = await prisma.blogPost.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    });

    recentPosts.forEach((post) => {
      activities.push({
        id: `blog-${post.id}`,
        type: "blog",
        title: "Yangi blog post",
        description: post.title,
        time: getTimeAgo(post.createdAt),
      });
    });

    // Get recent projects
    const recentProjects = await prisma.project.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    });

    recentProjects.forEach((project) => {
      activities.push({
        id: `project-${project.id}`,
        type: "project",
        title: "Yangi loyiha",
        description: project.title,
        time: getTimeAgo(project.createdAt),
      });
    });

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { id: true, serviceType: true, createdAt: true },
    });

    recentOrders.forEach((order) => {
      activities.push({
        id: `order-${order.id}`,
        type: "order",
        title: "Yangi buyurtma",
        description: order.serviceType,
        time: getTimeAgo(order.createdAt),
      });
    });

    return NextResponse.json({
      activities: activities.slice(0, 10),
    });
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} soniya oldin`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} daqiqa oldin`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} soat oldin`;
  return `${Math.floor(seconds / 86400)} kun oldin`;
}
