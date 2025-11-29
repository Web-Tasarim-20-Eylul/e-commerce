"use client";

import { Card, CardBody, Button, Divider } from "@heroui/react";
import { useFilterStore } from "@/stores";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

export default function FilterSidebar() {
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const priceRange = useFilterStore((state) => state.priceRange);

  const hasActiveFilters =
    selectedCategory !== "all" || priceRange[0] !== 0 || priceRange[1] !== 1000;

  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50 sticky top-20">
      <CardBody className="gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Filtreler</h2>
          {hasActiveFilters && (
            <Button
              size="sm"
              variant="light"
              color="primary"
              onClick={resetFilters}
            >
              Temizle
            </Button>
          )}
        </div>

        <Divider className="bg-default-200 dark:bg-default-100" />

        <CategoryFilter />

        <Divider className="bg-default-200 dark:bg-default-100" />

        <PriceFilter />
      </CardBody>
    </Card>
  );
}
