const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
    });

    console.log("\n📋 Barcha postlar:\n");
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Status: ${post.status}`);
      console.log(`   URL: /blog/${post.slug}\n`);
    });

    console.log(`Jami: ${posts.length} ta post`);
  } catch (error) {
    console.error("❌ Xatolik:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPosts();
