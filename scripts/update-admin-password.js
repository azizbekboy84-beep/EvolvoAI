const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🔐 Admin parolni yangilash...\n");

  const email = "admin@evolvoai.uz";
  const newPassword = "GisoBot#201415!"; // YANGI PAROLNI SHU YERGA YOZING!

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("❌ Admin topilmadi!");
    return;
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log("✅ Parol muvaffaqiyatli yangilandi!\n");
  console.log("📧 Email:", email);
  console.log("🔑 Yangi Parol:", newPassword);
  console.log("\nLogin URL: http://localhost:3000/admin/login\n");
}

main()
  .catch((error) => {
    console.error("❌ Xatolik:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
