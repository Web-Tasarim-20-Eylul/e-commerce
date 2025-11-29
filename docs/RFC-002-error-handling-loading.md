# RFC-002: Error Handling ve Loading States

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔴 Kritik  
**Phase**: 1

## 📝 Özet

Uygulama genelinde tutarlı error handling ve loading state yönetimi implementasyonu.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Loading State Eksik**: Basit "Yükleniyor..." metni, kullanıcı deneyimi zayıf
2. **Error Handling Yok**: API çağrısı başarısız olduğunda kullanıcı bilgilendirilmiyor
3. **Network Hataları**: Offline durumda uygulama çöküyor
4. **Loading Indicator**: Profesyonel spinner/skeleton yok

### Beklenen Sonuçlar

- Tüm API çağrılarında error handling
- Profesyonel loading göstergeleri
- Kullanıcı dostu hata mesajları
- Retry mekanizması
- Network durumu takibi

## 🔧 Detaylı Tasarım

### 1. Loading Component

**Dosya**: `src/components/loading.jsx`

```javascript
import { Spinner } from "@heroui/react";

export default function Loading({ fullScreen = false, size = "lg" }) {
  if (fullScreen) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Spinner size={size} color="primary" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8">
      <Spinner size={size} color="primary" />
    </div>
  );
}
```

### 2. Error Component

**Dosya**: `src/components/error-message.jsx`

```javascript
import { Button } from "@heroui/react";

export default function ErrorMessage({
  message = "Bir hata oluştu",
  onRetry,
  fullScreen = false,
}) {
  const content = (
    <div className="text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-2">Hata!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <Button color="primary" onClick={onRetry}>
          Tekrar Dene
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center items-center p-8">{content}</div>;
}
```

### 3. Custom Hook: useFetch

**Dosya**: `src/hooks/useFetch.js`

```javascript
import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP Hatası: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
```

### 4. Skeleton Loading Component

**Dosya**: `src/components/product-skeleton.jsx`

```javascript
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="w-full">
          <CardBody className="p-0">
            <Skeleton className="rounded-lg">
              <div className="h-[350px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="flex-col items-start gap-2">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
```

### 5. Ana Sayfa Güncellemesi

**Dosya**: `src/app/page.js`

```javascript
"use client";

import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/error-message";
import ProductSkeleton from "@/components/product-skeleton";

export default function Home() {
  const { data, loading, error, refetch } = useFetch(
    "https://fakestoreapi.com/products"
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-6">
          <ProductSkeleton count={14} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Ürünler yüklenirken bir hata oluştu: ${error}`}
        onRetry={refetch}
        fullScreen
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-gray-600">Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-6">
        {data.map((product) => (
          <Card
            as={Link}
            key={product.id}
            isPressable
            shadow="sm"
            href={`/${product.id}`}
          >
            <CardBody className="overflow-hidden p-0">
              <Image
                alt={product.title}
                className="w-full transition duration-300 object-contain h-[350px]"
                radius="lg"
                shadow="sm"
                src={product.image}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="text-left line-clamp-2">{product.title}</b>
              <p className="text-primary font-semibold">{product.price}$</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## 🔄 Alternatifler

### 1. React Query / TanStack Query

**Avantajlar**:

- Otomatik caching
- Background refetching
- Daha gelişmiş state management

**Dezavantajlar**:

- Ekstra dependency
- Öğrenme eğrisi
- Bu proje için overkill olabilir

**Karar**: Şimdilik custom hook kullanıyoruz, ileride ihtiyaç olursa migrate ederiz.

### 2. SWR (Stale-While-Revalidate)

**Avantajlar**:

- Vercel tarafından geliştirildi
- Next.js ile iyi entegrasyon
- Daha hafif

**Dezavantajlar**:

- React Query kadar feature-rich değil

### 3. Axios + Interceptors

**Avantajlar**:

- Global error handling
- Request/Response interceptors

**Dezavantajlar**:

- Native fetch yeterli
- Ekstra dependency

## ✅ Test Planı

### 1. Unit Tests

```javascript
// __tests__/useFetch.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "@/hooks/useFetch";

describe("useFetch", () => {
  it("should fetch data successfully", async () => {
    const { result } = renderHook(() =>
      useFetch("https://fakestoreapi.com/products")
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeTruthy();
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle errors", async () => {
    const { result } = renderHook(() =>
      useFetch("https://invalid-url.com/api")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

### 2. Manuel Test Checklist

- [ ] Normal yükleme durumunu test et
- [ ] Network'ü kapatıp error durumunu test et
- [ ] Yavaş 3G simüle edip loading state'i test et
- [ ] Retry butonunun çalıştığını doğrula
- [ ] Boş data durumunu test et
- [ ] Skeleton loading animasyonlarını kontrol et

### 3. Browser DevTools Tests

```javascript
// Console'da simüle et
// Network throttling: Slow 3G
// Offline mode: ✓
```

## 📋 Implementasyon Adımları

### Adım 1: Hook ve Components Oluşturma

1. `src/hooks/useFetch.js` oluştur
2. `src/components/loading.jsx` oluştur
3. `src/components/error-message.jsx` oluştur
4. `src/components/product-skeleton.jsx` oluştur

**Tahmini Süre**: 45 dakika

### Adım 2: Ana Sayfa Güncelleme

1. `src/app/page.js` dosyasını güncelle
2. useFetch hook'unu entegre et
3. Loading ve Error state'lerini ekle

**Tahmini Süre**: 30 dakika

### Adım 3: Diğer Sayfalara Uygulama

1. `src/app/[id]/page.jsx` güncelle
2. `src/app/erkek/page.jsx` güncelle
3. Diğer kategori sayfalarına uygula

**Tahmini Süre**: 45 dakika

### Adım 4: Test ve İyileştirme

1. Tüm senaryoları test et
2. Animasyonları ayarla
3. Accessibility kontrolü yap

**Tahmini Süre**: 30 dakika

## ⚠️ Riskler ve Önlemler

| Risk                  | Olasılık | Etki   | Önlem                       |
| --------------------- | -------- | ------ | --------------------------- |
| API rate limiting     | Orta     | Yüksek | Cache mekanizması ekle      |
| Skeleton layout shift | Düşük    | Orta   | Sabit yükseklikler kullan   |
| Infinite loading loop | Düşük    | Yüksek | useEffect dependency dikkat |
| Memory leak           | Düşük    | Orta   | Cleanup function ekle       |

## 📚 Kaynaklar

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [HeroUI Skeleton](https://www.heroui.com/docs/components/skeleton)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## ✅ Tamamlanma Kriterleri

- [x] useFetch hook oluşturuldu
- [x] Loading component oluşturuldu
- [x] Error component oluşturuldu
- [x] Skeleton component oluşturuldu
- [x] Ana sayfa güncellendi
- [ ] Tüm sayfalar güncellendi (diğer sayfalar Phase 3'te)
- [ ] Testler başarılı
- [ ] Code review tamamlandı

## 📝 Notlar

Bu implementasyon, Phase 2'deki state management ile birlikte daha da güçlenecektir. Şu an için temel error handling ve loading states'i kurmak yeterli.
