import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = category && category !== "Barcha" 
      ? { category, status: "PUBLISHED" as const }
      : { status: "PUBLISHED" as const };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishDate: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const post = await prisma.blogPost.create({
      data: {
        category: body.category,
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        keywords: body.keywords,
        imageUrl: body.imageUrl,
        author: body.author || "EvolvoAI Team",
        readTime: body.readTime,
        status: body.status || "DRAFT",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
