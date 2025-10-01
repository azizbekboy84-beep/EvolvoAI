const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function updateSlugs() {
  try {
    const posts = await prisma.blogPost.findMany();

    console.log(`\n📝 ${posts.length} ta post topildi\n`);

    for (const post of posts) {
      const newSlug = generateSlug(post.title);
      
      if (post.slug !== newSlug) {
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { slug: newSlug },
        });
        
        console.log(`✅ ${post.title}`);
        console.log(`   Eski: ${post.slug}`);
        console.log(`   Yangi: ${newSlug}\n`);
      } else {
        console.log(`✓ ${post.title} (slug to'g'ri)\n`);
      }
    }

    console.log("✅ Barcha slug'lar yangilandi!");
  } catch (error) {
    console.error("❌ Xatolik:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSlugs();
