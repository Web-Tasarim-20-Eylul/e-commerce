"use client";

import { Chip } from "@heroui/react";
import { useFilterStore } from "@/stores";
import { Store, Shirt, User, Laptop, Gem } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "Tümü", icon: Store },
  { value: "men's clothing", label: "Erkek Giyim", icon: Shirt },
  { value: "women's clothing", label: "Kadın Giyim", icon: User },
  { value: "electronics", label: "Elektronik", icon: Laptop },
  { value: "jewelery", label: "Mücevher", icon: Gem },
];

export default function CategoryFilter() {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setCategory = useFilterStore((state) => state.setCategory);
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Kategoriler</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Chip
              key={category.value}
              onClick={() => setCategory(category.value)}
              className={`cursor-pointer transition-all ${
                selectedCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-default-100 hover:bg-default-200 dark:bg-default-50/10 dark:hover:bg-default-100/20 text-foreground"
              }`}
              variant={selectedCategory === category.value ? "solid" : "flat"}
              startContent={<Icon className="w-4 h-4" />}
            >
              {category.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
