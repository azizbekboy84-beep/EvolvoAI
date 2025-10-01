"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "✅ Muvaffaqiyatli yuborildi!",
          description: "Tez orada siz bilan bog'lanamiz.",
          variant: "default",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        toast({
          title: "❌ Xatolik yuz berdi",
          description: "Iltimos, qayta urinib ko'ring yoki Telegram orqali bog'laning.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "❌ Xatolik yuz berdi",
        description: "Internet aloqasini tekshiring va qayta urinib ko'ring.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loyihangizni <span className="text-gradient bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">Boshlang!</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Biz bilan bog&apos;laning va loyihangizni muhokama qilamiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Ismingiz
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="Ismingizni kiriting"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-white">
                      Xizmat Turi
                    </Label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange as any}
                      required
                      className="mt-2 w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <option value="" className="bg-gray-900">Tanlang</option>
                      <option value="web" className="bg-gray-900">Web Sayt</option>
                      <option value="telegram" className="bg-gray-900">Telegram Bot</option>
                      <option value="chatbot" className="bg-gray-900">AI Chatbot</option>
                      <option value="automation" className="bg-gray-900">Avtomatlashtirish</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Xabar
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="Loyihangiz haqida gapirib bering..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Aloqa Ma&apos;lumotlari
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400">azizbekboy84@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Telefon</h4>
                    <p className="text-gray-400">+998 99 644 84 44</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Manzil</h4>
                    <p className="text-gray-400">
                      Toshkent shahar,
                      <br />
                      Nurafshon aylanma yo'li 12 uy
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Telegram</h4>
                    <a
                      href="https://t.me/evolvoai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      @evolvoai
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary-500 to-purple-600 border-0">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">
                  Tezkor Javob Olish
                </h3>
                <p className="text-white/80 mb-4">
                  Telegram bot orqali darhol bog&apos;laning va bepul konsultatsiya oling
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-white text-primary-600 hover:bg-white/90"
                  asChild
                >
                  <a href="https://t.me/evolvoai_bot" target="_blank" rel="noopener noreferrer">
                    Telegram Bot
                    <MessageCircle className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
