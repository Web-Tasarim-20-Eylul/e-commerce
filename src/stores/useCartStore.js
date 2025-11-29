import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Ürün zaten sepette varsa, miktarını artır
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Yeni ürün ekle
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrementQuantity: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        if (item && item.quantity > 1) {
          set({
            items: get().items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          get().removeItem(productId);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Computed values
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
