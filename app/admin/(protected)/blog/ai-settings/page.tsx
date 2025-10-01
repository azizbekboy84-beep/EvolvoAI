import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";

export const metadata: Metadata = {
  title: "AI Settings - EvolvoAI Admin",
};

export default function BlogAISettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Blog AI Settings
          </h1>
          <p className="text-gray-400">
            AI content generation sozlamalari
          </p>
        </div>

        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <p className="text-gray-400 text-lg">
            AI sozlamalar tez orada qo'shiladi
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
