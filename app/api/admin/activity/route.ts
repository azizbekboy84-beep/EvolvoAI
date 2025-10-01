import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Activity {
  id: string;
  type: string;
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

    // Get recent contacts
    const recentContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, createdAt: true },
    }).catch(() => []);

    recentContacts.forEach((contact) => {
      activities.push({
        id: `contact-${contact.id}`,
        type: "contact",
        title: "Yangi murojaat",
        description: contact.name,
        time: getTimeAgo(contact.createdAt),
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
