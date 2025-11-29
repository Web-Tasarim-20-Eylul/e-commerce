"use client";

import { Button } from "@heroui/react";
import { useFavoritesStore } from "@/stores";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton({
  product,
  size = "md",
  absolute = true,
}) {
  const [mounted, setMounted] = useState(false);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  // Server-side render için güvenli değer
  const isActive = mounted && isFavorite;

  return (
    <Button
      isIconOnly
      variant="light"
      size={size}
      onClick={handleClick}
      aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
      className={
        absolute
          ? "absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
          : ""
      }
    >
      <Heart
        className={size === "lg" ? "w-6 h-6" : "w-5 h-5"}
        fill={isActive ? "currentColor" : "none"}
        strokeWidth={2}
        style={{ color: isActive ? "#ef4444" : "currentColor" }}
      />
    </Button>
  );
}
