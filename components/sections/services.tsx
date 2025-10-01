"use client";

import { motion } from "framer-motion";
import { Globe, Bot, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Web Sayt Yaratish",
    description: "Next.js, React va zamonaviy texnologiyalar bilan responsive va SEO-optimallashtirilgan web saytlar",
    features: ["Responsive dizayn", "SEO optimizatsiya", "Tez yuklanish", "Admin panel"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Bot,
    title: "Telegram Bot Rivojlantirish",
    description: "Biznes jarayonlarini avtomatlashtiradigan, CRM bilan integratsiya qilingan Telegram botlar",
    features: ["Avtomatlashtirish", "CRM integratsiya", "To'lov tizimlari", "Analitika"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Integratsiya",
    description: "24/7 mijozlarga xizmat ko'rsatuvchi, tabiiy tilni tushunadigan AI chatbotlar",
    features: ["GPT/Gemini AI", "Multilingual", "Kontekst eslab qolish", "CRM integratsiya"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Biznes Avtomatlashtirish",
    description: "Workflow avtomatlashtirish, API integratsiya va maxsus biznes yechimlar",
    features: ["Workflow automation", "API integratsiya", "Ma'lumot tahlili", "Custom solutions"],
    color: "from-amber-500 to-orange-500",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bizning <span className="text-gradient">Xizmatlarimiz</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI va zamonaviy texnologiyalar bilan biznesingizni keyingi bosqichga olib chiqing
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-primary-500 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="group/btn">
                    <a href="#contact">
                      Batafsil
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
