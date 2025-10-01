"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, Loader2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  views: number;
  createdAt: string;
  publishDate: string;
}

export default function BlogTable() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog?limit=100");
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Postlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        alert("Post o'chirildi!");
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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || post.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF0080]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <option value="all">Barchasi</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <Button
            onClick={() => router.push("/admin/blog/new")}
            className="rounded-xl"
            style={{
              background: "linear-gradient(135deg, #FF0080, #7928CA)",
            }}
          >
            Yangi Post
          </Button>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(26, 31, 58, 0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Sarlavha</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Kategoriya</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Ko'rishlar</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Sana</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Postlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-white font-medium">{post.title}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: "rgba(255, 0, 128, 0.1)",
                          color: "#FF0080",
                        }}
                      >
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === "PUBLISHED"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-white">{post.views.toLocaleString()}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString("uz-UZ")}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Saytda ko'rish"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/blog/edit/${post.id}`)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          disabled={deleting === post.id}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                          {deleting === post.id ? (
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

      {/* Pagination would go here */}
    </div>
  );
}
