"use client";

import { Slider } from "@heroui/react";
import { useFilterStore } from "@/stores";

export default function PriceFilter() {
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Fiyat Aralığı</h3>
        <span className="text-sm text-default-500">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        label=" "
        step={10}
        minValue={0}
        maxValue={1000}
        value={priceRange}
        onChange={setPriceRange}
        className="max-w-full"
        color="primary"
        classNames={{
          base: "gap-3",
          label: "text-foreground",
          value: "text-foreground",
        }}
      />
      <div className="flex justify-between text-xs text-default-500">
        <span>$0</span>
        <span>$1000</span>
      </div>
    </div>
  );
}
