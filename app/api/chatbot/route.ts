import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Xabar bo'sh bo'lmasligi kerak" },
        { status: 400 }
      );
    }

    // Gemini AI'dan javob olish
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `Siz EvolvoAI kompaniyasining yordamchi botisiz. 
EvolvoAI - bu zamonaviy AI texnologiyalari bilan ishlaydigan dasturiy ta'minot kompaniyasi.

Bizning xizmatlarimiz:
- 🌐 Web Saytlar yaratish (React, Next.js, Node.js)
- 🤖 Telegram Botlar ishlab chiqish
- 💬 AI Chatbotlar (GPT, Claude, Gemini)
- 🔄 Business Jarayonlarni Avtomatlashtirish
- 📱 Mobile Ilovalar (React Native, Flutter)
- 🎨 UI/UX Dizayn
- 📊 Ma'lumotlar Tahlili va Vizualizatsiya
- ☁️ Cloud Solutions (AWS, Azure, GCP)

Narxlar:
- Landing Page: 500,000 - 1,500,000 so'm
- Telegram Bot: 300,000 - 2,000,000 so'm
- AI Chatbot: 1,000,000 - 5,000,000 so'm
- Full Web App: 3,000,000 - 15,000,000 so'm

Aloqa:
- Telegram: @evolvoai_bot
- Email: azizbekboy84@gmail.com
- Telefon: +998 99 644 84 44

Foydalanuvchiga do'stona va professional tarzda javob bering. 
O'zbek tilida yozing. Qisqa va tushunarli bo'lsin.`;

    const prompt = `${systemPrompt}\n\nFoydalanuvchi: ${message}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    
    // Agar Gemini API ishlamasa, fallback javoblar
    const fallbackResponses = [
      "Savolingiz uchun rahmat! Telegram bot orqali to'liq ma'lumot olishingiz mumkin: @evolvoai_bot",
      "Biz sizga yordam berishga tayyormiz! Telefon: +998 99 644 84 44",
      "Loyihangiz haqida ko'proq ma'lumot uchun Email: azizbekboy84@gmail.com",
    ];

    const randomResponse =
      fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return NextResponse.json({
      response: randomResponse,
      timestamp: new Date().toISOString(),
    });
  }
}
