import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function POST() {
  try {
    const posts = await prisma.blogPost.findMany();

    const updates = [];

    for (const post of posts) {
      const newSlug = generateSlug(post.title);
      
      if (post.slug !== newSlug) {
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { slug: newSlug },
        });
        
        updates.push({
          title: post.title,
          oldSlug: post.slug,
          newSlug: newSlug,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updates.length} ta slug yangilandi`,
      updates,
    });
  } catch (error) {
    console.error("Error updating slugs:", error);
    return NextResponse.json(
      { error: "Failed to update slugs" },
      { status: 500 }
    );
  }
}
