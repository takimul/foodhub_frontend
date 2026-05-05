"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  const handleSearch = () => {
    const query = new URLSearchParams(params.toString());

    if (value) query.set("search", value);
    else query.delete("search");

    router.push(`/?${query.toString()}`);
  };

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-bold">
        Discover Delicious Meals 🍱
      </h1>

      <div className="mt-6 flex justify-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search meals..."
          className="w-full max-w-md px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black"
        >
          Search
        </button>
      </div>
    </section>
  );
}