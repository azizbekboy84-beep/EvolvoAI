import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  xizmatlar: [
    { name: "Web Sayt Yaratish", href: "#" },
    { name: "Telegram Bot", href: "#" },
    { name: "AI Chatbot", href: "#" },
    { name: "Avtomatlashtirish", href: "#" },
  ],
  kompaniya: [
    { name: "Biz Haqimizda", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Jamoamiz", href: "#" },
    { name: "Karyera", href: "#" },
  ],
  resurslar: [
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "#" },
    { name: "Narxlar", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { name: "Telegram", href: "https://t.me/evolvoai", icon: Send },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">EvolvoAI</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              AI texnologiyalari bilan biznesingizni avtomatlashtiramiz. 
              Zamonaviy yechimlar va professional xizmatlar.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>azizbekboy84@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+998 99 644 84 44</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>Toshkent, Nurafshon aylanma yo'li 12 uy</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4">Xizmatlar</h3>
            <ul className="space-y-2">
              {footerLinks.xizmatlar.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kompaniya</h3>
            <ul className="space-y-2">
              {footerLinks.kompaniya.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resurslar</h3>
            <ul className="space-y-2">
              {footerLinks.resurslar.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Yangi maqolalar va maxsus takliflardan birinchi bo&apos;lib xabardor bo&apos;ling
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email manzilingiz"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button variant="gradient">
                Obuna
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 EvolvoAI. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Maxfiylik Siyosati
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Foydalanish Shartlari
              </Link>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
