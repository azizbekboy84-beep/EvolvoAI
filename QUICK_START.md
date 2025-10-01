# ⚡ Quick Start - 5 Daqiqada Ishga Tushirish

## 1️⃣ Dependencies (1 daqiqa)

```bash
npm install
```

## 2️⃣ API Keys (2 daqiqa)

### Gemini API Key
1. https://makersuite.google.com/app/apikey
2. "Create API Key" ni bosing
3. Nusxalang

### Telegram Bot  
1. Telegram'da @BotFather ni oching
2. `/newbot` yuboring
3. Token nusxalang

## 3️⃣ Environment Setup (1 daqiqa)

`.env` yarating:

```env
# Minimal config (faqat shu ikkalasi yetarli test uchun)
GEMINI_API_KEY="sizning_gemini_key"
TELEGRAM_BOT_TOKEN="sizning_bot_token"

# Database (keyinroq qo'shish mumkin)
DATABASE_URL="postgresql://postgres:password@localhost:5432/evolvoai"

# Boshqalar
NEXTAUTH_SECRET="random123"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 4️⃣ Run (1 daqiqa)

```bash
npm run dev
```

Ochish: http://localhost:3000

## ✅ Tayyor!

### Keyingi qadamlar:

**Database sozlash (ixtiyoriy):**
```bash
npm run db:push
npm run db:setup
```

**Content generate qilish:**
```bash
npm run generate:content AI
```

**Telegram bot ishga tushirish:**
```bash
npm run bot:start
```

## 🐛 Muammolar?

**Port band:**
```bash
npm run dev -- -p 3001
```

**Dependencies error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database'siz test:**
- Mock data bilan ishlaydi
- Keyinroq database qo'shish mumkin

---

**Hammasi shu! Dasturlashdan rohatlaning! 🚀**
