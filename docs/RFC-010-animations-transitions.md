# RFC-010: Animasyonlar ve Geçişler

**Durum**: 📋 Planlandı  
**Tarih**: 2025-11-29  
**Öncelik**: 🟢 Orta  
**Phase**: 5

## 📝 Özet

Framer Motion ile animasyonlar, page transitions, micro-interactions.

## 🔧 Detaylı Tasarım

### 1. Paket Kurulumu

```bash
npm install framer-motion
```

### 2. Page Transitions

**Dosya**: `src/components/page-transition.jsx`

```javascript
"use client";

import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### 3. Card Hover Animations

```javascript
"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";

export default function AnimatedCard({ children, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  );
}
```

### 4. Add to Cart Animation

```javascript
"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function AddToCartButton({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    addToCart(product);

    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <motion.div
      animate={isAdded ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Button onClick={handleClick}>
        {isAdded ? "✓ Eklendi" : "Sepete Ekle"}
      </Button>
    </motion.div>
  );
}
```

### 5. Stagger Animation for Product Grid

```javascript
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProductGrid({ products }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## 📋 Implementasyon Adımları

**Süre**: 3-4 saat

## ✅ Tamamlanma Kriterleri

- [ ] Framer Motion kuruldu
- [ ] Page transitions eklendi
- [ ] Hover animasyonlar
- [ ] Micro-interactions
- [ ] Performance iyi
