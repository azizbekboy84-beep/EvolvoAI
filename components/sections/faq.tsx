"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Loyiha qancha vaqt davom etadi?",
    answer:
      "Loyiha murakkabligiga qarab 1-4 hafta oralig'ida tugallanadi. Oddiy web sayt uchun 1-2 hafta, murakkab sistemalar uchun 3-4 hafta vaqt ketadi. Aniq muddatlarni birinchi konsultatsiyada aytib beramiz.",
  },
  {
    question: "Narxlar qanday belgilanadi?",
    answer:
      "Narx loyiha hajmi, funksionallik va murakkabligiga bog'liq. Oddiy landing page 500,000 so'mdan, Telegram bot 1,000,000 so'mdan, to'liq web ilovalar 3,000,000 so'mdan boshlanadi. Aniq narxni talablaringizni bilgandan keyin aytamiz.",
  },
  {
    question: "Qo'llab-quvvatlash xizmati bormi?",
    answer:
      "Ha! Loyihani topshirgandan keyin 1 oy bepul texnik qo'llab-quvvatlash beramiz. Keyin esa oylik to'lovlar asosida texnik xizmat ko'rsatamiz. Bu hosting, yangilanishlar va muammolarni tuzatishni o'z ichiga oladi.",
  },
  {
    question: "AI chatbot qanday ishlaydi?",
    answer:
      "AI chatbotimiz GPT-4 yoki Google Gemini asosida ishlaydi. U mijozlar savolariga javob beradi, mahsulot tavsiya qiladi va ma'lumot to'playdi. Bot sizning biznesingiz haqida o'rgatiladi va 24/7 xizmat ko'rsatadi.",
  },
  {
    question: "Telegram bot CRM bilan integratsiya qila olasizmi?",
    answer:
      "Albatta! Botimizni AmoCRM, Bitrix24, va boshqa mashhur CRM tizimlari bilan integratsiya qilishimiz mumkin. Bu buyurtmalar, mijozlar va statistikani avtomatik boshqarishni ta'minlaydi.",
  },
  {
    question: "Domen va hosting ham taqdim etasizmi?",
    answer:
      "Ha, biz domen va hosting xizmatlarini ham taqdim etamiz. Yoki mavjud hosting va domeningizga o'rnatishimiz mumkin. Biz eng tezkor va ishonchli hosting provayderlaridan foydalanamiz.",
  },
  {
    question: "SEO optimizatsiya qilasizmi?",
    answer:
      "Ha, barcha web saytlarimiz SEO uchun optimallashtirilgan bo'ladi. Bu meta teglar, tezkor yuklanish, mobil moslashuvchanlik va to'g'ri strukturani o'z ichiga oladi. Qo'shimcha SEO xizmatlari uchun alohida reja taklif etamiz.",
  },
  {
    question: "To'lov tizimlari bilan integratsiya qila olasizmi?",
    answer:
      "Ha! Click, Payme, Uzum Bank va boshqa to'lov tizimlarini integratsiya qilishimiz mumkin. Bot yoki web saytingizda to'g'ridan-to'g'ri to'lov qabul qilish imkoniyatini beramiz.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4">
            <HelpCircle className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tez-tez <span className="text-gradient">So'raladigan Savollar</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Mijozlarimiz ko'p so'raydigan savollarga javoblar
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl px-6 hover:border-primary-500 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Boshqa savollaringiz bormi?
          </p>
          <a
            href="#contact"
            className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center group"
          >
            Biz bilan bog'laning
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
