"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sardor Karimov",
    position: "IT Startup Asoschisi",
    company: "TechStart UZ",
    rating: 5,
    comment: "EvolvoAI jamoasi bizning web saytimizni juda professional darajada yaratdi. Natija kutganimizdan ham yaxshi chiqdi!",
    avatar: "SK",
  },
  {
    name: "Nilufar Rahimova",
    position: "Marketing Direktori",
    company: "OnlineShop.uz",
    rating: 5,
    comment: "Telegram bot orqali bizning mijozlar bilan muloqotimiz ancha yaxshilandi. Juda ham foydali va qulay tizim!",
    avatar: "NR",
  },
  {
    name: "Aziz Turgunov",
    position: "Biznes Egasi",
    company: "Education Center",
    rating: 5,
    comment: "AI chatbot 24/7 ishlaydi va ko'plab savollarga avtomatik javob beradi. Bu bizning vaqtimizni juda ko'p tejaydi.",
    avatar: "AT",
  },
  {
    name: "Madina Alieva",
    position: "E-commerce Menejeri",
    company: "Fashion Store",
    rating: 5,
    comment: "Professionallik, tezkorlik va sifat - barchasi bir joyda. Har bir loyihaga individual yondashuv juda yoqdi.",
    avatar: "MA",
  },
  {
    name: "Jasur Abdullayev",
    position: "Tech Lead",
    company: "FinTech Company",
    rating: 5,
    comment: "Zamonaviy texnologiyalar va clean code. Integration jarayoni juda oson va tez amalga oshirildi.",
    avatar: "JA",
  },
  {
    name: "Feruza Yusupova",
    position: "SMM Specialist",
    company: "Digital Agency",
    rating: 5,
    comment: "Telegram kanal uchun avtomatik kontent generatsiya tizimi ajoyib ishlayapti. Har kuni sifatli postlar!",
    avatar: "FY",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
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
            Mijozlar <span className="text-gradient">Fikrlari</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Biz bilan ishlagan mijozlarimizning fikr-mulohazalari
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.position}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
