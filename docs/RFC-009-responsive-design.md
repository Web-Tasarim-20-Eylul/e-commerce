# RFC-009: Responsive Design İyileştirmeleri

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟢 Orta  
**Phase**: 5

## 📝 Özet

Mobil-first yaklaşım, tablet ve mobil optimizasyonları, touch gestures.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Navbar Mobilde Taşıyor**: Çok fazla eleman
2. **Grid Mobilde Kalabalık**: 2 kolon bile çok olabilir
3. **Filter Sidebar**: Mobilde overlay olmalı
4. **Touch Targets**: Küçük butonlar

### Beklenen Sonuçlar

- Hamburger menu (mobil)
- Bottom navigation (mobil)
- Drawer filters
- Büyük touch targets
- Responsive images

## 🔧 Detaylı Tasarım

### 1. Mobile Navbar

**Dosya**: `src/components/mobile-nav.jsx`

```javascript
"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@heroui/react";

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Erkek", href: "/kategori/erkek" },
    { label: "Kadın", href: "/kategori/kadin" },
    { label: "Elektronik", href: "/kategori/elektronik" },
    { label: "Takı", href: "/kategori/taki" },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="md:hidden"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold">LOGO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">{/* Cart badge */}</NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
```

### 2. Bottom Navigation (Mobile)

**Dosya**: `src/components/bottom-nav.jsx`

```javascript
"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: "🏠", label: "Ana Sayfa", href: "/" },
    { icon: "🔍", label: "Ara", href: "/arama" },
    { icon: "🛒", label: "Sepet", href: "/sepet" },
    { icon: "❤️", label: "Favoriler", href: "/favoriler" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Button
            key={item.href}
            as={Link}
            href={item.href}
            variant="light"
            className={`flex-col h-full ${
              pathname === item.href ? "text-primary" : ""
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
```

### 3. Filter Drawer (Mobile)

**Dosya**: `src/components/filter-drawer.jsx`

```javascript
"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import ProductFilters from "./product-filters";

export default function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        color="primary"
        variant="flat"
        fullWidth
        className="md:hidden"
      >
        🔽 Filtreler
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>Filtreler</ModalHeader>
          <ModalBody>
            <ProductFilters />
          </ModalBody>
          <ModalFooter>
            <Button fullWidth onClick={() => setIsOpen(false)}>
              Uygula
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### 4. Responsive Grid Adjustments

```javascript
// Ana sayfa grid
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-6">

// Kategori sayfası grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### 5. Touch-Friendly Buttons

```css
/* globals.css */
@media (max-width: 768px) {
  .touch-target {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 📋 Implementasyon Adımları

### Adım 1: Mobile Navbar

- MobileNav component
- Hamburger menu
- Responsive breakpoints

**Süre**: 90 dakika

### Adım 2: Bottom Navigation

- BottomNav component
- Sticky positioning
- Active states

**Süre**: 60 dakika

### Adım 3: Filter Drawer

- Modal/Drawer component
- Filter integration

**Süre**: 45 dakika

### Adım 4: Grid Optimizations

- Responsive columns
- Gap adjustments
- Image sizes

**Süre**: 30 dakika

### Adım 5: Touch Targets

- Button sizes
- Tap areas
- Spacing

**Süre**: 30 dakika

## ✅ Tamamlanma Kriterleri

- [ ] Mobil navbar çalışıyor
- [ ] Bottom nav çalışıyor
- [ ] Filter drawer çalışıyor
- [ ] Tüm breakpoints test edildi
- [ ] Touch targets uygun boyutta
- [ ] Lighthouse mobile score >90
