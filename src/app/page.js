"use client";

import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/error-message";
import ProductSkeleton from "@/components/product-skeleton";
import AddToCartButton from "@/components/add-to-cart-button";
import FavoriteButton from "@/components/favorite-button";
import FilterSidebar from "@/components/filter-sidebar";
import SortOptions from "@/components/sort-options";
import { useFilterStore } from "@/stores";
import { useMemo } from "react";

export default function Home() {
  const { data, loading, error, refetch } = useFetch(
    "https://fakestoreapi.com/products"
  );

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const priceRange = useFilterStore((state) => state.priceRange);
  const sortBy = useFilterStore((state) => state.sortBy);

  const filteredAndSortedProducts = useMemo(() => {
    if (!data) return [];

    let filtered = data;

    // Kategori filtresi
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Fiyat filtresi
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sıralama
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    return filtered;
  }, [data, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-6">
          <ProductSkeleton count={14} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Ürünler yüklenirken bir hata oluştu: ${error}`}
        onRetry={refetch}
        fullScreen
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-background">
        <p className="text-center text-default-500">Ürün bulunamadı.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Tüm Ürünler
              </h1>
              <p className="text-default-500 mt-1">
                {filteredAndSortedProducts.length} ürün bulundu
              </p>
            </div>
            <SortOptions />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Card
                as={Link}
                key={product.id}
                isPressable
                shadow="md"
                href={`/${product.id}`}
                className="relative border-none bg-background/60 dark:bg-default-100/50 hover:shadow-xl transition-all"
              >
                <FavoriteButton product={product} />
                <CardBody className="overflow-hidden p-0">
                  <Image
                    alt={product.title}
                    className="w-full transition-transform duration-300 object-contain h-[280px] sm:h-[320px] hover:scale-105"
                    radius="lg"
                    src={product.image}
                    width="100%"
                  />
                </CardBody>
                <CardFooter className="text-small flex-col items-start gap-3 p-4">
                  <b className="text-left line-clamp-2 w-full text-foreground dark:text-foreground">
                    {product.title}
                  </b>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xl font-bold text-primary">
                      ${product.price}
                    </p>
                    <span className="text-xs text-default-500 capitalize">
                      {product.category}
                    </span>
                  </div>{" "}
                  <AddToCartButton
                    product={product}
                    variant="shadow"
                    size="sm"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
