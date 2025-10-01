import { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import BlogEditor from "@/components/admin/blog/blog-editor";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Postni Tahrirlash - EvolvoAI Admin",
  description: "Edit blog post",
};

export default async function EditBlogPage({ params }: PageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Postni Tahrirlash
          </h1>
          <p className="text-gray-400">
            {post.title}
          </p>
        </div>

        <BlogEditor 
          postId={post.id}
          initialData={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            status: post.status,
            imageUrl: post.imageUrl,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            keywords: post.keywords,
          }}
        />
      </div>
    </AdminLayout>
  );
}
