import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get current counts for existing tables only
    const blogPosts = await prisma.blogPost.count();
    const contacts = await prisma.contact.count().catch(() => 0);
    const subscribers = await prisma.subscriber.count().catch(() => 0);

    // Get last month's date
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Get last month counts
    const lastMonthBlogPosts = await prisma.blogPost.count({ 
      where: { createdAt: { lt: lastMonth } } 
    });
    const lastMonthContacts = await prisma.contact.count({ 
      where: { createdAt: { lt: lastMonth } } 
    }).catch(() => 0);

    // Calculate percentage changes
    const calculateChange = (current: number, last: number) => {
      if (last === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - last) / last) * 100);
    };

    return NextResponse.json({
      blogPosts: {
        total: blogPosts,
        change: calculateChange(blogPosts, lastMonthBlogPosts),
      },
      contacts: {
        total: contacts,
        change: calculateChange(contacts, lastMonthContacts),
      },
      subscribers: {
        total: subscribers,
        change: 0,
      },
      totalViews: {
        total: await prisma.blogPost.aggregate({
          _sum: { views: true }
        }).then(res => res._sum.views || 0),
        change: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
