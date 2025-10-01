# EvolvoAI - Render Deploy

Bu loyiha Render.com'ga deploy qilishga tayyor.

## 📁 Render Uchun Fayllar

- ✅ `render.yaml` - Render konfiguratsiyasi
- ✅ `app/api/health/route.ts` - Health check endpoint
- ✅ `.renderignore` - Deploy'dan chiqariladigan fayllar
- ✅ `RENDER_DEPLOY.md` - To'liq deploy qo'llanmasi
- ✅ `RENDER_QUICK_START.md` - Tezkor boshlash qo'llanmasi

## 🚀 Tezkor Deploy

```bash
# 1. GitHub'ga yuklash
git add .
git commit -m "Ready for Render"
git push origin main

# 2. Render.com'da
# - PostgreSQL database yaratish
# - Web Service yaratish
# - Environment variables sozlash

# 3. Deploy tugagach
npx prisma db push
npm run create-admin
```

## 📚 Qo'llanmalar

- **Tezkor:** [RENDER_QUICK_START.md](./RENDER_QUICK_START.md)
- **To'liq:** [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)

## 💡 Muhim

1. Free tier 15 daqiqa inactivity'dan keyin uxlaydi
2. Database backup muntazam oling
3. Environment variables to'g'ri kiritilganini tekshiring
4. Health check: `/api/health`

## 🔗 Foydali Linklar

- [Render Dashboard](https://dashboard.render.com)
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com)

---

**Muvaffaqiyatli deploy!** 🎉
