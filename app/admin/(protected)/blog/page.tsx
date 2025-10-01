import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import BlogTable from "@/components/admin/blog/blog-table";

export const metadata: Metadata = {
  title: "Blog Management - EvolvoAI Admin",
  description: "Manage blog posts",
};

export default function BlogPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Blog Management
          </h1>
          <p className="text-gray-400">
            Barcha blog postlarni boshqarish
          </p>
        </div>

        {/* Blog Table */}
        <BlogTable />
      </div>
    </AdminLayout>
  );
}
