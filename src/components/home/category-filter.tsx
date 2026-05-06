"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories }: any) {
  const router = useRouter();
  const params = useSearchParams();

  const active = params.get("category") || "all";

  const handleClick = (slug: string) => {
    const query = new URLSearchParams(params.toString());

    if (slug === "all") {
      query.delete("category");
    } else {
      query.set("category", slug);
    }

    query.delete("page"); 

    router.push(`/?${query.toString()}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {/* ALL */}
      <button
        onClick={() => handleClick("all")}
        className={`px-4 py-2 rounded-full ${
          active === "all"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        All
      </button>

      {/* DYNAMIC */}
      {categories?.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.slug)}
          className={`px-4 py-2 rounded-full ${
            active === cat.slug
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}