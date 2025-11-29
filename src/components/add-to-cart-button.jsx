"use client";

import { Button } from "@heroui/react";
import { useCartStore } from "@/stores";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function AddToCartButton({
  product,
  variant = "solid",
  size = "md",
  fullWidth = true,
  showIcon = false,
}) {
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

  const getIcon = () => {
    if (!showIcon) return null;
    if (isInCart) return <Check className="w-4 h-4" />;
    return <ShoppingCart className="w-4 h-4" />;
  };

  return (
    <Button
      color={isInCart ? "success" : "primary"}
      variant={variant}
      size={size}
      onClick={handleAdd}
      isLoading={isAdding}
      fullWidth={fullWidth}
      startContent={getIcon()}
    >
      {isAdding ? "Ekleniyor..." : isInCart ? "Sepette" : "Sepete Ekle"}
    </Button>
  );
}
