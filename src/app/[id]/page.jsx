import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import FavoriteButton from "@/components/favorite-button";
import ProductFeatures from "@/components/product-features";

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // ISR: 1 saat cache
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    notFound();
  }
  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* ÜRÜN GÖRSELI */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-background/60 dark:bg-default-100/50 rounded-lg p-8">
          <Image
            src={product.image}
            fill
            className="object-contain"
            alt={product.title}
            priority
          />
        </div>

        {/* ÜRÜN BİLGİLERİ */}
        <div className="flex flex-col gap-6">
          {/* Başlık ve Rating */}
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground">
              {product.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="font-semibold text-foreground">
                  {product.rating.rate}
                </span>
              </div>
              <span className="w-1 h-1 bg-default-400 rounded-full"></span>
              <span className="text-sm text-default-500">
                {product.rating.count} değerlendirme
              </span>
            </div>
          </div>
          {/* Fiyat */}
          <div className="py-4 border-y border-default-200 dark:border-default-100">
            <p className="text-4xl font-bold text-primary">${product.price}</p>
            <p className="text-sm text-default-500 mt-1">KDV dahil</p>
          </div>
          {/* Açıklama */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Ürün Açıklaması
            </h3>
            <p className="text-default-600 dark:text-default-400 leading-relaxed">
              {product.description}
            </p>
          </div>{" "}
          {/* Butonlar */}{" "}
          <div className="flex gap-3 mt-auto">
            <div className="flex-1">
              <AddToCartButton product={product} size="lg" fullWidth showIcon />
            </div>
            <FavoriteButton product={product} size="lg" absolute={false} />
          </div>
          {/* Özellikler */}
          <ProductFeatures />
        </div>
      </div>
    </div>
  );
}
