"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Image as ImageIcon, Plus, X } from "lucide-react";

interface PortfolioEditorProps {
  projectId?: string;
  initialData?: {
    title: string;
    slug: string;
    description: string;
    category: string;
    tags: string[];
    technologies: string[];
    imageUrl: string;
    demoUrl: string | null;
    githubUrl: string | null;
    clientName: string | null;
    completedAt: string | null;
    featured: boolean;
    status: string;
  };
}

export default function PortfolioEditor({ projectId, initialData }: PortfolioEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    category: initialData?.category || "Web Development",
    tags: initialData?.tags || [],
    technologies: initialData?.technologies || [],
    imageUrl: initialData?.imageUrl || "",
    demoUrl: initialData?.demoUrl || "",
    githubUrl: initialData?.githubUrl || "",
    clientName: initialData?.clientName || "",
    completedAt: initialData?.completedAt || "",
    featured: initialData?.featured || false,
    status: initialData?.status || "COMPLETED",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = projectId ? `/api/portfolio/${projectId}` : "/api/portfolio";
      const method = projectId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(projectId ? "Loyiha yangilandi!" : "Loyiha yaratildi!");
        router.push("/admin/portfolio");
        router.refresh();
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

  const categories = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "SaaS",
    "AI/ML",
    "Blockchain",
    "Design",
    "Other"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title & Slug */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Loyiha Nomi *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="Loyiha nomini kiriting"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="loyiha-slug"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Tavsif *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          placeholder="Loyiha haqida batafsil ma'lumot..."
        />
      </div>

      {/* Category & Status */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Kategoriya *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          >
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PLANNED">Planned</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Tugallangan Sana
          </label>
          <input
            type="date"
            value={formData.completedAt || ""}
            onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          />
        </div>
      </div>

      {/* URLs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Rasm URL *
          </label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Demo URL
          </label>
          <input
            type="url"
            value={formData.demoUrl || ""}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl || ""}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      {/* Client Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Mijoz Nomi
        </label>
        <input
          type="text"
          value={formData.clientName || ""}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
          placeholder="Mijoz yoki kompaniya nomi"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Teglar
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="Tag kiriting va Enter bosing"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-[#FF0080]/20 text-[#FF0080] text-sm flex items-center gap-2">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Texnologiyalar
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF0080]"
            placeholder="Texnologiya kiriting (React, Node.js, etc.)"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm flex items-center gap-2">
              {tech}
              <button type="button" onClick={() => removeTech(tech)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-5 h-5 rounded border-white/10"
        />
        <label htmlFor="featured" className="text-sm font-semibold text-gray-300">
          Featured loyiha (Asosiy sahifada ko'rsatish)
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saqlanmoqda...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {projectId ? "Yangilash" : "Yaratish"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 rounded-xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
        >
          Bekor qilish
        </button>
      </div>
    </form>
  );
}
