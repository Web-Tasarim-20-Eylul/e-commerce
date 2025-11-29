"use client";

import { useCartStore } from "@/stores";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import EmptyCart from "@/components/empty-cart";

export default function Sepet() {
  const items = useCartStore((state) => state.items);
  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-background">
        <EmptyCart />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        Alışveriş Sepeti
      </h1>

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
