// "use client";

// import MealCard from "@/components/meals/meal-card";
// import CategoryFilter from "./category-filter";

// export default function MealsSection({ meals }: { meals: any[] }) {
//   return (
//     <section className="px-6 pb-12 max-w-7xl mx-auto space-y-6">
//       <h2 className="text-xl font-semibold">Meals</h2>

//       <CategoryFilter />

//       {meals.length === 0 ? (
//         <p className="text-gray-500">No meals found</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {meals.map((meal) => (
//             <MealCard key={meal.id} meal={meal} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import MealCard from "@/components/meals/meal-card";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./category-filter";

export default function MealsSection({ initialData }: any) {
  const params = useSearchParams();

  const [meals, setMeals] = useState(initialData.meals);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // 🚫 prevent duplicate calls

  const hasMore = page < totalPages;

  // 🔥 RESET when filters change
  useEffect(() => {
    setMeals(initialData.meals);
    setPage(initialData.page);
    setTotalPages(initialData.totalPages);
  }, [initialData]);

  // 🔥 LOAD MORE FUNCTION
  const loadMore = async () => {
    if (!hasMore || loading || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const query = new URLSearchParams(params.toString());
      query.set("page", String(page + 1));

      const res = await fetch(`/api/v1/meals?${query.toString()}`);
      const data = await res.json();

      setMeals((prev: any) => [...prev, ...data.data.meals]);
      setPage(data.data.page);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      console.error("Load more failed", err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  // 🔥 INTERSECTION OBSERVER
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px", // 🔥 preload before reaching bottom
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [page, totalPages, params]); // 👈 reacts to filter changes

  return (
    <section className="px-6 pb-12 max-w-7xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Meals</h2>

      <CategoryFilter />

      {meals.length === 0 ? (
        <p className="text-gray-500 text-center">No meals found</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meals.map((meal: any) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          {/* 🔥 LOAD MORE TRIGGER */}
          {hasMore && (
            <div
              ref={observerRef}
              className="h-16 flex items-center justify-center text-gray-500"
            >
              {loading ? "Loading more..." : "Scroll for more"}
            </div>
          )}
        </>
      )}
    </section>
  );
}