import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BlogPostContent from "@/components/blog/blog-post-content";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      return {
        title: "Post Not Found - EvolvoAI",
      };
    }

    return {
      title: post.seoTitle,
      description: post.seoDescription,
      keywords: post.keywords,
      openGraph: {
        title: post.seoTitle,
        description: post.seoDescription,
        images: [post.imageUrl],
        type: "article",
        publishedTime: post.publishDate.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Blog - EvolvoAI",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post || post.status !== "PUBLISHED") {
      notFound();
    }

    // Increment views
    await prisma.blogPost.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } },
    });

    return (
      <main className="min-h-screen bg-[#0A0E27]">
        <Navbar forceWhite />
        <div className="pt-20">
          <BlogPostContent post={post} />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
