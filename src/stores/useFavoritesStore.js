import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // State
      favorites: [],

      // Actions
      toggleFavorite: (product) => {
        const favorites = get().favorites;
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [...favorites, product],
          });
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
