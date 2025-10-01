import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import Link from "next/link";
import { Globe, TrendingUp, Sparkles, UserCog } from "lucide-react";

export const metadata: Metadata = {
  title: "Sozlamalar - EvolvoAI Admin",
  description: "System settings",
};

const settingsCategories = [
  { title: "Sayt Sozlamalari", icon: Globe, href: "/admin/settings/site", description: "Umumiy sayt sozlamalari" },
  { title: "SEO Settings", icon: TrendingUp, href: "/admin/settings/seo", description: "SEO va meta ma'lumotlar" },
  { title: "AI Configuration", icon: Sparkles, href: "/admin/settings/ai", description: "AI model sozlamalari" },
  { title: "Foydalanuvchilar", icon: UserCog, href: "/admin/settings/users", description: "Admin foydalanuvchilar" },
];

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Sozlamalar
          </h1>
          <p className="text-gray-400">
            Tizim sozlamalarini boshqaring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="p-6 rounded-2xl transition-all hover:scale-105"
              style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
            >
              <category.icon className="w-12 h-12 mb-4 text-[#FF0080]" />
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-gray-400">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
