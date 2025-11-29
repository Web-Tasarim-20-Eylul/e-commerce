"use client";

import { Select, SelectItem } from "@heroui/react";
import { useFilterStore } from "@/stores";

const SORT_OPTIONS = [
  { value: "default", label: "Varsayılan" },
  { value: "price-asc", label: "Fiyat: Düşük → Yüksek" },
  { value: "price-desc", label: "Fiyat: Yüksek → Düşük" },
  { value: "name", label: "İsim: A → Z" },
  { value: "rating", label: "En Yüksek Puan" },
];

export default function SortOptions() {
  const sortBy = useFilterStore((state) => state.sortBy);
  const setSortBy = useFilterStore((state) => state.setSortBy);

  return (
    <Select
      label="Sıralama"
      placeholder="Sıralama seçin"
      selectedKeys={[sortBy]}
      onChange={(e) => setSortBy(e.target.value)}
      className="max-w-xs"
      classNames={{
        label: "text-foreground",
        value: "text-foreground",
        trigger: "bg-default-100 dark:bg-default-50/10 border-none",
      }}
      size="md"
    >
      {SORT_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
