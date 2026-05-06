import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/src/types/cart";

type CartStore = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;

  removeItem: (id: string) => void;

  increaseQty: (id: string) => void;

  decreaseQty: (id: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                  }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...item,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter(
            (i) => i.id !== id
          ),
        });
      },

      increaseQty: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          ),
        });
      },

      decreaseQty: (id) => {
        set({
          items: get().items
            .map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                  }
                : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),

      totalPrice: () =>
        get().items.reduce(
          (acc, item) =>
            acc + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "foodhub-cart",
    }
  )
);