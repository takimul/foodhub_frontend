"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/src/store/cart-store";

export default function AddToCartButton({
  meal,
}: {
  meal: any;
}) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const handleAdd = () => {
    addItem({
      id: meal.id,
      title: meal.title,
      price: meal.price,
      image: meal.image,
    });
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleAdd}
      className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium shadow-lg"
    >
      Add To Cart
    </motion.button>
  );
}