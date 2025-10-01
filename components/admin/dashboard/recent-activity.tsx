"use client";

import { useEffect, useState } from "react";
import { FileText, Briefcase, ShoppingCart, User, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "blog" | "project" | "order" | "customer";
  title: string;
  description: string;
  time: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await fetch("/api/admin/activity");
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "blog":
        return FileText;
      case "project":
        return Briefcase;
      case "order":
        return ShoppingCart;
      case "customer":
        return User;
      default:
        return Clock;
    }
  };

  const getColor = (type: Activity["type"]) => {
    switch (type) {
      case "blog":
        return "from-blue-500 to-cyan-500";
      case "project":
        return "from-purple-500 to-pink-500";
      case "order":
        return "from-amber-500 to-orange-500";
      case "customer":
        return "from-emerald-500 to-teal-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(26, 31, 58, 0.5)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">So&apos;nggi Faoliyat</h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl animate-pulse"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Hozircha faoliyat yo&apos;q</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            const color = getColor(activity.type);

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color.split(" ")[1]}, ${color.split(" ")[3]})`,
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">
                    {activity.title}
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {activity.description}
                  </p>
                </div>
                <div className="text-gray-500 text-xs whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
