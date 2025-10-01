"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Bosh sahifa", href: "/" },
  { name: "Xizmatlar", href: "#services" },
  { name: "Narxlar", href: "#pricing" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "FAQ", href: "#faq" },
  { name: "Aloqa", href: "#contact" },
];

export default function NavbarPremium() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl"
          : ""
      }`}
      style={{
        background: isScrolled 
          ? "rgba(26, 31, 58, 0.8)" 
          : "transparent",
        borderBottom: isScrolled 
          ? "1px solid rgba(255, 255, 255, 0.1)" 
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-white group-hover:text-[#FF0080] transition-colors" />
              <motion.div
                className="absolute inset-0 blur-xl bg-[#FF0080]/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-2xl font-black">
              <span className="text-white">Evolvo</span>
              <span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium rounded-xl hover:bg-white/5 relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-primary group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              asChild
              className="rounded-xl font-bold px-6"
              style={{
                background: "linear-gradient(135deg, #FF0080, #7928CA)",
                boxShadow: "0 0 20px rgba(255, 0, 128, 0.4)",
              }}
            >
              <a href="#contact">Bepul Konsultatsiya</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{
              background: isOpen ? "rgba(255, 0, 128, 0.1)" : "rgba(255, 255, 255, 0.05)",
            }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{
              background: "rgba(26, 31, 58, 0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-colors"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Button 
                asChild
                className="w-full rounded-xl font-bold mt-4"
                style={{
                  background: "linear-gradient(135deg, #FF0080, #7928CA)",
                }}
              >
                <a href="#contact" onClick={() => setIsOpen(false)}>Bepul Konsultatsiya</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
