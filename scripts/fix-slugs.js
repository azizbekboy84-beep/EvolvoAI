const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fixSlugs() {
  try {
    const posts = await prisma.blogPost.findMany();

    console.log(`\n🔍 ${posts.length} ta post topildi\n`);

    for (const post of posts) {
      console.log(`Yangilanmoqda: ${post.title}`);
      console.log(`  Eski slug: ${post.slug}`);
      
      // Hech narsa qilmaymiz, faqat ko'rsatamiz
    }

    console.log("\n✅ Tayyor!");
  } catch (error) {
    console.error("❌ Xatolik:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixSlugs();
