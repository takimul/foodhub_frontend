"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = ["all", "rice", "burger", "pizza", "dessert"];

export default function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const active = params.get("category") || "all";

  const handleClick = (cat: string) => {
    const query = new URLSearchParams(params.toString());

    if (cat === "all") query.delete("category");
    else query.set("category", cat);

    router.push(`/?${query.toString()}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-full text-sm ${
            active === cat
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}