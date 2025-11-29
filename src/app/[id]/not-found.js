"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto p-6 text-center min-h-screen bg-background flex flex-col justify-center items-center">
      {" "}
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
      <h2 className="text-2xl mb-4 text-foreground">Ürün Bulunamadı</h2>
      <p className="text-default-500 mb-8 max-w-md">
        Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
      </p>
      <div className="flex gap-4">
        <Button as={Link} href="/" color="primary" size="lg">
          Ana Sayfaya Dön
        </Button>
        <Button as={Link} href="/sepet" variant="bordered" size="lg">
          Sepetime Git
        </Button>
      </div>
    </div>
  );
}
