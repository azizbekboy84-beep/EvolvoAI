# 🖼️ Unsplash API Integration - Setup Guide

## 📋 Nima Uchun Unsplash?

Unsplash API blog postlar uchun **professional, unique va bepul** rasmlar taqdim etadi:

✅ **200,000+ professional rasmlar**  
✅ **Har safar boshqa rasm** (random selection)  
✅ **Kategoriyaga mos** (AI, biznes, marketing, etc.)  
✅ **Free tier: 50 requests/hour** (kifoya)  
✅ **Commercial use allowed**  
✅ **High quality images (1080px)**  

---

## 🚀 Setup Qilish (5 daqiqa)

### 1. Unsplash Developer Account Yaratish

1. **Website:** https://unsplash.com/developers
2. **Sign up/Login** qiling
3. **"New Application"** bosing
4. **Form to'ldiring:**
   - Application name: `EvolvoAI Blog`
   - Description: `Blog post images for EvolvoAI website`
   - Accept terms & conditions

### 2. Access Key Olish

Application yaratilgandan keyin:
1. **"Keys"** tabga o'ting
2. **Access Key** ni ko'chirib oling
3. **Secret Key** kerak emas (faqat Access Key)

### 3. `.env` Faylga Qo'shish

`.env` faylingizni oching va qo'shing:

```bash
# Unsplash Images (for blog posts)
UNSPLASH_ACCESS_KEY="your_access_key_here"
```

**Misol:**
```bash
UNSPLASH_ACCESS_KEY="abc123def456ghi789jkl012mno345pqr678"
```

---

## 🎯 Qanday Ishlaydi?

### Kategoriya → Rasm Matching

Har bir blog kategoriyasi uchun maxsus search queries:

| Kategoriya | Search Keywords |
|------------|-----------------|
| 🤖 AI | "artificial intelligence", "machine learning", "neural network" |
| 💼 Biznes | "business meeting", "office workspace", "corporate" |
| 📊 Marketing | "marketing strategy", "social media", "analytics" |
| 💻 Dasturlash | "programming", "code editor", "developer workspace" |
| 🚀 Startaplar | "startup office", "innovation", "entrepreneurs" |
| 🎨 Dizayn | "graphic design", "creative workspace", "ui ux" |

### Unique Image Selection

```typescript
// Har safar:
1. Random search query tanlanadi
2. Random page (1-10) tanlanadi  
3. Unsplash API dan yangi rasm keladi
4. Database ga saqlanadi
```

**Natija:** Bir xil rasmlar takrorlanmaydi! ✨

---

## 📊 Limitlar va Best Practices

### Free Tier Limits

- **50 requests/hour** (bizga yetadi)
- **Unlimited bandwidth**
- **No rate limit on image views**

### Bizning Usage:

| Scenario | Requests/Day | Status |
|----------|--------------|--------|
| Manual generation (1 post) | 1 | ✅ OK |
| Daily cron (1 post/day) | 1 | ✅ OK |
| Weekly batch (12 posts) | 12 | ✅ OK |
| Testing (10 posts) | 10 | ✅ OK |

**Xulosa:** 50/hour limit bilan muammo yo'q! 🎉

### Rate Limit Protection

Kodda built-in protection bor:

```typescript
// Batch generation uchun 2 sekund kutadi
await new Promise(resolve => setTimeout(resolve, 2000));
```

---

## 🧪 Test Qilish

### 1. Bitta Post Generate Qilish

```bash
npm run generate:content marketing
```

**Output:**
```
📝 Generating post for category: marketing
   🤖 Generating content with Gemini AI...
   🖼️  Fetching image from Unsplash...
   ✓ Image: https://images.unsplash.com/photo-xxx
   ✓ By: John Doe
✅ Post created successfully!
   Title: Marketing Strategiyalari 2025
   Image: John Doe on Unsplash
```

### 2. API Orqali Test

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Authorization: Bearer your_cron_secret" \
  -H "Content-Type: application/json" \
  -d '{"category":"AI"}'
```

---

## 🎨 Kategoriya Examples

### AI Category
![AI Example](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400)
- Neural networks
- AI chips
- Technology concepts

### Biznes Category
![Biznes Example](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400)
- Office meetings
- Handshakes
- Corporate events

### Marketing Category
![Marketing Example](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400)
- Analytics dashboards
- Social media
- Graphs & charts

---

## 🔧 Troubleshooting

### ❌ Error: "UNSPLASH_ACCESS_KEY not set"

**Solution:**
```bash
# .env faylni tekshiring
UNSPLASH_ACCESS_KEY="your_key_here"

# Serverni restart qiling
npm run dev
```

### ❌ Error: "Rate limit exceeded"

**Sabab:** 50 requests/hour limit oshdi

**Solution:**
```bash
# 1 soat kuting yoki
# Placeholder imagelarga o'tadi avtomatik
```

### ❌ Bir xil rasmlar qaytmoqda

**Sabab:** Cache yoki API issue

**Solution:**
```bash
# Random page va query tanlash ishlaydi
# Agar baribir takrorlanayotgan bo'lsa:
# - Clear browser cache
# - Restart server
```

---

## 📜 Unsplash API Guidelines

### Attribution (Majburiy emas, lekin tavsiya)

Rasm ostida credit qo'shsak yaxshi:

```html
Photo by <a href="photographer_url">Author Name</a> on 
<a href="https://unsplash.com">Unsplash</a>
```

### Download Tracking

**Muhim:** Har safar rasm ishlatilganda download track qilish kerak:

```typescript
// Kod allaqachon bor
await trackImageDownload(image.downloadUrl);
```

Bu Unsplash'ning API shartlari! ✅

---

## 🎁 Bonus: Manual Image Search

Agar maxsus rasm kerak bo'lsa:

```typescript
import { searchImages } from "@/lib/unsplash";

const images = await searchImages("artificial intelligence", 1, 10);
// Returns: 10 AI related images
```

---

## 📊 Summary

| Feature | Status | Notes |
|---------|--------|-------|
| ✅ Unique images | Working | Random selection |
| ✅ Category matching | Working | 12 categories |
| ✅ Free tier | Enough | 50/hour |
| ✅ Auto-download track | Working | API requirement |
| ✅ Fallback system | Working | Placeholder if API fails |
| ✅ Rate limit protection | Working | 2s delay |

---

## 🔗 Useful Links

- **Unsplash Developers:** https://unsplash.com/developers
- **API Documentation:** https://unsplash.com/documentation
- **Free Images:** https://unsplash.com

---

**Setup Time:** 5 daqiqa  
**Cost:** 100% Free  
**Quality:** Professional  
**Variety:** 200,000+ images  

Enjoy! 🎉
