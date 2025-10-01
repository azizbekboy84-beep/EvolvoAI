import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";

export const metadata: Metadata = {
  title: "Blog Kategoriyalar - EvolvoAI Admin",
};

export default function BlogCategoriesPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Blog Kategoriyalar
          </h1>
          <p className="text-gray-400">
            Blog kategoriyalarini boshqaring
          </p>
        </div>

        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <p className="text-gray-400 text-lg">
            Kategoriyalar tez orada qo'shiladi
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
