"use client";

import { Home, FileText, Briefcase, MessageCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Asosiy", href: "/" },
  { icon: FileText, label: "Blog", href: "#blog" },
  { icon: Briefcase, label: "Portfolio", href: "#portfolio" },
  { icon: MessageCircle, label: "Aloqa", href: "#contact", badge: true },
];

export default function MobileNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Blur Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "rgba(26, 31, 58, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.3)",
        }}
      />
      
      <div className="relative flex justify-around items-center gap-2 px-4 py-3 pb-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1 flex-1 py-2 transition-all ${
              activeIndex === index ? "text-white" : "text-gray-400"
            }`}
          >
            <div className="relative">
              <item.icon className={`w-6 h-6 transition-transform ${
                activeIndex === index ? "scale-110" : "scale-100"
              }`} />
              
              {/* Active Indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #FF0080, #7928CA)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Badge Dot */}
              {item.badge && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{
                    background: "#FF0080",
                    border: "2px solid #1A1F3A",
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        ))}
        
        {/* Center FAB */}
        <button className="relative -mt-8 flex-shrink-0">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF0080, #7928CA)",
              boxShadow: "0 8px 24px rgba(255, 0, 128, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-7 h-7 text-white" />
          </motion.div>
          
          {/* FAB Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #FF0080, #7928CA)",
              filter: "blur(15px)",
              opacity: 0.5,
              zIndex: -1,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </button>
      </div>
    </nav>
  );
}
