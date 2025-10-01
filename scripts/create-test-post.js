const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createTestPost() {
  try {
    const post = await prisma.blogPost.create({
      data: {
        category: "AI",
        title: "Sun'iy Intellekt: Kelajak Texnologiyasi",
        slug: "suniy-intellekt-kelajak-texnologiyasi",
        excerpt: "Sun'iy intellekt zamonaviy dunyoning eng muhim texnologiyalaridan biridir. Bu maqolada AI ning imkoniyatlari va kelajagi haqida gaplashamiz.",
        content: `# Sun'iy Intellekt: Kelajak Texnologiyasi

Sun'iy intellekt (AI) zamonaviy dunyoning eng muhim texnologiyalaridan biridir. Bu texnologiya bizning hayotimizni tubdan o'zgartirmoqda.

## AI ning Asosiy Yo'nalishlari

1. **Machine Learning** - Mashina o'rganishi
2. **Deep Learning** - Chuqur o'rganish  
3. **Natural Language Processing** - Tabiiy tilni qayta ishlash

## Qo'llanilishi

AI hozirda ko'plab sohalarda qo'llanilmoqda:
- Tibbiyot
- Moliya
- Transport
- Ta'lim
- Biznes avtomatlashtirish

## Kelajak

Sun'iy intellekt texnologiyalari yana ham rivojlanib, bizning hayotimizni yanada osonlashtiradi.`,
        seoTitle: "Sun'iy Intellekt: Kelajak Texnologiyasi - EvolvoAI",
        seoDescription: "Sun'iy intellekt zamonaviy dunyoning eng muhim texnologiyalaridan biri. AI ning imkoniyatlari va kelajagi haqida batafsil ma'lumot.",
        keywords: ["ai", "sun'iy intellekt", "texnologiya", "machine learning", "deep learning"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
        author: "EvolvoAI Team",
        readTime: 5,
        status: "PUBLISHED",
      },
    });

    console.log("✅ Test post yaratildi:", post.title);
    console.log("📝 Slug:", post.slug);
    console.log("🔗 URL: /blog/" + post.slug);
  } catch (error) {
    console.error("❌ Xatolik:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPost();
