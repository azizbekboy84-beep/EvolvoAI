# EvolvoAI - Deploy Qo'llanmasi

## 🚀 Render.com Deploy (Tavsiya etiladi)

### Birinchi Deploy

1. **GitHub repositoriyasi yaratish**
```bash
git init
git add .
git commit -m "Birinchi commit: EvolvoAI platformasi"
git branch -M main
git remote add origin https://github.com/username/evolvoai.git
git push -u origin main
```

2. **Render.com ga kirish**
- [render.com](https://render.com) ga kiring
- GitHub bilan login qiling

3. **Web Service yaratish**
- "New +" → "Web Service" ni bosing
- GitHub repositoriyangizni tanlang (azizbekboy84-beep/EvolvoAI)
- Quyidagi sozlamalarni kiriting:

**Build Settings:**
- **Name**: evolvoai (yoki o'zingiz xohlagan nom)
- **Region**: Singapore (yoki yaqin region)
- **Branch**: main
- **Root Directory**: (bo'sh qoldiring)
- **Runtime**: Node
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm start`

4. **Environment Variables**
"Environment" bo'limida quyidagi o'zgaruvchilarni qo'shing:

```env
NODE_ENV=production
DATABASE_URL=<Keyinroq qo'shiladi>
GEMINI_API_KEY=sizning_gemini_api_keyingiz
TELEGRAM_BOT_TOKEN=sizning_telegram_bot_tokeningiz
TELEGRAM_CHANNEL_ID=@sizning_kanal_idingiz
TELEGRAM_ADMIN_ID=sizning_telegram_idingiz
NEXTAUTH_SECRET=tasodifiy_32_belgili_string
NEXTAUTH_URL=https://evolvoai.onrender.com
NEXT_PUBLIC_APP_URL=https://evolvoai.onrender.com
CRON_SECRET=tasodifiy_string
```

**Muhim:** NEXTAUTH_SECRET va CRON_SECRET uchun kuchli tasodifiy stringlar yarating:
```bash
# PowerShell da generate qilish:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

5. **Deploy qiling**
- "Create Web Service" tugmasini bosing
- 5-10 daqiqada deploy tugaydi

### Database Setup (Render PostgreSQL)

1. **PostgreSQL Database yaratish:**
   - Render dashboard'da "New +" → "PostgreSQL"
   - Quyidagi sozlamalar:
     - **Name**: evolvoai-db
     - **Database**: evolvoai
     - **User**: evolvoai_user
     - **Region**: Singapore (Web Service bilan bir xil)
     - **Plan**: Free
   - "Create Database" bosing

2. **Database URL ni Web Service'ga ulash:**
   - Database yaratilgandan so'ng "Info" tabida "Internal Database URL" ni ko'ring
   - Web Service'ingizga o'ting → "Environment"
   - `DATABASE_URL` o'zgaruvchisini yangilang (Internal Database URL qo'ying)
   - "Save Changes" bosing

3. **Database schema yaratish:**
   - Web Service deploy tugagandan so'ng, Render avtomatik `npx prisma generate` ishga tushiradi
   - Agar kerak bo'lsa, Shell orqali manual run qiling:
   ```bash
   npx prisma db push
   ```

### Domen sozlash

1. Render dashboard'da "Settings" → "Custom Domains"
2. O'zingizning domeningizni qo'shing (masalan: `evolvoai.uz`)
3. DNS sozlamalarini yangilang
4. SSL avtomatik sozlanadi

## 📱 Telegram Bot Deploy

### Webhook o'rnatish
```bash
curl -X POST https://api.telegram.org/bot<SIZNING_BOT_TOKEN>/setWebhook \
  -d "url=https://sizinig-domeningiz.onrender.com/api/telegram"
```

### Webhook tekshirish
```bash
curl https://api.telegram.org/bot<SIZNING_BOT_TOKEN>/getWebhookInfo
```

## ⏰ Cron Jobs (Render)

Render avtomatik cron jobs ishga tushiradi:
- Har kuni 08:00 UTC+5 da content generate qiladi
- Render dashboard'da "Cron Jobs" bo'limida ko'rish mumkin

### Manual trigger (test uchun)
```bash
curl -X POST https://sizinig-domeningiz.onrender.com/api/generate \
  -H "Authorization: Bearer SIZNING_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"category": "AI"}'
```

## 🔐 Security Checklist

- ✅ `.env` fayllar `.gitignore`'da
- ✅ API routes authorization bilan himoyalangan
- ✅ Environment variables Render'da sozlangan
- ✅ CORS sozlamalari to'g'ri
- ✅ Rate limiting mavjud (Render Edge)

## 📊 Monitoring

### Health Checks
```bash
curl https://sizinig-domeningiz.onrender.com/api/health
```

### Logs ko'rish
- Render dashboard → "Logs" bo'limida
- Real-time monitoring

## 🔄 Updates Deploy

Har safar `main` branchga push qilganingizda avtomatik deploy bo'ladi:

```bash
git add .
git commit -m "Yangilanish: feature tavsifi"
git push origin main
```

## 🌐 Custom Domain Setup

### Domain provider (masalan, Cloudflare)

1. **A Record:**
```
Type: A
Name: @
Content: 216.24.57.1
```

2. **CNAME Record:**
```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
```

3. Render'da domain verify qiling

## 🚦 Health Checks

### Status endpoint yaratish
`app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

### Test qilish:
```bash
curl https://sizinig-domeningiz.onrender.com/api/health
```

## 📱 Alternative Deployments

### Vercel (Alternative)
```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Railway.app
```bash
# Railway CLI o'rnatish
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

## 🐛 Troubleshooting

### Build xatoligi
- Environment variables ni tekshiring
- `DATABASE_URL` to'g'ri formatda ekanligini tekshiring
- Render logs'da batafsil xatolikni ko'ring

### Database connection xatoligi
- PostgreSQL database ishlayotganini tekshiring
- Connection string formatini tekshiring
- Render IP ranges whitelist qilinganini tekshiring

### Telegram bot javob bermaydi
- Webhook to'g'ri o'rnatilganini tekshiring
- Bot token valid ekanligini tekshiring
- Function logs'da xatolikni ko'ring

### Cron jobs ishlamaydi
- Environment variables'da `CRON_SECRET` mavjudligini tekshiring
- `/api/generate` endpoint ishlayotganini tekshiring

## 📞 Support

Muammo yuzaga kelsa:
- Render logs: Dashboard → Service → Logs
- Telegram support: @evolvoaiuz_bot
- Email: azizbekboy84@gmail.com
- Telefon: +998 99 644 84 44
- Manzil: Toshkent, Nurafshon aylanma yo'li 12 uy

---

**Muvaffaqiyatli deploy!** 🎉
