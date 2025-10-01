#!/usr/bin/env ts-node

/**
 * Server Startup Script
 * This script starts the Next.js server and sets up cron jobs
 */

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { setupCronJobs } from "./lib/cron";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function main() {
  try {
    await app.prepare();

    // Setup cron jobs for automated content generation
    setupCronJobs();

    // Create HTTP server
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url || "/", true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });

    server.listen(port, () => {
      console.log(`🚀 Server running at http://${hostname}:${port}/`);
      console.log(`📊 Environment: ${dev ? "Development" : "Production"}`);
      console.log(`⏰ Cron jobs are active`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

main();
