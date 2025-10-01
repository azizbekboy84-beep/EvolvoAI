import { Bot, Context } from "grammy";

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

export interface TelegramMessage {
  title: string;
  content: string;
  category?: string;
  link?: string;
  imageUrl?: string;
}

export async function sendToChannel(message: TelegramMessage): Promise<void> {
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (!channelId) {
    throw new Error("TELEGRAM_CHANNEL_ID is not defined");
  }

  const formattedMessage = formatBlogPostMessage(message);

  try {
    if (message.imageUrl) {
      await bot.api.sendPhoto(channelId, message.imageUrl, {
        caption: formattedMessage,
        parse_mode: "HTML",
      });
    } else {
      await bot.api.sendMessage(channelId, formattedMessage, {
        parse_mode: "HTML",
        link_preview_options: {
          is_disabled: false,
        },
      });
    }
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    throw error;
  }
}

function formatBlogPostMessage(message: TelegramMessage): string {
  const emoji = getCategoryEmoji(message.category || "");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://evolvoai.uz";
  
  let formatted = `${emoji} <b>${message.title}</b>\n\n`;
  formatted += `${message.content}\n\n`;
  
  if (message.link) {
    formatted += `🔗 <a href="${baseUrl}${message.link}">To'liq o'qish</a>\n\n`;
  }
  
  if (message.category) {
    formatted += `#${message.category} #EvolvoAI`;
  }
  
  return formatted;
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    biznes: "💼",
    texnologiya: "💻",
    marketing: "📊",
    AI: "🤖",
    dasturlash: "👨‍💻",
    startaplar: "🚀",
    dizayn: "🎨",
    sotsiomedia: "📱",
    "e-commerce": "🛒",
    avtomatlashtirish: "⚙️",
    chatbotlar: "💬",
    SEO: "🔍",
  };
  
  return emojiMap[category] || "📝";
}

// Bot command handlers
export function setupBotCommands(): void {
  bot.command("start", async (ctx: Context) => {
    await ctx.reply(
      `👋 Xush kelibsiz! EvolvoAI Bot ga!\n\n` +
      `Biz AI texnologiyalari bilan biznesingizni avtomatlashtiramiz.\n\n` +
      `📌 Mavjud buyruqlar:\n` +
      `/services - Xizmatlar ro'yxati\n` +
      `/portfolio - Loyihalar\n` +
      `/blog - So'nggi postlar\n` +
      `/contact - Aloqa ma'lumotlari\n` +
      `/quote - Narx hisoblash\n` +
      `/help - Yordam`,
      {
        reply_markup: {
          keyboard: [
            [{ text: "🌐 Xizmatlar" }, { text: "📁 Portfolio" }],
            [{ text: "📝 Blog" }, { text: "📞 Aloqa" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  });

  bot.command("services", async (ctx: Context) => {
    await ctx.reply(
      `🌐 <b>Bizning Xizmatlarimiz:</b>\n\n` +
      `1️⃣ <b>Web Sayt Yaratish</b>\n` +
      `   - Zamonaviy dizayn\n` +
      `   - SEO optimizatsiya\n` +
      `   - Responsive layout\n\n` +
      `2️⃣ <b>Telegram Bot</b>\n` +
      `   - Biznes avtomatlashtirish\n` +
      `   - CRM integratsiya\n` +
      `   - To'lov tizimlari\n\n` +
      `3️⃣ <b>AI Chatbot</b>\n` +
      `   - 24/7 mijoz xizmati\n` +
      `   - Tabiiy til\n` +
      `   - Ko'p tilda\n\n` +
      `4️⃣ <b>Avtomatlashtirish</b>\n` +
      `   - Workflow optimization\n` +
      `   - API integratsiya\n` +
      `   - Custom solutions\n\n` +
      `📞 Batafsil: @evolvoai`,
      { parse_mode: "HTML" }
    );
  });

  bot.command("contact", async (ctx: Context) => {
    await ctx.reply(
      `📞 <b>Aloqa Ma'lumotlari:</b>\n\n` +
      `📧 Email: azizbekboy84@gmail.com\n` +
      `📱 Telefon: +998 99 644 84 44\n` +
      `🏠 Manzil: Toshkent, Nurafshon aylanma yo'li 12 uy\n` +
      `💬 Telegram: @evolvoai\n\n` +
      `Biz bilan bog'laning va loyihangizni muhokama qilamiz!`,
      { parse_mode: "HTML" }
    );
  });

  bot.command("help", async (ctx: Context) => {
    await ctx.reply(
      `❓ <b>Yordam:</b>\n\n` +
      `Men sizga quyidagilar bilan yordam bera olaman:\n\n` +
      `• Xizmatlar haqida ma'lumot olish\n` +
      `• Portfolio ko'rish\n` +
      `• So'nggi blog postlarni o'qish\n` +
      `• Aloqa ma'lumotlarini olish\n` +
      `• Narx hisoblash\n\n` +
      `Buyruqlar ro'yxati uchun /start bosing`,
      { parse_mode: "HTML" }
    );
  });

  // Text message handler
  bot.on("message:text", async (ctx: Context) => {
    const text = ctx.message?.text || "";
    
    if (text === "🌐 Xizmatlar") {
      await ctx.reply("Xizmatlar ro'yxati uchun /services bosing");
    } else if (text === "📁 Portfolio") {
      await ctx.reply("Portfolio uchun /portfolio bosing");
    } else if (text === "📝 Blog") {
      await ctx.reply("So'nggi postlar uchun /blog bosing");
    } else if (text === "📞 Aloqa") {
      await ctx.reply("Aloqa ma'lumotlari uchun /contact bosing");
    }
  });
}

export async function startBot(): Promise<void> {
  setupBotCommands();
  
  bot.catch((err) => {
    console.error("Bot error:", err);
  });

  await bot.start();
  console.log("Telegram bot is running...");
}

export { bot };
