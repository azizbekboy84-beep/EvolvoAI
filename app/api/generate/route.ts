import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost, categories } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { generateSlug, calculateReadTime } from "@/lib/utils";
import { sendToChannel } from "@/lib/telegram";
import { fetchCategoryImage, trackImageDownload } from "@/lib/unsplash";

export async function POST(request: NextRequest) {
  try {
    // Simple auth check - in production, use proper authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const category = body.category || categories[Math.floor(Math.random() * categories.length)];

    console.log(`Generating blog post for category: ${category}`);

    // Generate content using Gemini
    const generatedContent = await generateBlogPost(category);

    // Generate slug
    const slug = generateSlug(generatedContent.title);

    // Calculate read time
    const readTime = calculateReadTime(generatedContent.content);

    // Fetch unique image from Unsplash
    const image = await fetchCategoryImage(category);
    console.log(`Fetched image by ${image.author}`);

    // Save to database
    const post = await prisma.blogPost.create({
      data: {
        category,
        title: generatedContent.title,
        slug,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        seoTitle: generatedContent.seoTitle,
        seoDescription: generatedContent.seoDescription,
        keywords: generatedContent.keywords,
        imageUrl: image.url,
        readTime,
        status: "PUBLISHED",
      },
    });

    // Track image download (Unsplash API requirement)
    if (image.downloadUrl) {
      await trackImageDownload(image.downloadUrl);
    }

    // Send to Telegram channel
    try {
      await sendToChannel({
        title: post.title,
        content: post.excerpt,
        category: post.category,
        link: `/blog/${post.id}`,
        imageUrl: post.imageUrl,
      });
    } catch (telegramError) {
      console.error("Error sending to Telegram:", telegramError);
      // Don't fail the whole request if Telegram fails
    }

    console.log(`Successfully generated post: ${post.id}`);

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        category: post.category,
        slug: post.slug,
      },
    });
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Endpoint to generate multiple posts at once
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = [];
    
    // Generate one post for each category
    for (const category of categories) {
      try {
        console.log(`Generating post for ${category}...`);
        
        const generatedContent = await generateBlogPost(category);
        const slug = generateSlug(generatedContent.title);
        const readTime = calculateReadTime(generatedContent.content);
        
        // Fetch unique image from Unsplash
        const image = await fetchCategoryImage(category);

        const post = await prisma.blogPost.create({
          data: {
            category,
            title: generatedContent.title,
            slug,
            excerpt: generatedContent.excerpt,
            content: generatedContent.content,
            seoTitle: generatedContent.seoTitle,
            seoDescription: generatedContent.seoDescription,
            keywords: generatedContent.keywords,
            imageUrl: image.url,
            readTime,
            status: "PUBLISHED",
          },
        });

        // Track image download
        if (image.downloadUrl) {
          await trackImageDownload(image.downloadUrl);
        }

        // Send to Telegram
        try {
          await sendToChannel({
            title: post.title,
            content: post.excerpt,
            category: post.category,
            link: `/blog/${post.id}`,
            imageUrl: post.imageUrl,
          });
        } catch (telegramError) {
          console.error(`Telegram error for ${category}:`, telegramError);
        }

        results.push({ category, success: true, postId: post.id });
        
        // Wait a bit between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error for category ${category}:`, error);
        results.push({
          category,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    });
  } catch (error) {
    console.error("Error in batch generation:", error);
    return NextResponse.json(
      { error: "Failed to generate posts" },
      { status: 500 }
    );
  }
}
