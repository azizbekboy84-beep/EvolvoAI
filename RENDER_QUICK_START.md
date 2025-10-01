# 🚀 Render'ga Deploy - Tezkor Qo'llanma

## 1️⃣ GitHub'ga Yuklash

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## 2️⃣ Render'da PostgreSQL Yaratish

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **PostgreSQL**
2. Name: `evolvoai-db`
3. Plan: **Free**
4. **Create Database**
5. **Internal Database URL** ni nusxalang (kerak bo'ladi)

## 3️⃣ Web Service Yaratish

1. **New** → **Web Service**
2. GitHub repo tanlang
3. Sozlamalar:
   - **Name:** `evolvoai`
   - **Build Command:**
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```

## 4️⃣ Environment Variables

```env
DATABASE_URL=<paste_internal_db_url_from_step_2>
NODE_ENV=production
NEXTAUTH_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
GEMINI_API_KEY=<your_key>
TELEGRAM_BOT_TOKEN=<your_token>
TELEGRAM_CHANNEL_ID=@your_channel
TELEGRAM_ADMIN_ID=<your_id>
CRON_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

## 5️⃣ Deploy Boshlash

**Create Web Service** → Kutish (5-10 daqiqa)

## 6️⃣ Database Setup

Deploy tugagach, **Shell** orqali:

```bash
npx prisma db push
npm run create-admin
```

## 7️⃣ Telegram Webhook

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -d "url=https://your-app-name.onrender.com/api/telegram"
```

## ✅ Tayyor!

Saytingiz: `https://your-app-name.onrender.com`

---

**To'liq qo'llanma:** [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)
