"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";

interface StatsData {
  blogPosts: { total: number; change: number };
  contacts: { total: number; change: number };
  subscribers: { total: number; change: number };
  totalViews: { total: number; change: number };
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Blog Postlar",
      value: stats?.blogPosts?.total || 0,
      change: stats?.blogPosts?.change || 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Murojaatlar",
      value: stats?.contacts?.total || 0,
      change: stats?.contacts?.change || 0,
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Obunachilar",
      value: stats?.subscribers?.total || 0,
      change: stats?.subscribers?.change || 0,
      icon: ShoppingCart,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Jami Ko'rishlar",
      value: stats?.totalViews?.total || 0,
      change: stats?.totalViews?.change || 0,
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl animate-pulse"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "rgba(26, 31, 58, 0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Icon Background */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div
              className="w-full h-full rounded-full blur-2xl"
              style={{
                background: `linear-gradient(135deg, ${card.color.split(" ")[1]}, ${card.color.split(" ")[3]})`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${card.color.split(" ")[1]}, ${card.color.split(" ")[3]})`,
                }}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  card.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {card.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(card.change)}%
              </div>
            </div>

            <div className="text-3xl font-black text-white mb-1">
              {card.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">{card.title}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
