"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Loader2, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  views: number;
  createdAt: string;
}

interface PortfolioTableProps {
  projects: Project[];
}

export default function PortfolioTable({ projects: initialProjects }: PortfolioTableProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const deleteProject = async (id: string) => {
    if (!confirm("Loyihani o'chirmoqchimisiz?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        alert("Loyiha o'chirildi!");
      } else {
        alert("Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setDeleting(null);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Loyiha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-gray-400 font-semibold">Sarlavha</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Kategoriya</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Featured</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Ko'rishlar</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Loyihalar topilmadi
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">{project.title}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(255, 0, 128, 0.1)", color: "#FF0080" }}>
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {project.featured ? (
                        <span className="text-yellow-400">⭐</span>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-400">{project.views}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => window.open(`/portfolio/${project.slug}`, "_blank")}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Ko'rish"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/portfolio/edit/${project.id}`)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          disabled={deleting === project.id}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                          {deleting === project.id ? (
                            <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-400" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
