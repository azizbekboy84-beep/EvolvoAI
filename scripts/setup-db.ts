#!/usr/bin/env ts-node

/**
 * Database Setup Script
 * Run this to set up initial database data
 */

import { prisma } from "../lib/prisma";

async function main() {
  console.log("🗄️  Setting up database...\n");

  try {
    // Create initial settings
    console.log("Creating initial settings...");
    
    const settings = [
      {
        key: "site_name",
        value: "EvolvoAI",
        description: "Website name",
      },
      {
        key: "contact_email",
        value: "info@evolvoai.uz",
        description: "Contact email address",
      },
      {
        key: "telegram_channel",
        value: "@evolvoai",
        description: "Telegram channel username",
      },
      {
        key: "auto_publish",
        value: "true",
        description: "Auto-publish generated content",
      },
    ];

    for (const setting of settings) {
      await prisma.settings.upsert({
        where: { key: setting.key },
        update: setting,
        create: setting,
      });
      console.log(`✅ Created setting: ${setting.key}`);
    }

    console.log("\n✅ Database setup completed!");
    
    // Show statistics
    const postCount = await prisma.blogPost.count();
    const contactCount = await prisma.contact.count();
    const subscriberCount = await prisma.subscriber.count();
    
    console.log("\n📊 Current Statistics:");
    console.log(`   Blog Posts: ${postCount}`);
    console.log(`   Contacts: ${contactCount}`);
    console.log(`   Subscribers: ${subscriberCount}`);
    
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
