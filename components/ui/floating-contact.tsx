"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
      {/* Telegram */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="https://t.me/evolvoai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0088cc] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        >
          <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </Link>
      </motion.div>

      {/* WhatsApp */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="https://wa.me/998901234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
