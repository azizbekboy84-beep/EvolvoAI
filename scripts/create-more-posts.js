const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const posts = [
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

async function createPosts() {
  try {
    for (const postData of posts) {
      const post = await prisma.blogPost.create({
        data: {
          ...postData,
          content: `# ${postData.title}

${postData.excerpt}

## Asosiy Qismlar

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### 1. Birinchi Bo'lim

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 2. Ikkinchi Bo'lim

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### 3. Uchinchi Bo'lim

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Xulosa

Bu mavzu bo'yicha batafsil ma'lumotlar va professional maslahatlar.`,
          seoTitle: postData.title + " - EvolvoAI",
          seoDescription: postData.excerpt,
          keywords: postData.category.toLowerCase().split(" ").concat(["evolvoai", "blog"]),
          author: "EvolvoAI Team",
          readTime: 6,
          status: "PUBLISHED",
        },
      });
      console.log("✅", post.title);
    }

    console.log("\n🎉 Barcha postlar yaratildi!");
  } catch (error) {
    console.error("❌ Xatolik:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createPosts();
