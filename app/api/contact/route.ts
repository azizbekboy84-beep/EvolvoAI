import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bot } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.serviceType || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || "",
        serviceType: body.serviceType,
        message: body.message,
        status: "NEW",
      },
    });

    // Send notification to admin via Telegram
    const adminId = process.env.TELEGRAM_ADMIN_ID;
    if (adminId) {
      try {
        await bot.api.sendMessage(
          adminId,
          `🔔 <b>Yangi Murojaat!</b>\n\n` +
          `👤 <b>Ism:</b> ${body.name}\n` +
          `📧 <b>Email:</b> ${body.email}\n` +
          `📱 <b>Telefon:</b> ${body.phone || "Ko'rsatilmagan"}\n` +
          `🛠 <b>Xizmat:</b> ${body.serviceType}\n\n` +
          `💬 <b>Xabar:</b>\n${body.message}\n\n` +
          `🆔 ID: ${contact.id}`,
          { parse_mode: "HTML" }
        );
      } catch (telegramError) {
        console.error("Error sending Telegram notification:", telegramError);
        // Don't fail the request if Telegram fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Xabaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz!",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
