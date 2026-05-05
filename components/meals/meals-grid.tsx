"use client";

import { Meal } from "@/types/meal";
import MealCard from "./meal-card";

export default function MealsGrid({ meals }: { meals: Meal[] }) {
    if (!meals.length) {
  return <p className="text-center text-gray-500">No meals found</p>;
}
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}