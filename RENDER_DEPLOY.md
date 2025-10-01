# EvolvoAI - Render.com Deploy Qo'llanma

## 📋 Talab qilinadigan narsalar

- GitHub hisobi
- Render.com hisobi (bepul)
- PostgreSQL database (Render bilan birga bepul)
- Telegram Bot Token
- Google Gemini API Key

## 🚀 Deploy Qadamlari

### 1. GitHub Repositoriyasini Tayyorlash

```bash
# Git ni ishga tushirish
git init
git add .
git commit -m "Initial commit: EvolvoAI ready for Render"

# GitHub'ga yuklash
git branch -M main
git remote add origin https://github.com/username/evolvoai.git
git push -u origin main
```

### 2. Render.com'da Hisob Ochish

1. [render.com](https://render.com) ga kiring
2. GitHub bilan login qiling
3. Render hisobingizni tasdiqlang

### 3. PostgreSQL Database Yaratish

1. Dashboard → **New** → **PostgreSQL**
2. Quyidagi ma'lumotlarni kiriting:
   - **Name:** `evolvoai-db`
   - **Database:** `evolvoai`
   - **User:** `evolvoai`
   - **Region:** Singapore (yoki yaqin region)
   - **Plan:** Free
3. **Create Database** tugmasini bosing
4. Database yaratilgandan keyin **Internal Database URL** ni nusxalang

### 4. Web Service Yaratish

1. Dashboard → **New** → **Web Service**
2. GitHub repositoriyangizni tanlang
3. Quyidagi sozlamalarni kiriting:

#### Basic Settings
- **Name:** `evolvoai`
- **Region:** Singapore
- **Branch:** `main`
- **Root Directory:** (bo'sh qoldiring)
- **Environment:** Node
- **Build Command:** 
  ```bash
  npm install && npx prisma generate && npm run build
  ```
- **Start Command:**
  ```bash
  npm start
  ```

#### Advanced Settings
- **Plan:** Free
- **Auto-Deploy:** Yes (tavsiya etiladi)

### 5. Environment Variables Sozlash

**Environment** bo'limida quyidagi o'zgaruvchilarni qo'shing:

```env
# Database
DATABASE_URL=<paste_your_internal_database_url>

# Next.js
NODE_ENV=production
NODE_VERSION=18.17.0

# NextAuth
NEXTAUTH_SECRET=<generate_random_string>
NEXTAUTH_URL=https://your-app-name.onrender.com

# App URL
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com

# Gemini AI
GEMINI_API_KEY=<your_gemini_api_key>

# Telegram Bot
TELEGRAM_BOT_TOKEN=<your_bot_token>
TELEGRAM_CHANNEL_ID=@your_channel
TELEGRAM_ADMIN_ID=<your_telegram_id>

# Cron Secret
CRON_SECRET=<generate_random_string>
```

#### Secret Generator
```bash
# NEXTAUTH_SECRET va CRON_SECRET uchun
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Deploy Qilish

1. Barcha sozlamalarni saqladingizmi tekshiring
2. **Create Web Service** tugmasini bosing
3. Deploy jarayoni boshlanadi (5-10 daqiqa)
4. Build logs'ni kuzating

### 7. Database Migration

Deploy tugagandan keyin database'ga schema o'rnatish kerak:

1. Render Dashboard'da web service'ingizni oching
2. **Shell** tugmasini bosing yoki quyidagi buyruqni kiriting:

```bash
npx prisma db push
```

3. Admin foydalanuvchisini yaratish:

```bash
npm run create-admin
```

Yoki Shell'da:

```bash
node scripts/create-admin.js
```

### 8. Telegram Bot Webhook Sozlash

Deploy tugagandan keyin webhook o'rnating:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app-name.onrender.com/api/telegram"}'
```

Webhook tekshirish:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

### 9. Health Check Tekshirish

Loyihangiz ishlab turganini tekshirish:

```bash
curl https://your-app-name.onrender.com/api/health
```

Javob:
```json
{
  "status": "ok",
  "timestamp": "2025-10-01T04:00:00.000Z",
  "database": "connected",
  "service": "EvolvoAI"
}
```

## 🔧 Qo'shimcha Sozlamalar

### Custom Domain

1. Dashboard → Settings → **Custom Domains**
2. Domeningizni qo'shing (masalan: `evolvoai.uz`)
3. DNS Provider'da CNAME record qo'shing:
   ```
   Type: CNAME
   Name: www (yoki @)
   Value: your-app-name.onrender.com
   ```
4. SSL avtomatik sozlanadi

### Background Worker (Telegram Bot)

Agar botni alohida worker sifatida ishlatmoqchi bo'lsangiz:

1. Dashboard → **New** → **Background Worker**
2. Repository tanlang
3. Sozlamalar:
   - **Name:** `evolvoai-bot`
   - **Build Command:** `npm install && npx prisma generate`
   - **Start Command:** `npm run bot:start`
4. Environment variables'ni web service'dan nusxalang

### Cron Jobs

Render'da Cron Job'lar uchun:

1. Dashboard → **New** → **Cron Job**
2. Sozlamalar:
   - **Name:** `content-generator`
   - **Command:** `npm run generate:content`
   - **Schedule:** `0 3 * * *` (har kuni 08:00 UTC+5)
3. Environment variables qo'shing

## 📊 Monitoring

### Logs ko'rish

1. Dashboard → Service → **Logs**
2. Real-time logs kuzatish mumkin
3. Filter qilish: Error, Warning, Info

### Metrics

1. Dashboard → Service → **Metrics**
2. CPU, Memory, Request rate ko'rish
3. Response time monitoring

## 🔄 Yangilanishlar Deploy Qilish

Render avtomatik deploy qiladi (Auto-Deploy yoqilgan bo'lsa):

```bash
git add .
git commit -m "Update: new features"
git push origin main
```

Manual deploy:
1. Dashboard → Service → **Manual Deploy**
2. **Deploy latest commit** tugmasini bosing

## 🐛 Troubleshooting

### Build xatoliklari

**Muammo:** `Cannot find module 'prisma'`
**Yechim:** Build command'da `npx prisma generate` borligini tekshiring

**Muammo:** Database connection error
**Yechim:** 
- `DATABASE_URL` to'g'ri formatda ekanligini tekshiring
- Database running ekanligini tekshiring
- Internal Database URL ishlatayotganingizni tasdiqlang

### Runtime xatoliklari

**Muammo:** 503 Service Unavailable
**Yechim:**
- Logs'ni tekshiring
- Health check endpoint'ni sinab ko'ring
- Environment variables to'liq kiritilganini tekshiring

**Muammo:** Telegram bot javob bermayapti
**Yechim:**
- Webhook to'g'ri o'rnatilganini tekshiring
- Bot token to'g'ri ekanligini tasdiqlang
- `/api/telegram` endpoint ishlab turganini tekshiring

### Database Migration

Agar schema o'zgartirgan bo'lsangiz:

```bash
# Render Shell'da
npx prisma db push

# Yoki local'dan
DATABASE_URL="your_render_db_url" npx prisma db push
```

## 💰 Narxlar (Free Tier)

Render Free Plan:
- ✅ 750 soat/oy web service
- ✅ 1GB PostgreSQL database
- ✅ 100GB bandwidth
- ✅ SSL certificate (bepul)
- ⚠️ Service 15 daqiqadan keyin uxlaydi (inactivity)

**Eslatma:** Production uchun Starter yoki Pro plan tavsiya etiladi.

## 📞 Yordam

Muammoga duch kelsangiz:

1. **Render Docs:** https://render.com/docs
2. **Render Community:** https://community.render.com
3. **EvolvoAI Support:** 
   - Telegram: @evolvoai
   - Email: info@evolvoai.uz

## ✅ Deploy Checklist

- [ ] GitHub'ga kod yuklangan
- [ ] Render hisobi yaratilgan
- [ ] PostgreSQL database yaratilgan
- [ ] Web service yaratilgan
- [ ] Environment variables to'liq kiritilgan
- [ ] Database migration bajarilgan
- [ ] Admin user yaratilgan
- [ ] Telegram webhook o'rnatilgan
- [ ] Health check ishlayapti
- [ ] Custom domain sozlangan (ixtiyoriy)

---

**Muvaffaqiyatli deploy!** 🎉

Savollaringiz bo'lsa, yordam so'rang!
