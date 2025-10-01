"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, ExternalLink, TrendingUp, Users, Zap, Globe, Bot, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Premium Platform",
    client: "TechStore",
    image: "/portfolio/ecommerce.jpg",
    type: "web",
    typeLabel: "Web Sayt",
    tags: ["Next.js", "Stripe", "AI Search"],
    growth: "+250%",
    users: "50K+",
    performance: "100/100",
    description: "To'liq e-commerce yechim AI qidiruv va tavsiyalar bilan"
  },
  {
    id: 2,
    title: "AI Customer Support Bot",
    client: "ServicePro",
    image: "/portfolio/chatbot.jpg",
    type: "bot",
    typeLabel: "Telegram Bot",
    tags: ["GPT-4", "CRM", "Analytics"],
    growth: "+180%",
    users: "100K+",
    performance: "99.9%",
    description: "24/7 mijozlar xizmatini ta'minlovchi AI bot"
  },
  {
    id: 3,
    title: "Restaurant Booking App",
    client: "FoodHub",
    image: "/portfolio/app.jpg",
    type: "app",
    typeLabel: "Mobile App",
    tags: ["React Native", "Maps", "Payments"],
    growth: "+200%",
    users: "25K+",
    performance: "4.8★",
    description: "Restoran bron qilish va buyurtma berish ilovasi"
  },
  {
    id: 4,
    title: "Content Generation System",
    client: "MediaCorp",
    image: "/portfolio/ai.jpg",
    type: "web",
    typeLabel: "AI Platform",
    tags: ["Gemini", "Auto-Post", "SEO"],
    growth: "+350%",
    users: "10K+",
    performance: "1000+",
    description: "Har kuni avtomatik content yaratish va nashr qilish"
  },
  {
    id: 5,
    title: "CRM Integration Bot",
    client: "SalesTeam",
    image: "/portfolio/crm.jpg",
    type: "bot",
    typeLabel: "Telegram Bot",
    tags: ["AmoCRM", "Bitrix24", "Automation"],
    growth: "+150%",
    users: "5K+",
    performance: "95%",
    description: "CRM bilan to'liq integratsiya va avtomatlashtirish"
  }
];

export default function Portfolio3D() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const activeItem = portfolioItems[activeIndex];

  return (
    <section id="portfolio" className="py-24 bg-[#0A0E27] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8000FF] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00F5FF] blur-[150px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(128, 0, 255, 0.1))",
              border: "1px solid rgba(255, 0, 128, 0.3)",
              color: "#FF0080"
            }}
          >
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Bizning <span className="text-gradient">Ishlar</span>imiz
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            50+ muvaffaqiyatli loyihalar, 100% mijoz mamnuniyati
          </p>
        </motion.div>
        
        {/* 3D Carousel Container */}
        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center mb-12">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(26, 31, 58, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-2xl h-[500px] md:h-[600px] rounded-3xl overflow-hidden"
              style={{
                background: "rgba(26, 31, 58, 0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Project Image */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-[#FF0080]/20 via-[#7928CA]/20 to-[#00F5FF]/20" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/80 to-transparent" />
              </div>
              
              {/* Tech Tags */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                {activeItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Project Type Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg z-10"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {activeItem.type === 'web' && <Globe className="w-4 h-4 text-white" />}
                {activeItem.type === 'bot' && <Bot className="w-4 h-4 text-white" />}
                {activeItem.type === 'app' && <Smartphone className="w-4 h-4 text-white" />}
                <span className="text-white text-sm font-semibold">{activeItem.typeLabel}</span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                {/* Client Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #FF0080, #7928CA)",
                      border: "2px solid white",
                      boxShadow: "0 0 20px rgba(255, 0, 128, 0.5)"
                    }}
                  >
                    {activeItem.client.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{activeItem.client}</div>
                    <div className="text-gray-400 text-sm">Client</div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-black text-white mb-3">
                  {activeItem.title}
                </h3>
                
                <p className="text-gray-300 mb-6">{activeItem.description}</p>
                
                {/* Stats */}
                <div className="flex gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#00FF87]" />
                    <span className="text-white font-bold">{activeItem.growth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#00F5FF]" />
                    <span className="text-white font-bold">{activeItem.users}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-white font-bold">{activeItem.performance}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    asChild
                    className="flex-1 rounded-xl backdrop-blur-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <a href="#contact" className="flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Ko&apos;rish
                    </a>
                  </Button>
                  <Button 
                    asChild
                    className="flex-1 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #FF0080, #7928CA)",
                    }}
                  >
                    <a href="#contact" className="flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 0, 128, 0.1), transparent)",
                  opacity: 0.5
                }}
              />
            </motion.div>
          </AnimatePresence>
          
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(26, 31, 58, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === activeIndex ? "w-12" : "w-8"
              }`}
              style={{
                background: index === activeIndex 
                  ? "linear-gradient(90deg, #FF0080, #7928CA)" 
                  : "rgba(255, 255, 255, 0.2)"
              }}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-8 font-bold"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <a href="#contact">
              Barcha Loyihalar
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
