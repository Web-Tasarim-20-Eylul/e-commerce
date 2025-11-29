# RFC-006: Arama Fonksiyonelliği

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟡 Yüksek  
**Phase**: 3

## 📝 Özet

Global arama özelliği: navbar'da arama kutusu, arama sonuçları sayfası, autocomplete.

## 🎯 Motivasyon

### Beklenen Sonuçlar

- Navbar'da arama kutusu
- Gerçek zamanlı arama
- Arama sonuçları sayfası
- Autocomplete önerileri
- Son aramalar (localStorage)

## 🔧 Detaylı Tasarım

### 1. Search Input Component

**Dosya**: `src/components/search-input.jsx`

```javascript
"use client";

import { Input } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <Input
        type="search"
        placeholder="Ürün ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        startContent={<span>🔍</span>}
        isClearable
        onClear={() => setQuery("")}
      />
    </form>
  );
}
```

### 2. Arama Sayfası

**Dosya**: `src/app/arama/page.jsx`

```javascript
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import ProductGrid from "@/components/product-grid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { data } = useFetch("https://fakestoreapi.com/products");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data && query) {
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [data, query]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        "{query}" için arama sonuçları
      </h1>
      <p className="mb-6 text-gray-600">{results.length} ürün bulundu</p>
      <ProductGrid products={results} />
    </div>
  );
}
```

## 📋 Implementasyon Adımları

**Süre**: 2-3 saat

## ✅ Tamamlanma Kriterleri

- [ ] Arama input çalışıyor
- [ ] Arama sonuçları gösteriliyor
- [ ] Autocomplete çalışıyor
