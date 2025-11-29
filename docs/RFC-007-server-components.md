# RFC-007: Server Components ve Data Fetching

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟡 Yüksek  
**Phase**: 4

## 📝 Özet

Client-side rendering'den Server Components'e geçiş, ISR, caching ve performans optimizasyonları.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Tüm Sayfalar Client-Side**: "use client" direktifi her yerde
2. **SEO Eksik**: Initial HTML boş
3. **Performance**: Gereksiz JavaScript yükleniyor
4. **No Caching**: Her seferinde API çağrısı

### Beklenen Sonuçlar

- Server Components kullanımı
- ISR (Incremental Static Regeneration)
- Better SEO
- Reduced JavaScript bundle
- Caching strategy

## 🔧 Detaylı Tasarım

### 1. Ana Sayfa - Server Component

**Dosya**: `src/app/page.js`

```javascript
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";

// Server Component - No "use client"
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // ISR: 1 saat cache
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            as={Link}
            href={`/${product.id}`}
            isPressable
            shadow="sm"
          >
            <CardBody className="p-0">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-[350px] object-contain"
                width="100%"
              />
            </CardBody>
            <CardFooter className="flex-col gap-2">
              <b className="text-sm line-clamp-2">{product.title}</b>
              <p className="text-primary">${product.price}</p>
              {/* Client Component inside Server Component */}
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### 2. Ürün Detay - Dynamic Metadata

**Dosya**: `src/app/[id]/page.jsx`

```javascript
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/add-to-cart-button";

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// Generate static params for popular products
export async function generateStaticParams() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  // Generate static pages for first 10 products
  return products.slice(0, 10).map((product) => ({
    id: product.id.toString(),
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-primary mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
```

### 3. Loading UI

**Dosya**: `src/app/loading.js`

```javascript
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
```

### 4. Error Boundary

**Dosya**: `src/app/error.js`

```javascript
"use client";

import { Button } from "@heroui/react";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Bir Hata Oluştu!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button color="primary" onClick={reset}>
        Tekrar Dene
      </Button>
    </div>
  );
}
```

### 5. Not Found Page

**Dosya**: `src/app/not-found.js`

```javascript
import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto p-6 text-center min-h-screen flex flex-col justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Sayfa Bulunamadı</h2>
      <p className="text-gray-600 mb-8">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Button as={Link} href="/" color="primary" size="lg">
        Ana Sayfaya Dön
      </Button>
    </div>
  );
}
```

## 📋 Implementasyon Adımları

### Adım 1: Server Components'e Geçiş

- Ana sayfa güncelle
- Ürün detay güncelle
- "use client" sadece gerekli yerlerde

**Süre**: 2 saat

### Adım 2: ISR ve Caching

- Revalidation sürelerini ayarla
- Static generation stratejisi

**Süre**: 1 saat

### Adım 3: SEO

- Metadata ekle
- OpenGraph tags
- Sitemap oluştur

**Süre**: 1 saat

## ✅ Tamamlanma Kriterleri

- [ ] Server Components çalışıyor
- [ ] ISR yapılandırıldı
- [ ] SEO metadata eklendi
- [ ] Loading/Error states
- [ ] Bundle size küçüldü
