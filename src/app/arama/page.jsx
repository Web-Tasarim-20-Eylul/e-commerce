"use client";

import { Suspense, use } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/error-message";
import ProductSkeleton from "@/components/product-skeleton";
import AddToCartButton from "@/components/add-to-cart-button";
import FavoriteButton from "@/components/favorite-button";
import SortOptions from "@/components/sort-options";
import { useFilterStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const sortBy = useFilterStore((state) => state.sortBy);

  const { data, loading, error, refetch } = useFetch(
    "https://fakestoreapi.com/products"
  );

  const filteredAndSortedProducts = useMemo(() => {
    if (!data) return [];

    // Arama filtresi
    let filtered = data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
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
  }, [data, query, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Arama Sonuçları
          </h1>
          <p className="text-default-500">
            "{query}" için {filteredAndSortedProducts.length} sonuç bulundu
          </p>
        </div>
        <SortOptions />
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Sonuç Bulunamadı
          </h2>
          <p className="text-default-500 mb-8 max-w-md mx-auto">
            "{query}" araması için ürün bulunamadı. Lütfen farklı bir kelime
            deneyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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
                <b className="text-left line-clamp-2 w-full text-foreground">
                  {product.title}
                </b>
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
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Ana Sayfa</BreadcrumbItem>
        <BreadcrumbItem>Arama</BreadcrumbItem>
      </Breadcrumbs>

      <Suspense fallback={<Loading />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
