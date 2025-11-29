# RFC-005: Kategori Sayfaları ve Filtreleme

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟡 Yüksek  
**Phase**: 3

## 📝 Özet

Kategori bazlı filtreleme, fiyat aralığı, sıralama ve arama fonksiyonelliği.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Kategori Sayfaları Boş**: `erkek/page.jsx` gibi sayfalar var ama fonksiyonel değil
2. **Filtreleme Yok**: Fiyat, kategori filtrelemesi yok
3. **Sıralama Yok**: Ucuzdan pahalıya vb. sıralama yok
4. **API Entegrasyonu Eksik**: FakeStore API kategorileri kullanılmıyor

### Beklenen Sonuçlar

- Çalışan kategori sayfaları
- Fiyat filtreleme
- Sıralama seçenekleri
- URL query parameters
- Filtre state management

## 🔧 Detaylı Tasarım

### 1. Kategori Store

**Dosya**: `src/stores/useFilterStore.js`

```javascript
import { create } from "zustand";

export const useFilterStore = create((set) => ({
  // State
  selectedCategory: "all",
  priceRange: [0, 1000],
  sortBy: "default", // 'default', 'price-asc', 'price-desc', 'name'
  searchQuery: "",

  // Actions
  setCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      selectedCategory: "all",
      priceRange: [0, 1000],
      sortBy: "default",
      searchQuery: "",
    }),
}));
```

### 2. Filter Component

**Dosya**: `src/components/product-filters.jsx`

```javascript
"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectItem,
  Slider,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { useFilterStore } from "@/stores/useFilterStore";

export default function ProductFilters() {
  const { sortBy, priceRange, setSortBy, setPriceRange, resetFilters } =
    useFilterStore();
  const [localRange, setLocalRange] = useState(priceRange);

  const categories = [
    { key: "all", label: "Tüm Ürünler" },
    { key: "electronics", label: "Elektronik" },
    { key: "jewelery", label: "Takı" },
    { key: "men's clothing", label: "Erkek Giyim" },
    { key: "women's clothing", label: "Kadın Giyim" },
  ];

  const sortOptions = [
    { key: "default", label: "Varsayılan" },
    { key: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
    { key: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
    { key: "name", label: "İsme Göre" },
  ];

  return (
    <Card>
      <CardBody className="gap-6">
        <div>
          <h3 className="font-bold mb-3">Sıralama</h3>
          <Select
            selectedKeys={[sortBy]}
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sıralama seçin"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <h3 className="font-bold mb-3">Fiyat Aralığı</h3>
          <Slider
            label="Fiyat"
            step={10}
            minValue={0}
            maxValue={1000}
            value={localRange}
            onChange={setLocalRange}
            onChangeEnd={setPriceRange}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${localRange[0]}</span>
            <span>${localRange[1]}</span>
          </div>
        </div>

        <Button color="warning" variant="flat" onClick={resetFilters}>
          Filtreleri Temizle
        </Button>
      </CardBody>
    </Card>
  );
}
```

### 3. Kategori Sayfası Template

**Dosya**: `src/app/kategori/[slug]/page.jsx`

```javascript
"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useFilterStore } from "@/stores/useFilterStore";
import ProductFilters from "@/components/product-filters";
import ProductSkeleton from "@/components/product-skeleton";
import ErrorMessage from "@/components/error-message";
import AddToCartButton from "@/components/add-to-cart-button";

export default function CategoryPage({ params }) {
  const { slug } = params;
  const { sortBy, priceRange } = useFilterStore();

  const categoryMap = {
    erkek: "men's clothing",
    kadin: "women's clothing",
    elektronik: "electronics",
    taki: "jewelery",
  };

  const apiCategory = categoryMap[slug] || slug;
  const url =
    slug === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${apiCategory}`;

  const { data, loading, error, refetch } = useFetch(url);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!data) return;

    let products = [...data];

    // Fiyat filtresi
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sıralama
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(products);
  }, [data, sortBy, priceRange]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductSkeleton count={8} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} fullScreen />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {slug === "all" ? "Tüm Ürünler" : slug}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtreler */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Ürünler */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                Filtrelerinize uygun ürün bulunamadı.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                {filteredProducts.length} ürün bulundu
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    isPressable
                    shadow="sm"
                    as={Link}
                    href={`/${product.id}`}
                  >
                    <CardBody className="p-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[250px] object-contain"
                      />
                    </CardBody>
                    <CardFooter className="flex-col gap-2">
                      <b className="text-sm line-clamp-2">{product.title}</b>
                      <p className="text-primary font-bold">${product.price}</p>
                      <AddToCartButton product={product} variant="flat" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 4. Kategori Navigation

**Dosya**: `src/components/category-nav.jsx`

```javascript
"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav() {
  const pathname = usePathname();

  const categories = [
    { slug: "all", label: "Tümü", icon: "🏠" },
    { slug: "erkek", label: "Erkek", icon: "👔" },
    { slug: "kadin", label: "Kadın", icon: "👗" },
    { slug: "elektronik", label: "Elektronik", icon: "💻" },
    { slug: "taki", label: "Takı", icon: "💍" },
  ];

  return (
    <div className="border-b mb-6">
      <div className="container mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto py-4">
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              as={Link}
              href={`/kategori/${cat.slug}`}
              variant={pathname.includes(cat.slug) ? "solid" : "light"}
              color={pathname.includes(cat.slug) ? "primary" : "default"}
              startContent={<span>{cat.icon}</span>}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 📋 Implementasyon Adımları

### Adım 1: Store ve Hooks

- Filter store oluştur
- Filter hooks yaz

**Süre**: 30 dakika

### Adım 2: Filter Components

- ProductFilters component
- CategoryNav component

**Süre**: 60 dakika

### Adım 3: Kategori Sayfaları

- Template oluştur
- Mevcut sayfaları güncelle

**Süre**: 90 dakika

### Adım 4: Test

- Tüm filtreleri test et
- Performance check

**Süre**: 45 dakika

## ✅ Tamamlanma Kriterleri

- [ ] Filter store çalışıyor
- [ ] Kategori sayfaları çalışıyor
- [ ] Fiyat filtreleme çalışıyor
- [ ] Sıralama çalışıyor
- [ ] URL sync çalışıyor
- [ ] Responsive tasarım OK

## 📝 Notlar

Bu phase, kullanıcıların ürünleri kolayca bulmasını sağlayacak. Next.js dynamic routes kullanacağız.
