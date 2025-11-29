"use client";

import { Card, CardBody, Button, Divider } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.18; // %18 KDV
  const total = subtotal + shipping + tax;

  return (
    <Card className="sticky top-4 border-none bg-background/60 dark:bg-default-100/50">
      <CardBody className="gap-4">
        <h2 className="text-xl font-bold text-foreground">Sipariş Özeti</h2>
        <Divider className="bg-default-200 dark:bg-default-100" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-default-500">Ara Toplam</span>
            <span className="font-semibold text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-default-500">Kargo</span>
            <span className="font-semibold text-foreground">
              {shipping === 0 ? (
                <span className="text-success">Ücretsiz 🎉</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          {subtotal > 0 && subtotal < 100 && (
            <p className="text-xs text-warning bg-warning/10 dark:bg-warning/20 px-2 py-1 rounded">
              $100 ve üzeri alışverişlerde kargo ücretsiz!
            </p>
          )}

          <div className="flex justify-between">
            <span className="text-default-500">KDV (%18)</span>
            <span className="font-semibold text-foreground">
              ${tax.toFixed(2)}
            </span>
          </div>
        </div>{" "}
        <Divider className="bg-default-200 dark:bg-default-100" />
        <div className="flex justify-between text-lg">
          <span className="font-bold text-foreground">Toplam</span>
          <span className="font-bold text-primary text-xl">
            ${total.toFixed(2)}
          </span>
        </div>{" "}
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
