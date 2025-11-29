"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import Link from "next/link";
import { useFavoritesStore } from "@/stores";
import AddToCartButton from "@/components/add-to-cart-button";
import FavoriteButton from "@/components/favorite-button";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-background">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-full bg-danger/10 dark:bg-danger/20">
              <Heart className="w-16 h-16 text-danger" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Favorileriniz Boş
          </h2>
          <p className="text-default-500 mb-8 max-w-md mx-auto">
            Henüz favori ürününüz bulunmuyor. Beğendiğiniz ürünleri kalp ikonuna
            tıklayarak favorilere ekleyebilirsiniz.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              as={Link}
              href="/"
              color="primary"
              size="lg"
              startContent={<ShoppingBag className="w-5 h-5" />}
            >
              Alışverişe Başla
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="flex items-center gap-4 mb-8">
        <Button
          as={Link}
          href="/"
          variant="light"
          isIconOnly
          aria-label="Geri dön"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Favorilerim</h1>
          <p className="text-default-500 mt-1">
            {favorites.length} ürün listenizde
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {favorites.map((product) => (
          <Card
            key={product.id}
            className="relative border-none bg-background/60 dark:bg-default-100/50 hover:shadow-xl transition-all"
          >
            <FavoriteButton product={product} />
            <CardBody className="overflow-hidden p-0">
              <Link href={`/${product.id}`}>
                <Image
                  alt={product.title}
                  className="w-full transition-transform duration-300 object-contain h-[280px] sm:h-[320px] hover:scale-105"
                  radius="lg"
                  src={product.image}
                  width="100%"
                />
              </Link>
            </CardBody>
            <CardFooter className="text-small flex-col items-start gap-3 p-4">
              <Link href={`/${product.id}`}>
                <b className="text-left line-clamp-2 w-full text-foreground hover:text-primary transition-colors">
                  {product.title}
                </b>
              </Link>
              <div className="flex items-center justify-between w-full">
                <p className="text-xl font-bold text-primary">
                  ${product.price}
                </p>
                <span className="text-xs text-default-500 capitalize">
                  {product.category}
                </span>
              </div>
              <AddToCartButton product={product} variant="shadow" size="sm" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
