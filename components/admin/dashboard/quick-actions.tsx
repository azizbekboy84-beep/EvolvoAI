"use client";

import { useRouter } from "next/navigation";
import { Plus, Sparkles, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuickActions() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);

  const generateBlogPost = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
        },
        body: JSON.stringify({ category: "AI" }),
      });
      
      if (response.ok) {
        alert("Blog post muvaffaqiyatli yaratildi!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setGenerating(false);
    }
  };

  const actions = [
    {
      title: "Yangi Blog Post",
      description: "Qo'lda blog post yozish",
      icon: Plus,
      color: "from-blue-500 to-cyan-500",
      onClick: () => router.push("/admin/blog/new"),
    },
    {
      title: "AI Blog Generator",
      description: "Gemini bilan avtomatik",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      onClick: generateBlogPost,
      loading: generating,
    },
    {
      title: "Yangi Loyiha",
      description: "Portfolio qo'shish",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      onClick: () => router.push("/admin/portfolio/new"),
    },
    {
      title: "Telegram Post",
      description: "Kanalga yuborish",
      icon: Send,
      color: "from-emerald-500 to-teal-500",
      onClick: () => router.push("/admin/telegram/posts"),
    },
  ];

  return (
    <div className="rounded-2xl p-6"
      style={{
        background: "rgba(26, 31, 58, 0.5)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Tezkor Harakatlar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            disabled={action.loading}
            className="p-6 rounded-xl text-left hover:scale-105 transition-all disabled:opacity-50"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${action.color.split(" ")[1]}, ${action.color.split(" ")[3]})`,
              }}
            >
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold mb-1">
              {action.loading ? "Yaratilmoqda..." : action.title}
            </h3>
            <p className="text-gray-400 text-sm">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
