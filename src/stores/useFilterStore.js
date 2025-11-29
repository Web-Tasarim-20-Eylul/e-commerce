import { create } from "zustand";

export const useFilterStore = create((set) => ({
  // State
  selectedCategory: "all",
  priceRange: [0, 1000],
  sortBy: "default", // 'default', 'price-asc', 'price-desc', 'name', 'rating'
  searchQuery: "",

  // Actions
  setCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      selectedCategory: "all",
      priceRange: [0, 1000],
      sortBy: "default",
      searchQuery: "",
    }),
}));
