# RFC-012: Ürün Karşılaştırma

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔵 Düşük  
**Phase**: 6

## 📝 Özet

Ürünleri karşılaştırma özelliği: fiyat, özellikler, yan yana görüntüleme.

## 🔧 Detaylı Tasarım

### 1. Compare Store

**Dosya**: `src/stores/useCompareStore.js`

```javascript
import { create } from "zustand";

export const useCompareStore = create((set, get) => ({
  items: [],
  maxItems: 4,

  addToCompare: (product) => {
    const items = get().items;
    if (items.length >= get().maxItems) {
      alert("En fazla 4 ürün karşılaştırabilirsiniz");
      return;
    }
    if (!items.find((item) => item.id === product.id)) {
      set({ items: [...items, product] });
    }
  },

  removeFromCompare: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },

  clearCompare: () => set({ items: [] }),
}));
```

### 2. Karşılaştırma Sayfası

**Dosya**: `src/app/karsilastir/page.jsx`

```javascript
"use client";

import { useCompareStore } from "@/stores/useCompareStore";
import { Card, CardBody, Image, Button } from "@heroui/react";

export default function ComparePage() {
  const { items, removeFromCompare } = useCompareStore();

  if (items.length === 0) {
    return <div>Karşılaştırılacak ürün yok</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ürün Karşılaştırma</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              {items.map((item) => (
                <th key={item.id} className="p-4">
                  <Image src={item.image} alt={item.title} width={150} />
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => removeFromCompare(item.id)}
                  >
                    Kaldır
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold p-4">Ürün Adı</td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  {item.title}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-bold p-4">Fiyat</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-primary font-bold">
                  ${item.price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-bold p-4">Kategori</td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  {item.category}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-bold p-4">Rating</td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  ⭐ {item.rating?.rate} ({item.rating?.count})
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## ✅ Tamamlanma Kriterleri

- [ ] Compare store oluşturuldu
- [ ] Karşılaştırma sayfası
- [ ] Ürün ekleme/çıkarma
- [ ] Maksimum 4 ürün limiti
- [ ] Responsive tablo tasarımı
