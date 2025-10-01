import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Telegram - EvolvoAI Admin",
};

export default function TelegramPage() {
  redirect("/admin/telegram/posts");
}
