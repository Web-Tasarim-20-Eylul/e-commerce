# RFC-011: Kullanıcı Favorileri

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔵 Düşük  
**Phase**: 6

## 📝 Özet

Favori ekleme/çıkarma, favoriler sayfası, localStorage persist.

## 🔧 Detaylı Tasarım

### 1. Favorite Button Component

**Dosya**: `src/components/favorite-button.jsx`

```javascript
"use client";

import { Button } from "@heroui/react";
import { useFavoritesStore } from "@/stores";

export default function FavoriteButton({ product }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
      }}
    >
      {favorite ? "❤️" : "🤍"}
    </Button>
  );
}
```

### 2. Favoriler Sayfası

**Dosya**: `src/app/favoriler/page.jsx`

```javascript
"use client";

import { useFavoritesStore } from "@/stores";
import ProductGrid from "@/components/product-grid";
import EmptyState from "@/components/empty-state";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon="❤️"
        title="Favori Ürününüz Yok"
        description="Beğendiğiniz ürünleri favorilerinize ekleyin"
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Favorilerim ({favorites.length})
      </h1>
      <ProductGrid products={favorites} />
    </div>
  );
}
```

## ✅ Tamamlanma Kriterleri

- [ ] Favorite store çalışıyor
- [ ] Favoriler sayfası
- [ ] Toggle animation
- [ ] LocalStorage persist
