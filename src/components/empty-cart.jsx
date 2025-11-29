import { Button } from "@heroui/react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="text-3xl font-bold mb-4 text-foreground">Sepetiniz Boş</h2>
      <p className="text-default-500 mb-8 max-w-md mx-auto">
        Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri
        keşfedin!
      </p>
      <Button as={Link} href="/" color="primary" size="lg">
        Alışverişe Başla
      </Button>
    </div>
  );
}
