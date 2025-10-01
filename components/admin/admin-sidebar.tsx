"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  ShoppingCart,
  Users,
  MessageSquare,
  Send,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  Tags,
  Sparkles,
  FolderOpen,
  Package,
  Clock,
  CheckCircle,
  Mail,
  BarChart3,
  Globe,
  Bot,
  UserCog,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Blog",
    icon: FileText,
    href: "/admin/blog",
    submenu: [
      { title: "Barcha Postlar", icon: List, href: "/admin/blog" },
      { title: "Yangi Post", icon: Plus, href: "/admin/blog/new" },
      { title: "Kategoriyalar", icon: Tags, href: "/admin/blog/categories" },
      { title: "AI Settings", icon: Sparkles, href: "/admin/blog/ai-settings" },
    ],
  },
  {
    title: "Portfolio",
    icon: Briefcase,
    href: "/admin/portfolio",
    submenu: [
      { title: "Loyihalar", icon: FolderOpen, href: "/admin/portfolio" },
      { title: "Yangi Loyiha", icon: Plus, href: "/admin/portfolio/new" },
      { title: "Kategoriyalar", icon: Tags, href: "/admin/portfolio/categories" },
    ],
  },
  {
    title: "Buyurtmalar",
    icon: ShoppingCart,
    href: "/admin/orders",
    submenu: [
      { title: "Barcha", icon: Package, href: "/admin/orders" },
      { title: "Yangi", icon: Clock, href: "/admin/orders?status=new" },
      { title: "Jarayonda", icon: TrendingUp, href: "/admin/orders?status=in-progress" },
      { title: "Yakunlangan", icon: CheckCircle, href: "/admin/orders?status=completed" },
    ],
  },
  {
    title: "Mijozlar",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Xabarlar",
    icon: MessageSquare,
    href: "/admin/messages",
    submenu: [
      { title: "Kontakt Formalar", icon: Mail, href: "/admin/messages/contact" },
      { title: "Telegram Chat", icon: Send, href: "/admin/messages/telegram" },
    ],
  },
  {
    title: "Telegram",
    icon: Send,
    href: "/admin/telegram",
    submenu: [
      { title: "Kanal Postlari", icon: Globe, href: "/admin/telegram/posts" },
      { title: "Bot Sozlamalari", icon: Bot, href: "/admin/telegram/bot" },
      { title: "Statistika", icon: BarChart3, href: "/admin/telegram/stats" },
    ],
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    href: "/admin/settings",
    submenu: [
      { title: "Sayt Sozlamalari", icon: Globe, href: "/admin/settings/site" },
      { title: "SEO Settings", icon: TrendingUp, href: "/admin/settings/seo" },
      { title: "AI Configuration", icon: Sparkles, href: "/admin/settings/ai" },
      { title: "Foydalanuvchilar", icon: UserCog, href: "/admin/settings/users" },
    ],
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    href: "/admin/analytics",
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen border-r"
      style={{
        background: "linear-gradient(180deg, #0A0E27 0%, #1A1F3A 100%)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#FF0080]" />
            <span className="text-xl font-black text-white">
              Evolvo<span className="text-gradient">AI</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
        {menuItems.map((item) => (
          <div key={item.title}>
            {/* Main Menu Item */}
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                pathname === item.href || 
                (item.href === "/admin" && pathname === "/admin/dashboard") ||
                (pathname.startsWith(item.href) && item.href !== "/admin")
                  ? "bg-gradient-to-r from-[#FF0080] to-[#7928CA] text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
              onClick={(e) => {
                if (item.submenu && !collapsed) {
                  e.preventDefault();
                  toggleMenu(item.title);
                }
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 font-medium">{item.title}</span>
                  {item.submenu && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        openMenus.includes(item.title) ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </>
              )}
            </Link>

            {/* Submenu */}
            {item.submenu && !collapsed && (
              <AnimatePresence>
                {openMenus.includes(item.title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-2 space-y-1 overflow-hidden"
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === subItem.href
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Icon Hint */}
      {collapsed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-8 h-1 bg-white/20 rounded-full" />
        </div>
      )}
    </motion.aside>
  );
}
