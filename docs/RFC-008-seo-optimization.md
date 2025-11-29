# RFC-008: SEO Optimizasyonu

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟡 Yüksek  
**Phase**: 4

## 📝 Özet

Comprehensive SEO: metadata, sitemap, robots.txt, structured data, OpenGraph.

## 🔧 Detaylı Tasarım

### 1. Root Metadata

**Dosya**: `src/app/layout.js`

```javascript
export const metadata = {
  title: {
    default: "E-Commerce Store",
    template: "%s | E-Commerce Store",
  },
  description: "En iyi ürünleri en uygun fiyatlarla bulun",
  keywords: ["e-commerce", "online alışveriş", "ürün"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://yoursite.com",
    siteName: "E-Commerce Store",
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

### 2. Sitemap

**Dosya**: `src/app/sitemap.js`

```javascript
export default async function sitemap() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const productUrls = products.map((product) => ({
    url: `https://yoursite.com/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://yoursite.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productUrls,
  ];
}
```

### 3. Robots.txt

**Dosya**: `src/app/robots.js`

```javascript
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sepet", "/checkout"],
    },
    sitemap: "https://yoursite.com/sitemap.xml",
  };
}
```

### 4. Structured Data (JSON-LD)

**Dosya**: `src/components/product-schema.jsx`

```javascript
export default function ProductSchema({ product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## ✅ Tamamlanma Kriterleri

- [ ] Metadata tüm sayfalarda
- [ ] Sitemap oluşturuldu
- [ ] Robots.txt yapılandırıldı
- [ ] Structured data eklendi
- [ ] OpenGraph tags
