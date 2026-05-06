"use client";

import { Meal } from "@/src/types/meal";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
     className="rounded-2xl border dark:border-gray-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition duration-300"
    >
      <Link href={`/meals/${meal.id}`}>
      {/* IMAGE */}
      <div className="h-40 bg-gray-200 dark:bg-gray-800">
        {meal.imageUrl && (
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{meal.title}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {meal.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-base">
            ${meal.price.toFixed(2)}
          </span>

          <span className="text-xs text-gray-400">
            {meal.provider.restaurant}
          </span>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}