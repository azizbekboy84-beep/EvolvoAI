"use client";

import { useState } from "react";
import { Search, Bell, Moon, Sun, User, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTopbar() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Yangi buyurtma keldi", time: "5 min oldin", unread: true },
    { id: 2, text: "Blog post yaratildi", time: "1 soat oldin", unread: true },
    { id: 3, text: "Mijoz xabari", time: "2 soat oldin", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className="fixed top-0 right-0 h-20 border-b z-40"
      style={{
        left: "280px",
        background: "rgba(26, 31, 58, 0.8)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish... (Ctrl+K)"
              className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0080] transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 rounded-xl hover:bg-white/5 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#FF0080] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(26, 31, 58, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-bold text-white">Bildirishnomalar</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                          notif.unread ? "bg-white/5" : ""
                        }`}
                      >
                        <p className="text-white text-sm">{notif.text}</p>
                        <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-white/10">
                    <button className="text-[#FF0080] text-sm font-semibold hover:underline">
                      Barchasini ko&apos;rish
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF0080] to-[#7928CA] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">
                  {session?.user?.email || "Admin"}
                </div>
                <div className="text-gray-400 text-xs">Administrator</div>
              </div>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(26, 31, 58, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="text-white font-semibold">
                      {session?.user?.email}
                    </div>
                    <div className="text-gray-400 text-sm">Administrator</div>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white">
                      <User className="w-5 h-5" />
                      <span>Profil</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white">
                      <Settings className="w-5 h-5" />
                      <span>Sozlamalar</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-white/10">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Chiqish</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
