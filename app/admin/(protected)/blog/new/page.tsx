import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import BlogEditor from "@/components/admin/blog/blog-editor";

export const metadata: Metadata = {
  title: "Yangi Post - EvolvoAI Admin",
  description: "Create new blog post",
};

export default function NewBlogPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Yangi Blog Post
          </h1>
          <p className="text-gray-400">
            Yangi maqola yaratish
          </p>
        </div>

        <BlogEditor />
      </div>
    </AdminLayout>
  );
}
