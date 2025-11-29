# RFC-004: Sepet Sistemi

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🔴 Kritik  
**Phase**: 2

## 📝 Özet

Tam fonksiyonel bir sepet sistemi: ürün ekleme/çıkarma, miktar güncelleme, toplam hesaplama, ödeme sayfası.

## 🎯 Motivasyon

### Mevcut Problemler

1. **Sepet Sayfası Boş**: `/sepet` route'u var ama içi boş
2. **Fonksiyonellik Yok**: Ekleme/çıkarma butonu yok
3. **UI Eksik**: Sepet listesi ve toplam gösterilmiyor
4. **Checkout Yok**: Ödeme akışı yok

### Beklenen Sonuçlar

- Çalışan sepet sayfası
- Ürün ekleme/çıkarma
- Miktar kontrolü
- Toplam hesaplama
- Boş sepet durumu
- Ödeme akışı başlangıcı

## 🔧 Detaylı Tasarım

### 1. Product Card - Sepete Ekle Butonu

**Dosya**: `src/components/add-to-cart-button.jsx`

```javascript
"use client";

import { Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import { useState } from "react";

export default function AddToCartButton({ product, variant = "solid" }) {
  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(product.id));
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addItem(product);

    // Görsel feedback için kısa delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Button
      color={isInCart ? "success" : "primary"}
      variant={variant}
      onClick={handleAdd}
      isLoading={isAdding}
      fullWidth
    >
      {isAdding ? "Ekleniyor..." : isInCart ? "Sepette ✓" : "Sepete Ekle"}
    </Button>
  );
}
```

### 2. Cart Item Component

**Dosya**: `src/components/cart-item.jsx`

```javascript
"use client";

import { Card, CardBody, Image, Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";

export default function CartItem({ item }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  return (
    <Card>
      <CardBody>
        <div className="flex gap-4">
          {/* Ürün Görseli */}
          <Link href={`/${item.id}`}>
            <Image
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
              radius="sm"
            />
          </Link>

          {/* Ürün Bilgileri */}
          <div className="flex-1">
            <Link href={`/${item.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition line-clamp-2">
                {item.title}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Kategori: {item.category}
            </p>

            <div className="flex items-center gap-4 mt-3">
              {/* Miktar Kontrolleri */}
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </Button>
                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </Button>
              </div>

              {/* Fiyat */}
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-600">Birim: ${item.price}</p>
                <p className="text-lg font-bold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Sil Butonu */}
          <Button
            isIconOnly
            color="danger"
            variant="light"
            onClick={() => removeItem(item.id)}
            className="self-start"
          >
            🗑️
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
```

### 3. Cart Summary Component

**Dosya**: `src/components/cart-summary.jsx`

```javascript
"use client";

import { Card, CardBody, Button, Divider } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.18; // %18 KDV
  const total = subtotal + shipping + tax;

  return (
    <Card className="sticky top-4">
      <CardBody className="gap-4">
        <h2 className="text-xl font-bold">Sipariş Özeti</h2>

        <Divider />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Ara Toplam</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Kargo</span>
            <span className="font-semibold">
              {shipping > 0 ? `$${shipping.toFixed(2)}` : "Ücretsiz"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">KDV (%18)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
        </div>

        <Divider />

        <div className="flex justify-between text-lg">
          <span className="font-bold">Toplam</span>
          <span className="font-bold text-primary text-xl">
            ${total.toFixed(2)}
          </span>
        </div>

        <Button
          color="primary"
          size="lg"
          fullWidth
          as={Link}
          href="/checkout"
          isDisabled={items.length === 0}
        >
          Ödemeye Geç ({items.length} ürün)
        </Button>

        <Button variant="light" fullWidth as={Link} href="/">
          Alışverişe Devam Et
        </Button>
      </CardBody>
    </Card>
  );
}
```

### 4. Empty Cart Component

**Dosya**: `src/components/empty-cart.jsx`

```javascript
import { Button } from "@heroui/react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="text-3xl font-bold mb-4">Sepetiniz Boş</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri
        keşfedin!
      </p>
      <Button as={Link} href="/" color="primary" size="lg">
        Alışverişe Başla
      </Button>
    </div>
  );
}
```

### 5. Cart Page Güncelleme

**Dosya**: `src/app/sepet/page.jsx`

```javascript
"use client";

import { useCartStore } from "@/stores";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import EmptyCart from "@/components/empty-cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
```

### 6. Navbar Cart Badge Güncelleme

**Dosya**: `src/components/cart-badge.jsx`

```javascript
"use client";

import { Badge, Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";

export default function CartBadge() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <Badge
      content={itemCount}
      color="danger"
      isInvisible={itemCount === 0}
      shape="circle"
    >
      <Button
        as={Link}
        href="/sepet"
        variant="light"
        isIconOnly
        aria-label="Sepet"
      >
        🛒
      </Button>
    </Badge>
  );
}
```

### 7. Ana Sayfaya Sepete Ekle Butonu Entegrasyonu

**Dosya**: `src/app/page.js` (güncelleme)

```javascript
// ...existing imports...
import AddToCartButton from "@/components/add-to-cart-button";

// ...existing code...

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
  <CardFooter className="flex-col gap-2">
    <div className="flex justify-between w-full">
      <b className="text-left line-clamp-2 flex-1">{product.title}</b>
      <p className="text-primary font-semibold">{product.price}$</p>
    </div>
    <AddToCartButton product={product} variant="flat" />
  </CardFooter>
</Card>;
```

## 🔄 Alternatifler

### 1. Ürün Detay Sayfasından Sepete Ekleme

**Avantaj**: Kullanıcı ürünü inceler, sonra ekler  
**Dezavantaj**: Ekstra tıklama gerekir  
**Karar**: ✅ Her ikisi de olsun

### 2. Quick Add (Hover'da Göster)

**Avantaj**: Daha hızlı ekleme  
**Dezavantaj**: Mobilde çalışmaz  
**Karar**: 🔮 Phase 5'te eklenebilir

### 3. Mini Cart Dropdown

**Avantaj**: Sepete gitmeden ürünleri görebilme  
**Dezavantaj**: Ekstra complexity  
**Karar**: 🔮 Phase 5'te eklenebilir

## ✅ Test Planı

### 1. Fonksiyonel Testler

```javascript
describe("Cart Functionality", () => {
  it("should add product to cart from home page", () => {
    // Test implementation
  });

  it("should update quantity correctly", () => {
    // Test implementation
  });

  it("should calculate total correctly", () => {
    // Test implementation
  });

  it("should remove item from cart", () => {
    // Test implementation
  });

  it("should show empty cart message", () => {
    // Test implementation
  });
});
```

### 2. UI/UX Testler

- [ ] Sepete ekleme butonu görsel feedback veriyor
- [ ] Navbar badge güncelleniyor
- [ ] Miktar artırma/azaltma smooth
- [ ] Sil butonu confirmation istiyor mu? (opsiyonel)
- [ ] Boş sepet mesajı güzel görünüyor
- [ ] Responsive tasarım çalışıyor
- [ ] Loading states gösteriliyor

### 3. Edge Cases

- [ ] 0 miktarda ürün olduğunda ne olur?
- [ ] Çok büyük miktarlarda performans nasıl?
- [ ] LocalStorage dolu olursa ne olur?
- [ ] Aynı ürün birden fazla kez eklenirse?
- [ ] Sayfa yenilendiğinde sepet korunuyor mu?

## 📋 Implementasyon Adımları

### Adım 1: Component Oluşturma

1. `add-to-cart-button.jsx` oluştur
2. `cart-item.jsx` oluştur
3. `cart-summary.jsx` oluştur
4. `empty-cart.jsx` oluştur
5. `cart-badge.jsx` oluştur

**Tahmini Süre**: 90 dakika

### Adım 2: Sepet Sayfası

1. `src/app/sepet/page.jsx` güncelle
2. Layout ve styling yap
3. Responsive tasarım ekle

**Tahmini Süre**: 45 dakika

### Adım 3: Ana Sayfa Entegrasyonu

1. Product Card'a AddToCart butonu ekle
2. Navbar'a CartBadge ekle
3. Layout düzenle

**Tahmini Süre**: 30 dakika

### Adım 4: Ürün Detay Sayfası

1. `src/app/[id]/page.jsx` güncelle
2. AddToCart butonu ekle
3. Quantity selector ekle

**Tahmini Süre**: 30 dakika

### Adım 5: Test ve Polish

1. Tüm senaryoları test et
2. Animasyonları ayarla
3. Accessibility ekle

**Tahmini Süre**: 45 dakika

## ⚠️ Riskler ve Önlemler

| Risk                                | Olasılık | Etki   | Önlem                      |
| ----------------------------------- | -------- | ------ | -------------------------- |
| Performance issues with large carts | Düşük    | Orta   | Virtualization ekle        |
| LocalStorage sync issues            | Orta     | Yüksek | Zustand persist middleware |
| Race conditions                     | Düşük    | Orta   | Optimistic updates         |
| Stale data                          | Düşük    | Düşük  | Refresh mechanism          |

## 📚 Kaynaklar

- [E-commerce UX Best Practices](https://baymard.com/blog/cart-abandonment-rate)
- [Shopping Cart Design Patterns](https://www.smashingmagazine.com/2018/05/shopping-cart-abandoned/)
- [HeroUI Components](https://www.heroui.com/docs/components/card)

## ✅ Tamamlanma Kriterleri

- [x] Tüm component'ler oluşturuldu
- [x] Sepet sayfası tamamen çalışıyor
- [x] Ürün ekleme/çıkarma çalışıyor
- [x] Miktar güncellemeleri çalışıyor
- [x] Toplam hesaplama doğru
- [x] Navbar badge güncelleniyor
- [x] Boş sepet durumu güzel
- [ ] Responsive tasarım OK (Phase 5'te detaylı)
- [ ] Testler geçiyor
- [ ] Code review OK

## 📝 Notlar

Sepet sistemi, e-commerce'in kalbi. Bu phase'i iyi tamamlamak çok önemli. Kullanıcı deneyimi odaklı, hızlı ve güvenilir olmalı. Phase 3'te checkout akışını ekleyeceğiz.
