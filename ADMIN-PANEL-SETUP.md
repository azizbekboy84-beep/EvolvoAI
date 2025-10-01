# 🎨 Admin Panel Setup Guide

## 🚀 Quick Start

### 1. Database Migration (MUHIM!)

Yangi modellar qo'shildi: **Project** va **Customer**. Ularni database'ga qo'shish kerak:

```bash
# 1. Prisma client regenerate
npx prisma generate

# 2. Database migration
npx prisma db push

# Yoki development uchun:
npm run db:push
```

**Qanday ishlaydi:**
- Schema'dagi yangi modellar database'ga qo'shiladi
- Prisma Client yangilanadi
- TypeScript types avtomatik yaratiladi

---

## 📁 Yaratilgan Fayllar

### Layouts & Navigation
```
✅ components/admin/admin-layout.tsx       # Asosiy layout wrapper
✅ components/admin/admin-sidebar.tsx      # Collapsible sidebar
✅ components/admin/admin-topbar.tsx       # Search, notifications, profile
```

### Dashboard
```
✅ app/admin/(protected)/dashboard/page.tsx         # Dashboard page
✅ components/admin/dashboard/stats.tsx             # 4 ta stat cards
✅ components/admin/dashboard/quick-actions.tsx     # AI generator va shortcuts
✅ components/admin/dashboard/recent-activity.tsx   # So'nggi faoliyat
✅ components/admin/dashboard/analytics.tsx         # Haftalik chart
```

### Blog Management
```
✅ app/admin/(protected)/blog/page.tsx          # Blog list page
✅ app/admin/(protected)/blog/new/page.tsx      # Yangi post page
✅ components/admin/blog/blog-table.tsx         # Table with search/filter
✅ components/admin/blog/blog-editor.tsx        # Full editor with AI
```

### API Routes
```
✅ app/api/admin/stats/route.ts       # Dashboard statistika
✅ app/api/admin/activity/route.ts    # Recent activity
✅ app/api/admin/analytics/route.ts   # Chart data
```

### Prisma Schema
```
✅ Project model      # Portfolio items
✅ Customer model     # CRM mijozlar
✅ Order model        # Buyurtmalar (allaqachon bor)
✅ Client model       # Mijozlar (allaqachon bor)
```

---

## 🎯 Admin Panel Features

### 1. **Dashboard**
- ✅ **Stats Cards**: Blog, Projects, Orders, Customers
- ✅ **Quick Actions**: Yangi post, AI generator, Telegram
- ✅ **Recent Activity**: Real-time updates
- ✅ **Analytics Chart**: Haftalik statistika

### 2. **Blog Management**
- ✅ **Table View**: Search, filter by status
- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **AI Generator**: Gemini bilan avtomatik
- ✅ **Editor**: Markdown support
- ✅ **SEO**: Title, description, keywords
- ✅ **Categories**: 8 kategoriya

### 3. **Sidebar Navigation**
```
📊 Dashboard
📝 Blog Management
  ├── Barcha Postlar
  ├── Yangi Post
  ├── Kategoriyalar
  └── AI Settings
📁 Portfolio
  ├── Loyihalar
  ├── Yangi Loyiha
  └── Kategoriyalar
🛒 Buyurtmalar
  ├── Barcha
  ├── Yangi
  ├── Jarayonda
  └── Yakunlangan
👥 Mijozlar (CRM)
💬 Xabarlar
  ├── Kontakt Formalar
  └── Telegram Chat
📱 Telegram
  ├── Kanal Postlari
  ├── Bot Sozlamalari
  └── Statistika
⚙️ Sozlamalar
  ├── Sayt Sozlamalari
  ├── SEO Settings
  ├── AI Configuration
  └── Foydalanuvchilar
📈 Analytics
```

---

## 🔑 Kirish (Authentication)

**URL:** `/admin/dashboard`

**Auth:** NextAuth bilan (allaqachon sozlangan)
```bash
# Admin yaratish
npm run create-admin

# Parol yangilash
npm run update-password
```

**Default:** Email va parol bilan

---

## 🎨 Dizayn Sistema

### Color Palette
- **Background**: `#0A0E27` (dark blue)
- **Cards**: `rgba(26, 31, 58, 0.5)` (glassmorphism)
- **Primary**: `#FF0080` (neon pink)
- **Secondary**: `#7928CA` (purple)
- **Success**: `#00FF87` (neon green)
- **Warning**: `#FFD700` (gold)

### Components
- **Glassmorphism**: Blur 20px, opacity 0.5
- **Borders**: `rgba(255, 255, 255, 0.1)`
- **Gradient Buttons**: Pink → Purple
- **Hover Effects**: Scale 1.05, glow
- **Transitions**: 300ms smooth

---

## 🧪 Test Qilish

### 1. Dashboard Test
```bash
# Server ishga tushiring
npm run dev

# Browser'da oching
http://localhost:3000/admin/dashboard
```

**Kutilgan:**
- 4 ta stat card ko'rinadi
- Quick actions ishlaydi
- Recent activity ko'rsatiladi
- Chart animatsiya qiladi

### 2. Blog Management Test
```bash
# Blog page'ga o'ting
http://localhost:3000/admin/blog

# Yangi post yarating
http://localhost:3000/admin/blog/new
```

**Test cases:**
- ✅ Search ishlaydi
- ✅ Filter (Published/Draft)
- ✅ Delete confirmation
- ✅ AI generator button
- ✅ Editor save
- ✅ Preview link

---

## 🔧 API Endpoints

### Stats API
```typescript
GET /api/admin/stats
Response: {
  blogPosts: { total: number, change: number },
  projects: { total: number, change: number },
  orders: { total: number, change: number },
  customers: { total: number, change: number }
}
```

### Activity API
```typescript
GET /api/admin/activity
Response: {
  activities: Array<{
    id: string,
    type: "blog" | "project" | "order" | "customer",
    title: string,
    description: string,
    time: string
  }>
}
```

### Analytics API
```typescript
GET /api/admin/analytics
Response: {
  weekData: Array<{
    day: string,
    value: number
  }>
}
```

---

## 📊 Database Models

### Project
```prisma
model Project {
  id          String         @id @default(cuid())
  title       String
  slug        String         @unique
  description String         @db.Text
  category    String
  tags        String[]
  imageUrl    String
  demoUrl     String?
  githubUrl   String?
  technologies String[]
  clientName  String?
  completedAt DateTime?
  featured    Boolean        @default(false)
  status      ProjectStatus  @default(COMPLETED)
  views       Int            @default(0)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}
```

### Customer
```prisma
model Customer {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  phone       String?
  company     String?
  source      String   @default("website")
  tags        String[]
  notes       String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🚀 Keyingi Qadamlar

### Qilingan ✅
- [x] Dashboard layout
- [x] Stats cards with real data
- [x] Quick actions
- [x] Blog CRUD
- [x] AI content generator
- [x] Recent activity
- [x] Analytics chart
- [x] Search & filter

### To Do 📝
- [ ] Portfolio CRUD pages
- [ ] Orders management
- [ ] Customers CRM
- [ ] Messages inbox
- [ ] Telegram integration UI
- [ ] Settings pages
- [ ] Full analytics dashboard
- [ ] Image upload
- [ ] Bulk operations
- [ ] Export functionality

---

## 🐛 Troubleshooting

### Error: "project does not exist on PrismaClient"

**Sabab:** Prisma client yangilanmagan

**Yechim:**
```bash
npx prisma generate
npx prisma db push
```

### Error: "Cannot find module @/components/admin/..."

**Sabab:** TypeScript path mapping

**Yechim:** Server restart qiling
```bash
# Ctrl+C
npm run dev
```

### Stats ko'rinmayapti

**Sabab:** Database bo'sh

**Yechim:** Test data yarating
```bash
npm run generate:content
```

---

## 💡 Tips

### 1. AI Generator
"Tezkor Harakatlar" bo'limida "AI Blog Generator" tugmasini bosing - avtomatik post yaratiladi!

### 2. Sidebar Collapsible
Sidebar chapda collapse/expand qilish mumkin - ko'proq joy uchun.

### 3. Global Search
Topbar'dagi search (Ctrl+K) - barcha contentni qidiradi (coming soon).

### 4. Dark Mode
Hozircha faqat dark mode. Light mode keyinroq qo'shiladi.

---

## 🎉 Summary

Admin panel **50% tayyor**:
- ✅ Layout va navigation
- ✅ Dashboard to'liq
- ✅ Blog management to'liq
- ⏳ Portfolio - API ready, UI coming
- ⏳ Orders - API ready, UI coming
- ⏳ CRM - API ready, UI coming

**Next:** Portfolio management pages yaratish!

---

**Yaratildi:** 2025-01-10  
**Versiya:** 1.0 Beta  
**Status:** Development

Enjoy your admin panel! 🚀
