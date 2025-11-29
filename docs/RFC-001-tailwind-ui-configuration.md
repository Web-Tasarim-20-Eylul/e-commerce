# RFC-001: Tailwind ve UI Yapılandırması

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔴 Kritik  
**Phase**: 1

## 📝 Özet

Tailwind CSS ve HeroUI kütüphanesinin doğru yapılandırılması ve mevcut CSS hatalarının düzeltilmesi.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Tailwind Content Yapılandırması Eksik**: `tailwind.config.js` dosyasında `content` array'i boş, bu yüzden Tailwind sınıfları üretilmiyor
2. **HeroUI Provider Eksik**: HeroUI bileşenleri Provider olmadan düzgün çalışmıyor
3. **Grid Syntax Hatası**: `grid-col-7` yerine `grid-cols-7` olmalı
4. **Dark Mode CSS Hatası**: `globals.css` dosyasında yanlış media query

### Beklenen Sonuçlar

- Tailwind sınıflarının tüm sayfalarda çalışması
- HeroUI bileşenlerinin doğru render edilmesi
- Dark mode'un düzgün çalışması
- Grid layout'un doğru görünmesi

## 🔧 Detaylı Tasarım

### 1. Tailwind Yapılandırması

**Dosya**: `tailwind.config.js`

```javascript
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
```

### 2. Layout Provider Eklenmesi

**Dosya**: `src/components/providers.jsx`

```javascript
"use client";

import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
```

**Dosya**: `src/app/layout.js`

```javascript
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**Not**: Next.js 15+ ile HeroUIProvider direkt olarak Server Component'te kullanılamaz. Bu yüzden ayrı bir Client Component (`providers.jsx`) oluşturuyoruz.

### 3. Grid Syntax Düzeltmesi

**Dosya**: `src/app/page.js`

```javascript
// Hatalı
<div className="grid grid-col-7 ...">

// Doğru
<div className="grid grid-cols-7 ...">
```

### 4. Dark Mode CSS Düzeltmesi

**Dosya**: `src/app/globals.css`

```css
/* Hatalı */
@media (prefers-color-scheme: light) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

/* Doğru */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

## 🔄 Alternatifler

### HeroUI Yerine NextUI

- NextUI daha popüler ve daha fazla bileşen içeriyor
- Ancak mevcut kodda HeroUI kullanılmış, değiştirmek gereksiz refactor gerektirir

### Tailwind Yerine CSS Modules

- Daha fazla kontrol sağlar
- Ancak Tailwind ile hız ve tutarlılık daha iyi

## ✅ Test Planı

### 1. Görsel Testler

- [ ] Tüm sayfaları tarayıcıda açıp stillerin geldiğini kontrol et
- [ ] Dark/Light mode geçişini test et
- [ ] Responsive breakpoint'leri test et

### 2. Developer Tools

```bash
# Tailwind build çıktısını kontrol et
npm run build

# Build hataları olmamalı
```

### 3. Manuel Test Checklist

- [ ] Ana sayfa grid layout'u doğru görünüyor
- [ ] HeroUI Card bileşenleri render ediliyor
- [ ] Navbar bileşenleri çalışıyor
- [ ] Hover efektleri çalışıyor
- [ ] Dark mode toggle çalışıyor (varsa)

## 📋 Implementasyon Adımları

### Adım 1: Tailwind Config Güncelleme

```javascript
// tailwind.config.js dosyasını güncelle
```

**Tahmini Süre**: 5 dakika

### Adım 2: Layout Provider Ekleme

```javascript
// src/app/layout.js dosyasına HeroUIProvider ekle
```

**Tahmini Süre**: 10 dakika

### Adım 3: Grid Syntax Düzeltme

```javascript
// src/app/page.js dosyasında grid-col-7 -> grid-cols-7
```

**Tahmini Süre**: 2 dakika

### Adım 4: CSS Dark Mode Düzeltme

```css
// src/app/globals.css dosyasında media query düzelt
```

**Tahmini Süre**: 3 dakika

### Adım 5: Test ve Doğrulama

```bash
npm run dev
# Tarayıcıda localhost:3000 açıp kontrol et
```

**Tahmini Süre**: 15 dakika

## ⚠️ Riskler ve Önlemler

| Risk                               | Olasılık | Etki   | Önlem                           |
| ---------------------------------- | -------- | ------ | ------------------------------- |
| Tailwind sınıfları hala çalışmıyor | Düşük    | Yüksek | Cache temizle, node_modules sil |
| HeroUI bileşenleri bozuldu         | Düşük    | Orta   | Provider'ı doğru yere koy       |
| Dark mode hala çalışmıyor          | Orta     | Düşük  | Browser cache temizle           |

## 📚 Kaynaklar

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HeroUI Documentation](https://www.heroui.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

## ✅ Tamamlanma Kriterleri

- [x] RFC dokümanı oluşturuldu
- [x] Tailwind config düzeltildi
- [x] HeroUI Provider eklendi (Providers component)
- [x] Grid syntax düzeltildi (zaten doğruydu)
- [x] Dark mode CSS düzeltildi
- [ ] Tüm testler başarılı
- [ ] Code review tamamlandı

## 📝 Notlar

Bu phase, projenin temelini oluşturduğu için en kritik adımdır. Diğer tüm phase'ler bu temel üzerine inşa edilecektir.
