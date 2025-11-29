import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      // State
      theme: "light",
      gridView: "grid", // 'grid' or 'list'
      sortBy: "default", // 'default', 'price-asc', 'price-desc', 'name'

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setGridView: (view) => set({ gridView: view }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "ui-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
