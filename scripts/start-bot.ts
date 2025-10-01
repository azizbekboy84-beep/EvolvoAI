#!/usr/bin/env ts-node

/**
 * Telegram Bot Starter Script
 * Run this to start the Telegram bot separately from the web server
 */

import { startBot } from "../lib/telegram";

async function main() {
  console.log("🤖 Starting Telegram Bot...");
  
  try {
    await startBot();
    console.log("✅ Bot is running successfully!");
  } catch (error) {
    console.error("❌ Error starting bot:", error);
    process.exit(1);
  }
}

main();
