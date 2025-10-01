"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    title: string;
    description: string;
    fullDescription?: string;
    features: string[];
    benefits?: string[];
    technologies?: string[];
    pricing?: string;
    deliveryTime?: string;
    examples?: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  };
}

export default function ServiceDialog({ open, onOpenChange, service }: ServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A1F3A] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-white mb-2">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-lg">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 mt-6">
          {/* Full Description */}
          {service.fullDescription && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF0080]" />
                Batafsil Ma'lumot
              </h3>
              <p className="text-gray-300 leading-relaxed">{service.fullDescription}</p>
            </div>
          )}
          
          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Asosiy Xususiyatlar</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#00FF87] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Benefits */}
          {service.benefits && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Sizga Nima Beradi?</h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#FF0080] font-bold">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Technologies */}
          {service.technologies && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Texnologiyalar</h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(128, 0, 255, 0.1))",
                      border: "1px solid rgba(255, 0, 128, 0.3)",
                      color: "#FF0080"
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Examples */}
          {service.examples && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Misol Loyihalar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {service.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="p-5 rounded-2xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{example.description}</p>
                    {example.image && (
                      <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#FF0080]/20 to-[#00F5FF]/20 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white/50" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Pricing & Delivery */}
          {(service.pricing || service.deliveryTime) && (
            <div className="grid md:grid-cols-2 gap-4">
              {service.pricing && (
                <div className="p-6 rounded-2xl text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(128, 0, 255, 0.1))",
                    border: "1px solid rgba(255, 0, 128, 0.3)"
                  }}
                >
                  <div className="text-sm text-gray-400 mb-2">Boshlang'ich Narx</div>
                  <div className="text-3xl font-black text-white">{service.pricing}</div>
                </div>
              )}
              {service.deliveryTime && (
                <div className="p-6 rounded-2xl text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(0, 128, 255, 0.1))",
                    border: "1px solid rgba(0, 245, 255, 0.3)"
                  }}
                >
                  <div className="text-sm text-gray-400 mb-2">Topshirish Muddati</div>
                  <div className="text-3xl font-black text-white">{service.deliveryTime}</div>
                </div>
              )}
            </div>
          )}
          
          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="flex-1 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #FF0080, #7928CA)",
              }}
            >
              <a href="#contact">
                Buyurtma Berish
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
