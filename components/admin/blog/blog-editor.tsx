"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Eye, Sparkles } from "lucide-react";

interface BlogEditorProps {
  postId?: string;
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    status: string;
    imageUrl: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
  };
}

export default function BlogEditor({ postId, initialData }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "AI",
    status: initialData?.status || "DRAFT",
    imageUrl: initialData?.imageUrl || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    keywords: initialData?.keywords?.join(", ") || "",
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const categories = [
    "AI",
    "Biznes",
    "Texnologiya",
    "Marketing",
    "Dasturlash",
    "Startaplar",
    "Dizayn",
    "E-commerce",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = postId ? `/api/blog/${postId}` : "/api/blog";
      const method = postId ? "PUT" : "POST";

      // Calculate read time (avg 200 words per minute)
      const wordCount = formData.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords.split(",").map((k) => k.trim()),
          readTime: readTime,
        }),
      });

      if (response.ok) {
        alert(postId ? "Post yangilandi!" : "Post yaratildi!");
        router.push("/admin/blog");
      } else {
        alert("Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const generateWithAI = async () => {
    if (!formData.category) {
      alert("Avval kategoriya tanlang!");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
        },
        body: JSON.stringify({ category: formData.category }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("AI content yaratildi! Bloglar ro'yxatiga qo'shildi.");
        router.push("/admin/blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* AI Generator */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(128, 0, 255, 0.1))",
          border: "1px solid rgba(255, 0, 128, 0.3)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold mb-1">AI Content Generator</h3>
            <p className="text-gray-400 text-sm">
              Gemini AI bilan avtomatik content yaratish
            </p>
          </div>
          <Button
            type="button"
            onClick={generateWithAI}
            disabled={generating}
            style={{
              background: "linear-gradient(135deg, #FF0080, #7928CA)",
            }}
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Yaratilmoqda...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                AI bilan Yaratish
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Info */}
      <div
        className="p-6 rounded-2xl space-y-4"
        style={{
          background: "rgba(26, 31, 58, 0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h3 className="text-white font-bold text-lg">Asosiy Ma'lumotlar</h3>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Sarlavha *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setFormData({ 
                ...formData, 
                title: newTitle,
                slug: formData.slug || generateSlug(newTitle)
              });
            }}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="Blog post sarlavhasi"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              placeholder="ai-texnologiyalari-2024"
            />
            <p className="text-gray-500 text-xs mt-1">URL uchun: faqat kichik harf, raqam va tire</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2 flex items-center justify-between">
              <span>Rasm URL *</span>
              <button
                type="button"
                onClick={() => {
                  const keyword = formData.category.toLowerCase();
                  const randomId = Math.floor(Math.random() * 1000);
                  setFormData({ 
                    ...formData, 
                    imageUrl: `https://source.unsplash.com/1200x630/?${keyword},technology,${randomId}` 
                  });
                }}
                className="text-xs text-[#FF0080] hover:underline"
              >
                Random Unsplash
              </button>
            </label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-gray-500 text-xs mt-1">Unsplash yoki boshqa manba</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Kategoriya *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Qisqa Tavsif *</label>
          <textarea
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="150-160 belgi"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Asosiy Kontent * (Markdown)</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-3 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="Markdown formatda yozing..."
          />
        </div>
      </div>

      {/* SEO */}
      <div
        className="p-6 rounded-2xl space-y-4"
        style={{
          background: "rgba(26, 31, 58, 0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h3 className="text-white font-bold text-lg">SEO Sozlamalari</h3>

        <div>
          <label className="block text-gray-400 text-sm mb-2">SEO Title</label>
          <input
            type="text"
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="60 belgi"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">SEO Description</label>
          <textarea
            value={formData.seoDescription}
            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="150-160 belgi"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Keywords (vergul bilan)</label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            placeholder="ai, texnologiya, dasturlash"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
          style={{
            background: "linear-gradient(135deg, #FF0080, #7928CA)",
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saqlanmoqda...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {postId ? "Yangilash" : "Yaratish"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
