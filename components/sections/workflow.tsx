"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, Code, TestTube, Rocket, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Konsultatsiya",
    description: "Loyihangizni muhokama qilamiz va talablarni aniqlaymiz",
  },
  {
    icon: Search,
    title: "Tahlil",
    description: "Bozor tahlili va texnik yechimlarni rejalashtiramiz",
  },
  {
    icon: Code,
    title: "Ishlab chiqish",
    description: "Zamonaviy texnologiyalar bilan loyihani yaratamiz",
  },
  {
    icon: TestTube,
    title: "Test",
    description: "Sifatni ta&apos;minlash uchun to&apos;liq test qilamiz",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Loyihani ishga tushiramiz va sozlaymiz",
  },
  {
    icon: HeadphonesIcon,
    title: "Qo&apos;llab-quvvatlash",
    description: "Doimiy texnik yordam va yangilanishlar",
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
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
            Ish <span className="text-gradient">Jarayoni</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Loyihangizni boshlashdan tortib qo&apos;llab-quvvatlashgacha bo&apos;lgan jarayon
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-cyan-500"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-primary-500 transition-colors">
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Number */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
