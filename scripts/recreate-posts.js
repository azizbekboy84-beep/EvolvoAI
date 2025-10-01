const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const posts = [
  {
    category: "AI",
    title: "Sun'iy Intellekt: Kelajak Texnologiyasi",
    slug: "suniy-intellekt-kelajak-texnologiyasi",
    excerpt: "Sun'iy intellekt zamonaviy dunyoning eng muhim texnologiyalaridan biridir. Bu maqolada AI ning imkoniyatlari va kelajagi haqida gaplashamiz.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
  },
  {
    category: "Biznes",
    title: "Biznesingizni Qanday Avtomatlashtirish Mumkin",
    slug: "biznesingizni-qanday-avtomatlashtirish-mumkin",
    excerpt: "Zamonaviy biznesni avtomatlashtirish uchun eng yaxshi vositalar va strategiyalar haqida to'liq qo'llanma.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
  },
  {
    category: "Texnologiya",
    title: "2024-yilda Eng Mashhur Dasturlash Tillari",
    slug: "2024-yilda-eng-mashhur-dasturlash-tillari",
    excerpt: "Qaysi dasturlash tillarini o'rganish kerak? 2024-yil uchun eng yaxshi tanlov.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop",
  },
  {
    category: "Marketing",
    title: "Digital Marketing Strategiyalari",
    slug: "digital-marketing-strategiyalari",
    excerpt: "Onlayn biznesingizni rivojlantirish uchun samarali digital marketing usullari.",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop",
  },
];

async function recreatePosts() {
  try {
    // Delete all existing posts
    await prisma.blogPost.deleteMany({});
    console.log("✅ Eski postlar o'chirildi\n");

    // Create new posts with correct slugs
    for (const postData of posts) {
      const post = await prisma.blogPost.create({
        data: {
          ...postData,
          content: `# ${postData.title}

${postData.excerpt}

## Asosiy Qismlar

Bu maqolada biz ${postData.title.toLowerCase()} mavzusini batafsil ko'rib chiqamiz.

### 1. Kirish

Zamonaviy dunyoda texnologiyalar juda tez rivojlanmoqda. Bu o'zgarishlar biznes va hayotimizning barcha jabhalariga ta'sir qilmoqda.

### 2. Asosiy Kontseptsiyalar

- **Birinchi konsepsiya**: Muhim tushunchalar va ularning ahamiyati
- **Ikkinchi konsepsiya**: Amaliy qo'llash va misollar
- **Uchinchi konsepsiya**: Kelajakdagi rivojlanish yo'nalishlari

### 3. Amaliy Maslahatlar

1. Boshlash uchun eng yaxshi usullar
2. Keng tarqalgan xatolardan qochish
3. Muvaffaqiyatga erishish strategiyalari

### 4. Kelajak Istiqbollari

Kelajakda bu sohada yanada ko'proq innovatsiyalar kutilmoqda. Texnologiyalar rivojlanib, yangi imkoniyatlar paydo bo'ladi.

## Xulosa

${postData.title} mavzusi juda muhim va dolzarb. Bu bilimlarni amalda qo'llash orqali siz katta muvaffaqiyatlarga erishishingiz mumkin.

---

**EvolvoAI** - Professional AI yechimlar va web dasturlash xizmatlari.`,
          seoTitle: postData.title + " - EvolvoAI Blog",
          seoDescription: postData.excerpt,
          keywords: [postData.category.toLowerCase(), "texnologiya", "evolvoai", "blog"],
          author: "EvolvoAI Team",
          readTime: 7,
          status: "PUBLISHED",
        },
      });
      console.log(`✅ ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   URL: /blog/${post.slug}\n`);
    }

    console.log("🎉 Barcha postlar qayta yaratildi!");
  } catch (error) {
    console.error("❌ Xatolik:", error);
  } finally {
    await prisma.$disconnect();
  }
}

recreatePosts();
