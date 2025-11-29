"use client";

import { Badge, Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

export default function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side render sırasında 0 göster, hydration sonrası gerçek değeri göster
  const displayCount = mounted ? itemCount : 0;

  return (
    <Badge
      content={displayCount}
      color="danger"
      isInvisible={displayCount === 0}
      shape="circle"
      size="md"
      className="border-none"
    >
      <Button
        as={Link}
        href="/sepet"
        variant="light"
        isIconOnly
        aria-label="Sepet"
        size="md"
        className="text-foreground"
      >
        <ShoppingCart className="w-5 h-5" />
      </Button>
    </Badge>
  );
}
