#!/usr/bin/env ts-node

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🔐 Admin foydalanuvchi yaratilmoqda...\n");

  const email = "admin@evolvoai.uz";
  const password = "admin123"; // O'zingizni parolingizni kiriting!
  const name = "Admin";

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("⚠️  Admin user allaqachon mavjud!");
    console.log(`Email: ${email}\n`);
    return;
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin muvaffaqiyatli yaratildi!\n");
  console.log("📧 Email:", email);
  console.log("🔑 Parol:", password);
  console.log("⚠️  MUHIM: Parolni o'zgartiring!\n");
  console.log("Login URL: http://localhost:3000/admin/login\n");
}

main()
  .catch((error) => {
    console.error("❌ Xatolik:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
