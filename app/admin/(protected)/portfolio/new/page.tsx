import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import PortfolioEditor from "@/components/admin/portfolio/portfolio-editor";

export const metadata: Metadata = {
  title: "Yangi Loyiha - EvolvoAI Admin",
  description: "Create new portfolio project",
};

export default function NewPortfolioPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Yangi Portfolio Loyiha
          </h1>
          <p className="text-gray-400">
            Yangi loyiha qo'shish
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <PortfolioEditor />
        </div>
      </div>
    </AdminLayout>
  );
}
