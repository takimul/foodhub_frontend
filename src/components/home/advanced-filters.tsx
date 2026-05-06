"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AdvancedFilters() {
  const router = useRouter();

  const params = useSearchParams();

  const updateFilter = (
    key: string,
    value: string
  ) => {
    const query =
      new URLSearchParams(
        params.toString()
      );

    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }

    router.push(`/?${query}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">

      {/* CUISINE */}
      <select
        onChange={(e) =>
          updateFilter(
            "cuisine",
            e.target.value
          )
        }
        defaultValue={
          params.get("cuisine") ||
          ""
        }
        className="px-4 py-3 rounded-2xl border dark:border-zinc-800 bg-transparent"
      >
        <option value="">
          All Cuisine
        </option>

        <option value="Bangladeshi">
          Bangladeshi
        </option>

        <option value="Chinese">
          Chinese
        </option>

        <option value="Italian">
          Italian
        </option>

        <option value="Indian">
          Indian
        </option>
      </select>

      {/* DIETARY */}
      <select
        onChange={(e) =>
          updateFilter(
            "dietary",
            e.target.value
          )
        }
        defaultValue={
          params.get("dietary") ||
          ""
        }
        className="px-4 py-3 rounded-2xl border dark:border-zinc-800 bg-transparent"
      >
        <option value="">
          Dietary
        </option>

        <option value="Halal">
          Halal
        </option>

        <option value="Vegan">
          Vegan
        </option>

        <option value="Vegetarian">
          Vegetarian
        </option>

        <option value="Gluten Free">
          Gluten Free
        </option>
      </select>

      {/* PRICE */}
      <select
        onChange={(e) =>
          updateFilter(
            "maxPrice",
            e.target.value
          )
        }
        defaultValue={
          params.get("maxPrice") ||
          ""
        }
        className="px-4 py-3 rounded-2xl border dark:border-zinc-800 bg-transparent"
      >
        <option value="">
          Price Range
        </option>

        <option value="200">
          Under ৳200
        </option>

        <option value="500">
          Under ৳500
        </option>

        <option value="1000">
          Under ৳1000
        </option>
      </select>

    </div>
  );
}