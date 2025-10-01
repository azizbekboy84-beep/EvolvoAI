import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const categories = [
  "biznes",
  "texnologiya",
  "marketing",
  "AI",
  "dasturlash",
  "startaplar",
  "dizayn",
  "sotsiomedia",
  "e-commerce",
  "avtomatlashtirish",
  "chatbotlar",
  "SEO",
];

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export async function generateBlogPost(category: string): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Sen professional ${category} bo'yicha kontent yozuvchisan. 
O'zbek auditoriyasi uchun qiziqarli, amaliy va SEO-optimallashtirilgan blog post yarat. 

Mavzu: ${category} sohasida dolzarb va amaliy mavzu tanlang
Format:
- Catchy sarlavha (50-60 belgi)
- Qisqa kirish (150-160 belgi) - bu excerpt bo'ladi
- Asosiy kontent (800-1200 so'z):
  * Kirish qismi (2-3 paragraf)
  * 3-4 ta asosiy bo'lim (har biri subheading bilan)
  * Amaliy maslahatlar yoki misollar
  * Xulosa + CTA
- SEO sarlavha (60 belgi)
- SEO tavsif (150-160 belgi)
- 5-8 ta kalit so'z (vergul bilan ajratilgan)

Ton: professional, do'stona, sodda tilda
Format: Markdown

Javobni quyidagi JSON formatda qaytaring:
{
  "title": "Blog post sarlavhasi",
  "excerpt": "Qisqa tavsif",
  "content": "To'liq markdown kontent",
  "seoTitle": "SEO sarlavha",
  "seoDescription": "SEO tavsif",
  "keywords": ["kalit1", "kalit2", "kalit3"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response and parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from Gemini response");
    }

    const parsedContent: GeneratedContent = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!parsedContent.title || !parsedContent.content) {
      throw new Error("Generated content is missing required fields");
    }

    return parsedContent;
  } catch (error) {
    console.error(`Error generating content for ${category}:`, error);
    throw error;
  }
}

export async function generateMultiplePosts(
  categories: string[],
  maxConcurrent: number = 3
): Promise<Array<{ category: string; content: GeneratedContent | null; error?: string }>> {
  const results: Array<{ category: string; content: GeneratedContent | null; error?: string }> = [];

  // Process in batches to avoid rate limiting
  for (let i = 0; i < categories.length; i += maxConcurrent) {
    const batch = categories.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(async (category) => {
      try {
        const content = await generateBlogPost(category);
        return { category, content };
      } catch (error) {
        return {
          category,
          content: null,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Wait a bit between batches to avoid rate limiting
    if (i + maxConcurrent < categories.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return results;
}
