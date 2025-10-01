"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const weekData = data?.weekData || [
    { day: "Dush", value: 45 },
    { day: "Sesh", value: 52 },
    { day: "Chor", value: 38 },
    { day: "Pay", value: 65 },
    { day: "Jum", value: 58 },
    { day: "Shan", value: 42 },
    { day: "Yak", value: 55 },
  ];

  const maxValue = Math.max(...weekData.map((d: any) => d.value));

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(26, 31, 58, 0.5)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Haftalik Statistika</h2>
        <BarChart3 className="w-6 h-6 text-gray-400" />
      </div>

      {/* Bar Chart */}
      <div className="h-64 flex items-end justify-between gap-3">
        {weekData.map((item: any, index: number) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full relative" style={{ height: "200px" }}>
              <div
                className="absolute bottom-0 w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  background: "linear-gradient(to top, #FF0080, #7928CA)",
                }}
              />
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm">{item.value}</div>
              <div className="text-gray-400 text-xs mt-1">{item.day}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
