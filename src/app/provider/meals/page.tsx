"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProviderMealsPage() {
  const [meals, setMeals] = useState<any[]>([]);
  const [categories, setCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);
   const [editingMeal, setEditingMeal] =
    useState<any>(null);

  const [editLoading, setEditLoading] =
    useState(false);

  const [editForm, setEditForm] =
    useState({
      title: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
    });
   const loadMeals = async () => {
    try {
      const [
        mealsRes,
        providerRes,
        categoriesRes,
      ] = await Promise.all([
        fetch("/api/v1/meals"),

        fetch("/api/v1/providers/me", {
          credentials: "include",
        }),

        fetch("/api/v1/categories"),
      ]);

      const mealsData =
        await mealsRes.json();

      const providerData =
        await providerRes.json();

      const categoriesData =
        await categoriesRes.json();

      setCategories(
        categoriesData.data || []
      );

      const provider =
        providerData.data;

      const providerMeals =
        mealsData.data.meals.filter(
          (meal: any) =>
            meal.provider?.restaurant ===
            provider.restaurant
        );

      setMeals(providerMeals);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);
   const handleDelete = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this meal?"
    );

    if (!ok) return;

    try {
      await fetch(
        `/api/v1/meals/provider/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      loadMeals();

    } catch (err) {
      console.error(err);
    }
  };
   const handleUpdate = async () => {
    try {
      setEditLoading(true);

      const res = await fetch(
        `/api/v1/meals/provider/${editingMeal.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: editForm.title,
            description:
              editForm.description,
            price: Number(
              editForm.price
            ),
            categoryId:
              editForm.categoryId,
            imageUrl:
              editForm.imageUrl,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Update failed"
        );

        return;
      }

      setEditingMeal(null);

      loadMeals();

    } catch (err) {
      console.error(err);
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading meals...
      </div>
    );
  }

  return (
    <main className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            My Meals
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your restaurant
            meals
          </p>
        </div>

        <Link
          href="/provider/add-meal"
          className="px-5 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium text-center"
        >
          Add Meal
        </Link>
      </div>

      {/* EMPTY */}
      {meals.length === 0 ? (
        <div className="border rounded-3xl p-12 text-center dark:border-zinc-800">

          <h2 className="text-2xl font-bold">
            No meals added yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first
            meal
          </p>

          <Link
            href="/provider/add-meal"
            className="inline-block mt-6 px-5 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black"
          >
            Add Meal
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {meals.map((meal) => (
            <div
              key={meal.id}
              className="border rounded-3xl overflow-hidden dark:border-zinc-800 bg-white dark:bg-zinc-950"
            >
              {/* IMAGE */}
              <img
                src={
                  meal.imageUrl ||
                  "https://placehold.co/600x400"
                }
                alt={meal.title}
                className="w-full h-56 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5 space-y-4">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-xl font-bold">
                      {meal.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {
                        meal.category
                          ?.name
                      }
                    </p>
                  </div>

                  <span className="font-bold text-lg">
                    ৳{meal.price}
                  </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {meal.description}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setEditingMeal(
                        meal
                      );

                      setEditForm({
                        title:
                          meal.title,
                        description:
                          meal.description,
                        price:
                          meal.price,
                        categoryId:
                          meal.categoryId,
                        imageUrl:
                          meal.imageUrl ||
                          "",
                      });
                    }}
                    className="flex-1 border dark:border-zinc-700 rounded-2xl py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        meal.id
                      )
                    }
                    className="flex-1 rounded-2xl py-2 bg-red-500 text-white hover:opacity-90 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingMeal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

          <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-3xl p-6 space-y-5">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Edit Meal
              </h2>

              <button
                onClick={() =>
                  setEditingMeal(
                    null
                  )
                }
              >
                ✕
              </button>
            </div>

            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  title:
                    e.target.value,
                })
              }
              placeholder="Title"
              className="w-full border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
            />

            <textarea
              value={
                editForm.description
              }
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  description:
                    e.target
                      .value,
                })
              }
              rows={4}
              placeholder="Description"
              className="w-full border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="number"
                value={
                  editForm.price
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price:
                      e.target
                        .value,
                  })
                }
                placeholder="Price"
                className="border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
              />

              <select
                value={
                  editForm.categoryId
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    categoryId:
                      e.target
                        .value,
                  })
                }
                className="border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
              >
                {categories.map(
                  (cat) => (
                    <option
                      key={
                        cat.id
                      }
                      value={
                        cat.id
                      }
                    >
                      {cat.name}
                    </option>
                  )
                )}
              </select>

            </div>

            <input
              value={
                editForm.imageUrl
              }
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  imageUrl:
                    e.target
                      .value,
                })
              }
              placeholder="Image URL"
              className="w-full border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
            />

            {/* PREVIEW */}
            {editForm.imageUrl && (
              <img
                src={
                  editForm.imageUrl
                }
                alt="preview"
                className="w-full h-60 object-cover rounded-2xl"
              />
            )}

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setEditingMeal(
                    null
                  )
                }
                className="flex-1 border dark:border-zinc-800 rounded-2xl py-3"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleUpdate
                }
                disabled={
                  editLoading
                }
                className="flex-1 rounded-2xl py-3 bg-black text-white dark:bg-white dark:text-black"
              >
                {editLoading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}