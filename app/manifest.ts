import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EvolvoAI - AI Bilan Biznesingizni Avtomatlashtiring",
    short_name: "EvolvoAI",
    description: "Zamonaviy web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish yechimlarini taqdim etamiz",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#6366F1",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
