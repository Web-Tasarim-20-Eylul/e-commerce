"use client";

import { Card, CardBody, Image, Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";

export default function CartItem({ item }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50">
      <CardBody>
        <div className="flex gap-4">
          {/* Ürün Görseli */}
          <Link href={`/${item.id}`} className="shrink-0">
            <div className="w-24 h-24 bg-default-50 dark:bg-default-100/30 rounded-lg p-2">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
                radius="sm"
              />
            </div>
          </Link>

          {/* Ürün Bilgileri */}
          <div className="flex-1 min-w-0">
            <Link href={`/${item.id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-primary transition line-clamp-2">
                {item.title}
              </h3>
            </Link>

            <p className="text-sm text-default-500 mt-1 capitalize">
              {item.category}
            </p>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {/* Miktar Kontrolleri */}
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onClick={() => decrementQuantity(item.id)}
                  aria-label="Azalt"
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
                  aria-label="Artır"
                >
                  +
                </Button>
              </div>{" "}
              {/* Fiyat */}
              <div className="ml-auto text-right">
                <p className="text-sm text-default-500">
                  Birim: ${item.price.toFixed(2)}
                </p>
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
            aria-label="Sil"
          >
            🗑️
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
