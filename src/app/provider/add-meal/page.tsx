"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMealPage() {
  const router = useRouter();

  const [categories, setCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
  });

  // LOAD CATEGORIES
  useEffect(() => {
    const loadCategories =
      async () => {
        try {
          const res = await fetch(
            "/api/v1/categories"
          );

          const data =
            await res.json();

          setCategories(
            data.data || []
          );

        } catch (err) {
          console.error(err);
        }
      };

    loadCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      // VALIDATION
      if (
        !form.title ||
        !form.description ||
        !form.price ||
        !form.categoryId
      ) {
        alert(
          "Please fill all required fields"
        );

        return;
      }

      setLoading(true);

      const payload = {
        title: form.title,
        description:
          form.description,
        price: Number(form.price),
        categoryId:
          form.categoryId,
        imageUrl:
          form.imageUrl || undefined,
      };

      const res = await fetch(
        "/api/v1/meals/provider",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to create meal"
        );
      }

      alert(
        "Meal added successfully"
      );

      router.push(
        "/provider/meals"
      );

      router.refresh();

    } catch (err: any) {
      console.error(err);

      alert(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      <section className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">
            Add New Meal
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new food item
            for your restaurant
          </p>
        </div>

        {/* FORM */}
        <div className="border rounded-3xl p-6 dark:border-zinc-800 space-y-5">

          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Meal Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              placeholder="Chicken Burger"
              className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Description
            </label>

            <textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              placeholder="Delicious spicy burger..."
              className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
            />
          </div>

          {/* PRICE + CATEGORY */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="space-y-2">
              <label className="text-sm text-gray-500">
                Price
              </label>

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price:
                      e.target.value,
                  })
                }
                placeholder="250"
                className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">
                Category
              </label>

              <select
                value={
                  form.categoryId
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId:
                      e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
              >
                <option value="">
                  Select category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={
                        category.id
                      }
                      value={
                        category.id
                      }
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Image URL
            </label>

            <input
              value={form.imageUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl:
                    e.target.value,
                })
              }
              placeholder="https://..."
              className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
            />
          </div>

          {/* PREVIEW */}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="w-full h-64 object-cover rounded-2xl"
            />
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
          >
            {loading
              ? "Creating Meal..."
              : "Add Meal"}
          </button>
        </div>
      </section>
    </main>
  );
}