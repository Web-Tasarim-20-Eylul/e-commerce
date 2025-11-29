# 🚀 Implementasyon Rehberi

Bu doküman, RFC'leri sırayla nasıl uygulayacağınızı adım adım açıklar.

## 📋 Başlamadan Önce

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Git
- Visual Studio Code (önerilen)

### Proje Yapısı

```
e-commerce/
├── docs/              # RFC dokümanları (✅ Hazır)
├── src/
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── stores/       # Zustand stores (oluşturulacak)
│   └── hooks/        # Custom hooks (oluşturulacak)
├── public/           # Static files
└── package.json
```

## 🎯 Phase 1: Kritik Düzeltmeler (1-2 gün)

### ✅ Checkpoint 1.1: Tailwind Yapılandırması (30 dakika)

**RFC**: [RFC-001](./RFC-001-tailwind-ui-configuration.md)

```bash
# 1. Tailwind config güncelle
# tailwind.config.js dosyasını aç ve content array'ini doldur

# 2. Layout'a HeroUIProvider ekle
# src/app/layout.js dosyasını güncelle

# 3. Grid syntax düzelt
# src/app/page.js: grid-col-7 -> grid-cols-7

# 4. Dark mode CSS düzelt
# src/app/globals.css: media query düzelt

# 5. Test et
npm run dev
# Tarayıcıda localhost:3000 aç ve stillerin geldiğini kontrol et
```

**Tamamlanma Kriterleri**:

- [ ] Tailwind sınıfları çalışıyor
- [ ] HeroUI bileşenleri render ediliyor
- [ ] Grid düzgün görünüyor
- [ ] Dark mode çalışıyor

---

### ✅ Checkpoint 1.2: Error Handling (2-3 saat)

**RFC**: [RFC-002](./RFC-002-error-handling-loading.md)

```bash
# 1. Hooks klasörü oluştur
mkdir src/hooks

# 2. useFetch hook'u oluştur
# src/hooks/useFetch.js dosyasını oluştur

# 3. Components oluştur
# src/components/loading.jsx
# src/components/error-message.jsx
# src/components/product-skeleton.jsx

# 4. Ana sayfayı güncelle
# src/app/page.js - useFetch kullan

# 5. Test et
npm run dev
# Network'ü kapat ve error state'i test et
# Slow 3G simüle et ve loading state'i test et
```

**Tamamlanma Kriterleri**:

- [ ] useFetch hook çalışıyor
- [ ] Loading spinner görünüyor
- [ ] Error mesajları gösteriliyor
- [ ] Retry çalışıyor
- [ ] Skeleton loading güzel

---

## 🎯 Phase 2: State Management (2-3 gün)

### ✅ Checkpoint 2.1: Zustand Setup (1 saat)

**RFC**: [RFC-003](./RFC-003-state-management.md)

```bash
# 1. Zustand kur
npm install zustand

# 2. Stores klasörü oluştur
mkdir src/stores

# 3. Store'ları oluştur
# src/stores/useCartStore.js
# src/stores/useFavoritesStore.js
# src/stores/useUIStore.js
# src/stores/index.js (barrel export)

# 4. Test et
# Browser console'da store'u kontrol et
```

**Tamamlanma Kriterleri**:

- [ ] Zustand kuruldu
- [ ] Store'lar oluşturuldu
- [ ] LocalStorage persist çalışıyor

---

### ✅ Checkpoint 2.2: Sepet Sistemi (3-4 saat)

**RFC**: [RFC-004](./RFC-004-cart-system.md)

```bash
# 1. Cart components oluştur
# src/components/add-to-cart-button.jsx
# src/components/cart-item.jsx
# src/components/cart-summary.jsx
# src/components/empty-cart.jsx
# src/components/cart-badge.jsx

# 2. Sepet sayfasını güncelle
# src/app/sepet/page.jsx

# 3. Navbar'a badge ekle
# src/components/navbar.jsx - CartBadge ekle

# 4. Ana sayfaya butonu ekle
# src/app/page.js - AddToCartButton ekle

# 5. Test et
npm run dev
# Ürün ekle, çıkar, miktar değiştir
# Sayfa yenile ve sepet korunuyor mu kontrol et
```

**Tamamlanma Kriterleri**:

- [ ] Sepete ekleme çalışıyor
- [ ] Miktar kontrolü çalışıyor
- [ ] Toplam hesaplama doğru
- [ ] Badge güncelleniyor
- [ ] LocalStorage çalışıyor
- [ ] Boş sepet durumu güzel

---

## 🎯 Phase 3: Kategori ve Arama (2-3 gün)

### ✅ Checkpoint 3.1: Kategori Sayfaları (2-3 saat)

**RFC**: [RFC-005](./RFC-005-category-filtering.md)

```bash
# 1. Filter store oluştur
# src/stores/useFilterStore.js

# 2. Filter component oluştur
# src/components/product-filters.jsx
# src/components/category-nav.jsx

# 3. Kategori sayfası template
# src/app/kategori/[slug]/page.jsx

# 4. Mevcut sayfaları güncelle
# src/app/erkek/page.jsx -> redirect to /kategori/erkek

# 5. Test et
# Tüm kategorileri test et
# Filtreleri dene
```

**Tamamlanma Kriterleri**:

- [ ] Kategori sayfaları çalışıyor
- [ ] Fiyat filtreleme çalışıyor
- [ ] Sıralama çalışıyor
- [ ] Responsive

---

### ✅ Checkpoint 3.2: Arama (2-3 saat)

**RFC**: [RFC-006](./RFC-006-search-functionality.md)

```bash
# 1. Search input oluştur
# src/components/search-input.jsx

# 2. Arama sayfası oluştur
# src/app/arama/page.jsx

# 3. Navbar'a ekle
# src/components/navbar.jsx

# 4. Test et
# Ürün ara ve sonuçları kontrol et
```

**Tamamlanma Kriterleri**:

- [ ] Arama çalışıyor
- [ ] Sonuçlar gösteriliyor
- [ ] URL parametreleri çalışıyor

---

## 🎯 Phase 4: Performance ve SEO (2-3 gün)

### ✅ Checkpoint 4.1: Server Components (2-3 saat)

**RFC**: [RFC-007](./RFC-007-server-components.md)

```bash
# 1. Ana sayfayı server component'e çevir
# src/app/page.js - "use client" kaldır, async/await ekle

# 2. Ürün detayı güncelle
# src/app/[id]/page.jsx - generateMetadata ekle

# 3. Loading ve Error boundaries
# src/app/loading.js
# src/app/error.js
# src/app/not-found.js

# 4. ISR ekle
# fetch() içine next: { revalidate } ekle

# 5. Test et
npm run build
npm start
# Production build'de test et
```

**Tamamlanma Kriterleri**:

- [ ] Server components çalışıyor
- [ ] ISR yapılandırıldı
- [ ] Loading states
- [ ] Error boundaries
- [ ] Bundle size küçüldü

---

### ✅ Checkpoint 4.2: SEO (1-2 saat)

**RFC**: [RFC-008](./RFC-008-seo-optimization.md)

```bash
# 1. Root metadata ekle
# src/app/layout.js

# 2. Sitemap oluştur
# src/app/sitemap.js

# 3. Robots.txt
# src/app/robots.js

# 4. Structured data
# src/components/product-schema.jsx

# 5. Test et
# View Page Source ve meta tag'leri kontrol et
```

---

## 🎯 Phase 5: UI/UX (3-4 gün)

### ✅ Checkpoint 5.1: Responsive Design (3-4 saat)

**RFC**: [RFC-009](./RFC-009-responsive-design.md)

```bash
# 1. Mobile navbar
# src/components/mobile-nav.jsx

# 2. Bottom navigation
# src/components/bottom-nav.jsx

# 3. Filter drawer
# src/components/filter-drawer.jsx

# 4. Grid adjustments
# Responsive breakpoints güncelle

# 5. Test et
# Chrome DevTools - responsive mode
# Gerçek mobil cihazda test et
```

---

### ✅ Checkpoint 5.2: Animasyonlar (2-3 saat)

**RFC**: [RFC-010](./RFC-010-animations-transitions.md)

```bash
# 1. Framer Motion kur
npm install framer-motion

# 2. Page transitions
# src/components/page-transition.jsx

# 3. Card animations
# Hover ve tap animasyonları ekle

# 4. Micro-interactions
# Add to cart animation

# 5. Test et
# Tüm animasyonları test et
```

---

## 🎯 Phase 6: Ek Özellikler (4-5 gün)

### ✅ Checkpoint 6.1: Favoriler (2-3 saat)

**RFC**: [RFC-011](./RFC-011-user-favorites.md)

```bash
# 1. Favorite button
# src/components/favorite-button.jsx

# 2. Favoriler sayfası
# src/app/favoriler/page.jsx

# 3. Test et
```

---

### ✅ Checkpoint 6.2: Karşılaştırma (2-3 saat)

**RFC**: [RFC-012](./RFC-012-product-comparison.md)

```bash
# 1. Compare store
# src/stores/useCompareStore.js

# 2. Karşılaştırma sayfası
# src/app/karsilastir/page.jsx

# 3. Test et
```

---

## 🎉 Final Checklist

### Functionality

- [ ] Tüm sayfalar çalışıyor
- [ ] Sepet sistemi tamam
- [ ] Filtreler çalışıyor
- [ ] Arama çalışıyor
- [ ] Favoriler çalışıyor

### Performance

- [ ] Lighthouse score >90
- [ ] Bundle size optimize
- [ ] Images optimized
- [ ] ISR çalışıyor

### SEO

- [ ] Metadata tamamı
- [ ] Sitemap oluşturuldu
- [ ] Structured data
- [ ] OpenGraph tags

### Responsive

- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Touch targets uygun

### Code Quality

- [ ] ESLint clean
- [ ] TypeScript (opsiyonel)
- [ ] Tests (opsiyonel)
- [ ] Documentation

---

## 🚨 Sorun Giderme

### Problem: Tailwind sınıfları çalışmıyor

**Çözüm**:

```bash
# Cache temizle
rm -rf .next
npm run dev
```

### Problem: LocalStorage çalışmıyor

**Çözüm**:

- Browser console'da localStorage kontrol et
- Zustand persist middleware doğru kurulmuş mu?

### Problem: Build hatası

**Çözüm**:

```bash
npm run build
# Hata mesajını oku ve düzelt
```

---

## 📚 Yardımcı Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [HeroUI Docs](https://www.heroui.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

## 💬 Destek

Her phase sonunda:

1. Git commit yap
2. Test et
3. Dokümante et
4. Sonraki phase'e geç

İyi çalışmalar! 🚀
