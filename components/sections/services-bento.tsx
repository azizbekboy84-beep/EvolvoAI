"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Bot, MessageSquare, Zap, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceDialog from "@/components/ui/service-dialog";

const servicesData = [
  {
    icon: Globe,
    title: "Web Saytlar",
    description: "Next.js, React, AI-powered SEO bilan premium web saytlar",
    features: ["Responsive dizayn", "100/100 Performance", "SEO optimized"],
    color: "from-blue-500 to-cyan-500",
    size: "large",
    fullDescription: "Zamonaviy texnologiyalar bilan yaratilgan, tez yuklanadigan va SEO optimallashtirilgan web saytlar. Biznesingizni raqamli dunyoda professional ko'rinishga ega bo'lishini ta'minlaymiz.",
    benefits: [
      "Google'da yuqori pozitsiyalarga chiqish",
      "Mobile va desktop'da mukammal ko'rinish",
      "Tezkor yuklanish va yuqori performance",
      "Admin panel orqali oson boshqarish",
      "SSL sertifikat va xavfsizlik",
    ],
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    pricing: "3,000,000 so'm",
    deliveryTime: "2-3 hafta",
    examples: [
      {
        title: "E-Commerce Platform",
        description: "To'liq onlayn do'kon, to'lov integratsiya, admin panel",
      },
      {
        title: "Corporate Website",
        description: "Kompaniya sayti, blog, portfolio, kontakt forma",
      },
      {
        title: "Landing Page",
        description: "Mahsulot yoki xizmat uchun promotional sahifa",
      },
    ],
  },
  {
    icon: Bot,
    title: "Telegram Botlar",
    description: "Avtomatlashtirish va mijozlar bilan ishlash",
    stats: [
      { value: "10K+", label: "Users" },
      { value: "99.9%", label: "Uptime" },
    ],
    color: "from-purple-500 to-pink-500",
    size: "medium",
    fullDescription: "Biznes jarayonlaringizni avtomatlashtiruvchi, mijozlar bilan 24/7 muloqot qiluvchi va CRM tizimlari bilan integratsiya qilingan Telegram botlar.",
    features: [
      "Avtomatik javoblar va savol-javob",
      "CRM integratsiya (AmoCRM, Bitrix24)",
      "To'lov sistemalari (Click, Payme, Uzum)",
      "Buyurtmalarni boshqarish",
      "Statistika va analytics",
      "Admin panel",
    ],
    benefits: [
      "24/7 mijozlar bilan avtomatik aloqa",
      "Operator xarajatlarini kamaytirish",
      "Tez va samarali xizmat ko'rsatish",
      "Buyurtmalarni avtomatik qayta ishlash",
      "Ma'lumotlarni to'plash va tahlil qilish",
    ],
    technologies: ["Grammy.js", "Node.js", "PostgreSQL", "Redis", "Webhooks", "API Integration"],
    pricing: "2,000,000 so'm",
    deliveryTime: "1-2 hafta",
    examples: [
      {
        title: "Restaurant Bot",
        description: "Buyurtma qabul qilish, menyuni ko'rsatish, yetkazib berish",
      },
      {
        title: "Support Bot",
        description: "FAQ javoblar, tiketing, operator bilan bog'lanish",
      },
      {
        title: "Shop Bot",
        description: "Mahsulotlar katalogi, savat, to'lov, buyurtma tracking",
      },
    ],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbotlar",
    color: "from-emerald-500 to-teal-500",
    size: "small",
    description: "GPT-4 va Gemini AI yordamida aqlli chatbotlar",
    features: [
      "Tabiiy til bilan muloqot",
      "Kontekstni eslab qolish",
      "Ko'p tilni qo'llab-quvvatlash",
      "CRM integratsiya",
      "Custom training",
      "Analytics dashboard",
    ],
    fullDescription: "Sun'iy intellekt asosida ishlaydiган chatbotlar. GPT-4 yoki Google Gemini yordamida mijozlar savollariga inson kabi javob beradi, mahsulot tavsiya qiladi va ma'lumot to'playdi.",
    benefits: [
      "Mijozlar mamnunligini oshirish",
      "24/7 xizmat ko'rsatish",
      "Ko'p tillarda ishlash",
      "Aqlli tavsiyalar berish",
      "Xarajatlarni kamaytirish",
    ],
    technologies: ["OpenAI GPT-4", "Google Gemini", "LangChain", "Vector DB", "Fine-tuning"],
    pricing: "4,000,000 so'm",
    deliveryTime: "2-3 hafta",
    examples: [
      {
        title: "Customer Support AI",
        description: "Mijozlar savollariga javob berish, muammolarni hal qilish",
      },
      {
        title: "Sales Assistant",
        description: "Mahsulot tavsiya qilish, sotuvga yordam berish",
      },
    ],
  },
  {
    icon: Zap,
    title: "Biznes Avtomatlashtirish",
    color: "from-amber-500 to-orange-500",
    size: "small",
    description: "Workflow automation va API integratsiya",
    features: [
      "Workflow avtomatlashtirish",
      "API integratsiya",
      "Ma'lumotlarni sinxronlashtirish",
      "Hisobotlar va analytics",
      "Email va SMS avtomatizatsiya",
      "Custom solutions",
    ],
    fullDescription: "Biznes jarayonlaringizni avtomatlashtirish, turli tizimlarni bir-biriga ulash va samaradorlikni oshirish uchun maxsus yechimlar.",
    benefits: [
      "Vaqtni tejash va samaradorlikni oshirish",
      "Inson xatolarini kamaytirish",
      "Jarayonlarni tezlashtirish",
      "Ma'lumotlarni bir joyda boshqarish",
      "Xarajatlarni kamaytirish",
    ],
    technologies: ["Zapier", "Make.com", "n8n", "Python", "API Integration", "Webhooks"],
    pricing: "Shartnoma asosida",
    deliveryTime: "1-4 hafta",
    examples: [
      {
        title: "CRM Automation",
        description: "Lead'larni avtomatik qo'shish, statuslarni yangilash",
      },
      {
        title: "Report Generator",
        description: "Avtomatik hisobotlar yaratish va yuborish",
      },
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Powered SEO",
    description: "Har kuni 12 ta professional blog post, avtomatik optimizatsiya",
    badges: ["Gemini AI", "Auto-Publish", "Multi-Channel"],
    color: "from-pink-500 to-rose-500",
    size: "wide",
    fullDescription: "Sun'iy intellekt yordamida avtomatik kontent yaratish va SEO optimizatsiya. Har kuni professional blog postlar, ijtimoiy tarmoq uchun kontentlar va SEO optimallashtirilgan matnlar.",
    features: [
      "Har kuni 12 ta blog post",
      "SEO optimallashtirilgan kontentlar",
      "Avtomatik nashr qilish",
      "Ko'p kanalli tarqatish",
      "Tasvir yaratish (DALL-E)",
      "Analytics va tracking",
    ],
    benefits: [
      "Google'da yuqori ranking",
      "Organik trafik oshishi",
      "Kontent yaratish vaqtini tejash",
      "Professional va SEO-friendly matnlar",
      "Doimiy content oqimi",
    ],
    technologies: ["Google Gemini", "OpenAI GPT-4", "DALL-E 3", "Auto-Publishing", "SEO Tools"],
    pricing: "5,000,000 so'm",
    deliveryTime: "1 hafta setup",
    examples: [
      {
        title: "Blog Automation",
        description: "Har kuni yangi blog postlar, avtomatik nashr",
      },
      {
        title: "Social Media Content",
        description: "Instagram, Facebook, LinkedIn uchun postlar",
      },
    ],
  },
];

const services = servicesData.map((service, index) => ({
  ...service,
  id: index,
}));

export default function ServicesBento() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openServiceDialog = (service: typeof services[0]) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  return (
    <section id="services" className="py-24 bg-[#0A0E27] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-[#FF0080] blur-[150px]" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-[#00F5FF] blur-[150px]" />
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
              background: "rgba(255, 0, 128, 0.1)",
              color: "#FF0080",
              border: "1px solid rgba(255, 0, 128, 0.3)",
            }}
          >
            Xizmatlar
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Biznesingiz Uchun <span className="text-gradient">AI Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            To&apos;liq texnologik yechimlar bir joyda
          </p>
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Card - Web Saytlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl p-8"
            style={{
              background: "rgba(26, 31, 58, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at center, rgba(255, 0, 128, 0.1), transparent)",
              }}
            />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
              >
                <Globe className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{services[0].title}</h3>
              <p className="text-gray-400 mb-6">{services[0].description}</p>
              
              <ul className="space-y-3 mb-8">
                {services[0].features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-[#00FF87] flex items-center justify-center mr-3">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 group/btn"
                onClick={() => openServiceDialog(services[0])}
              >
                Batafsil
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
          
          {/* Medium Card - Telegram Bot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl p-8"
            style={{
              background: "rgba(26, 31, 58, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                }}
              >
                <Bot className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{services[1].title}</h3>
              <p className="text-gray-400 text-sm mb-6">{services[1].description}</p>
              
              <div className="flex gap-6 mb-4">
                {services[1].stats?.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-[#FF0080] mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={() => openServiceDialog(services[1])}
              >
                Ko&apos;rish <ArrowUpRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
          
          {/* Small Card - AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{
              background: "rgba(26, 31, 58, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
            onClick={() => openServiceDialog(services[2])}
          >
            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{
                background: "linear-gradient(135deg, #10B981, #14B8A6)",
              }}
            >
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{services[2].title}</h4>
            <ArrowUpRight className="w-5 h-5 text-gray-400 absolute top-4 right-4 group-hover:text-[#00F5FF] transition-colors" />
          </motion.div>
          
          {/* Small Card - Avtomatlashtirish */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{
              background: "rgba(26, 31, 58, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
            onClick={() => openServiceDialog(services[3])}
          >
            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #F97316)",
              }}
            >
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{services[3].title}</h4>
            <ArrowUpRight className="w-5 h-5 text-gray-400 absolute top-4 right-4 group-hover:text-[#FFD700] transition-colors" />
          </motion.div>
          
          {/* Wide Card - AI SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-4 group relative overflow-hidden rounded-3xl"
            style={{
              background: "rgba(26, 31, 58, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative z-10">
                <Sparkles className="w-10 h-10 text-[#FF0080] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">{services[4].title}</h3>
                <p className="text-gray-400 mb-6">{services[4].description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {services[4].badges?.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(255, 0, 128, 0.1)",
                        color: "#FF0080",
                        border: "1px solid rgba(255, 0, 128, 0.3)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(0, 245, 255, 0.1))",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Mini Dashboard Visual */}
                  <div className="absolute inset-0 flex items-end justify-around p-6">
                    {[60, 80, 70, 90, 75].map((height, idx) => (
                      <motion.div
                        key={idx}
                        className="w-12 rounded-t-lg"
                        style={{
                          height: `${height}%`,
                          background: "linear-gradient(to top, #FF0080, #7928CA)",
                        }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Service Dialog */}
      {selectedService && (
        <ServiceDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          service={selectedService}
        />
      )}
    </section>
  );
}
