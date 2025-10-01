import cron from "node-cron";
import { categories } from "./gemini";

export function setupCronJobs() {
  // Daily content generation at 08:00 UTC+5
  cron.schedule("0 8 * * *", async () => {
    console.log("Running daily blog post generation...");
    
    try {
      // Select random category for daily post
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CRON_SECRET}`,
        },
        body: JSON.stringify({ category: randomCategory }),
      });

      const result = await response.json();
      console.log("Daily post generated:", result);
    } catch (error) {
      console.error("Error in daily cron job:", error);
    }
  });

  // Weekly batch generation on Sundays at 10:00 UTC+5
  cron.schedule("0 10 * * 0", async () => {
    console.log("Running weekly batch generation...");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.CRON_SECRET}`,
        },
      });

      const result = await response.json();
      console.log("Weekly batch completed:", result);
    } catch (error) {
      console.error("Error in weekly cron job:", error);
    }
  });

  console.log("Cron jobs configured successfully");
}
