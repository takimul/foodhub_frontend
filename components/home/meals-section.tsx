"use client";

import MealCard from "@/components/meals/meal-card";
import CategoryFilter from "./category-filter";

export default function MealsSection({ meals }: { meals: any[] }) {
  return (
    <section className="px-6 pb-12 max-w-7xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Meals</h2>

      <CategoryFilter />

      {meals.length === 0 ? (
        <p className="text-gray-500">No meals found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}