# RFC-003: State Management Implementasyonu

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔴 Kritik  
**Phase**: 2

## 📝 Özet

Zustand kullanarak global state management implementasyonu. Sepet, favoriler ve kullanıcı tercihlerinin merkezi bir store'da yönetilmesi.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Prop Drilling**: Component'lar arası veri aktarımı zor
2. **Sepet Verisi Kayboluyor**: Sayfa yenilendiğinde sepet boşalıyor
3. **Paylaşılan State Yok**: Her component kendi state'ini yönetiyor
4. **Persist Yok**: Kullanıcı tercihleri saklanmıyor

### Beklenen Sonuçlar

- Merkezi state management
- LocalStorage ile persist
- Kolay state paylaşımı
- Performanslı güncellemeler

## 🔧 Detaylı Tasarım

### 1. Paket Kurulumu

```bash
npm install zustand
```

### 2. Cart Store

**Dosya**: `src/stores/useCartStore.js`

```javascript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Ürün zaten sepette varsa, miktarını artır
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Yeni ürün ekle
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrementQuantity: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        if (item && item.quantity > 1) {
          set({
            items: get().items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          get().removeItem(productId);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Computed values
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 3. Favorites Store

**Dosya**: `src/stores/useFavoritesStore.js`

```javascript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // State
      favorites: [],

      // Actions
      toggleFavorite: (product) => {
        const favorites = get().favorites;
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [...favorites, product],
          });
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 4. UI Preferences Store

**Dosya**: `src/stores/useUIStore.js`

```javascript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      // State
      theme: "light",
      gridView: "grid", // 'grid' or 'list'
      sortBy: "default", // 'default', 'price-asc', 'price-desc', 'name'

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setGridView: (view) => set({ gridView: view }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "ui-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 5. Store Index (Barrel Export)

**Dosya**: `src/stores/index.js`

```javascript
export { useCartStore } from "./useCartStore";
export { useFavoritesStore } from "./useFavoritesStore";
export { useUIStore } from "./useUIStore";
```

### 6. Kullanım Örnekleri

#### Ana Sayfada Sepete Ekleme Butonu

```javascript
"use client";

import { useCartStore } from "@/stores";
import { Button } from "@heroui/react";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  return (
    <Button
      color={isInCart ? "success" : "primary"}
      onClick={() => addItem(product)}
    >
      {isInCart ? "Sepette ✓" : "Sepete Ekle"}
    </Button>
  );
}
```

#### Navbar'da Sepet Badge'i

```javascript
"use client";

import { useCartStore } from "@/stores";
import { Badge, Button } from "@heroui/react";
import Link from "next/link";

export default function CartBadge() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <Badge content={itemCount} color="danger" isInvisible={itemCount === 0}>
      <Button as={Link} href="/sepet" variant="light" isIconOnly>
        🛒
      </Button>
    </Badge>
  );
}
```

#### Favori Butonu

```javascript
"use client";

import { useFavoritesStore } from "@/stores";
import { Button } from "@heroui/react";

export default function FavoriteButton({ product }) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(product);
      }}
    >
      {isFavorite ? "❤️" : "🤍"}
    </Button>
  );
}
```

## 🔄 Alternatifler

### 1. Redux Toolkit

**Avantajlar**:

- Endüstri standardı
- DevTools desteği
- Middleware ecosystem

**Dezavantajlar**:

- Daha fazla boilerplate
- Öğrenme eğrisi yüksek
- Bu proje için overkill

**Karar**: ❌ Zustand daha basit ve yeterli

### 2. Context API + useReducer

**Avantajlar**:

- Built-in, ekstra dependency yok
- React native yaklaşım

**Dezavantajlar**:

- Persist için ekstra iş
- Performance optimization zor
- Boilerplate fazla

**Karar**: ❌ Zustand daha performanslı

### 3. Jotai / Recoil

**Avantajlar**:

- Atomic state management
- Minimal boilerplate

**Dezavantajlar**:

- Daha az yaygın
- Daha az kaynak

**Karar**: ❌ Zustand daha popüler ve mature

## ✅ Test Planı

### 1. Unit Tests

```javascript
// __tests__/useCartStore.test.js
import { renderHook, act } from "@testing-library/react";
import { useCartStore } from "@/stores/useCartStore";

describe("Cart Store", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCartStore());
    const product = { id: 1, title: "Test", price: 10 };

    act(() => {
      result.current.addItem(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("should increment quantity if item exists", () => {
    const { result } = renderHook(() => useCartStore());
    const product = { id: 1, title: "Test", price: 10 };

    act(() => {
      result.current.addItem(product);
      result.current.addItem(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("should calculate total correctly", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ id: 1, price: 10 });
      result.current.addItem({ id: 2, price: 20 });
    });

    expect(result.current.getTotal()).toBe(30);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ id: 1, price: 10 });
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
```

### 2. Integration Tests

```javascript
// __tests__/cart-integration.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "@/components/add-to-cart-button";

describe("Cart Integration", () => {
  it("should add product and show in cart", () => {
    const product = { id: 1, title: "Test Product", price: 10 };

    render(<AddToCartButton product={product} />);

    const button = screen.getByText("Sepete Ekle");
    fireEvent.click(button);

    expect(screen.getByText("Sepette ✓")).toBeInTheDocument();
  });
});
```

### 3. Manuel Test Checklist

- [ ] Ürün sepete ekleniyor
- [ ] Sepet badge'i güncelleniyor
- [ ] Miktar artırma/azaltma çalışıyor
- [ ] Ürün silme çalışıyor
- [ ] LocalStorage'a kaydediliyor
- [ ] Sayfa yenilendiğinde data korunuyor
- [ ] Favori ekleme/çıkarma çalışıyor
- [ ] Theme değişimi çalışıyor

## 📋 Implementasyon Adımları

### Adım 1: Paket Kurulumu

```bash
npm install zustand
```

**Tahmini Süre**: 5 dakika

### Adım 2: Store Oluşturma

1. `src/stores/useCartStore.js` oluştur
2. `src/stores/useFavoritesStore.js` oluştur
3. `src/stores/useUIStore.js` oluştur
4. `src/stores/index.js` barrel export

**Tahmini Süre**: 60 dakika

### Adım 3: Component Entegrasyonu

1. Navbar'a CartBadge ekle
2. Product Card'a AddToCart butonu ekle
3. Product Card'a Favorite butonu ekle

**Tahmini Süre**: 45 dakika

### Adım 4: Sepet Sayfası Güncelleme

1. `src/app/sepet/page.jsx` güncelle
2. Cart items listele
3. Quantity controls ekle
4. Total hesaplama göster

**Tahmini Süre**: 60 dakika

### Adım 5: Test ve Validation

1. Unit testler yaz
2. Integration testler yaz
3. Manuel test yap
4. LocalStorage doğrula

**Tahmini Süre**: 45 dakika

## ⚠️ Riskler ve Önlemler

| Risk                     | Olasılık | Etki   | Önlem                     |
| ------------------------ | -------- | ------ | ------------------------- |
| LocalStorage quota aşımı | Düşük    | Orta   | Data boyutu sınırla       |
| State sync issues        | Orta     | Yüksek | Zustand middleware kullan |
| Memory leak              | Düşük    | Orta   | Store cleanup yap         |
| Performance              | Düşük    | Orta   | Selective re-renders      |

## 📚 Kaynaklar

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [State Management Best Practices](https://kentcdodds.com/blog/application-state-management-with-react)

## ✅ Tamamlanma Kriterleri

- [x] Zustand kuruldu
- [x] Cart store oluşturuldu
- [x] Favorites store oluşturuldu
- [x] UI store oluşturuldu
- [x] Component'lara entegre edildi
- [x] LocalStorage persist çalışıyor
- [ ] Testler yazıldı ve başarılı
- [ ] Code review tamamlandı

## 📝 Notlar

Bu phase, projenin en önemli temellerinden biri. Diğer tüm özellikler (sepet, favoriler, theme) bu store'lar üzerine kurulacak. Zustand'ın basitliği ve performansı sayesinde kolayca genişletilebilir.
