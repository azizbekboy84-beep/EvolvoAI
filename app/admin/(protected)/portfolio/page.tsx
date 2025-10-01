import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import PortfolioTable from "@/components/admin/portfolio/portfolio-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Portfolio - EvolvoAI Admin",
  description: "Manage portfolio projects",
};

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  let projects: any[] = [];
  
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Portfolio Loyihalar
            </h1>
            <p className="text-gray-400">
              Loyihalaringizni boshqaring
            </p>
          </div>
          <Link href="/admin/portfolio/new">
            <button className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
              <Plus className="w-5 h-5" />
              Yangi Loyiha
            </button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-gray-400 text-lg mb-4">
              Hozircha loyihalar yo'q
            </p>
            <Link href="/admin/portfolio/new">
              <button className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
                Birinchi loyihani qo'shish
              </button>
            </Link>
          </div>
        ) : (
          <PortfolioTable projects={projects} />
        )}
      </div>
    </AdminLayout>
  );
}
