"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCartStore } from "@/src/store/cart-store";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeItem,
    totalPrice,
  } = useCartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-zinc-950 shadow-2xl z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b dark:border-zinc-800">
              <h2 className="text-xl font-bold">
                Your Cart
              </h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500">
                  Your cart is empty
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-2xl p-4 dark:border-zinc-800 space-y-3"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ৳{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="border-t dark:border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>৳{totalPrice()}</span>
              </div>

              <button className="w-full py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}