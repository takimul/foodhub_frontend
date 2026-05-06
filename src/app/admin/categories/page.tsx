"use client";

import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<any>(null);

  const [editName, setEditName] =
    useState("");

  const [newCategory, setNewCategory] =
    useState("");

  // FETCH
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "/api/v1/categories"
      );

      const data = await res.json();

      setCategories(data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE
  const createCategory = async () => {
    try {
      if (!newCategory.trim()) {
        alert(
          "Category name required"
        );

        return;
      }

      setCreating(true);

      const res = await fetch(
        "/api/v1/categories",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: newCategory,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed"
        );

        return;
      }

      setNewCategory("");

      fetchCategories();

    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  // UPDATE
  const updateCategory = async () => {
    try {
      const res = await fetch(
        `/api/v1/categories/${editingCategory.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: editName,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed"
        );

        return;
      }

      setEditingCategory(null);

      fetchCategories();

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteCategory = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete category?"
    );

    if (!ok) return;

    try {
      await fetch(
        `/api/v1/categories/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      fetchCategories();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading categories...
      </div>
    );
  }

  return (
    <main className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        <p className="text-gray-500 mt-2">
          Manage food categories
        </p>
      </div>

      {/* CREATE */}
      <div className="border rounded-3xl p-6 dark:border-zinc-800 space-y-4">

        <h2 className="text-xl font-bold">
          Create Category
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            value={newCategory}
            onChange={(e) =>
              setNewCategory(
                e.target.value
              )
            }
            placeholder="Category name"
            className="flex-1 border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
          />

          <button
            onClick={createCategory}
            disabled={creating}
            className="px-6 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black"
          >
            {creating
              ? "Creating..."
              : "Create"}
          </button>

        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-3xl p-6 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <div className="space-y-5">

              <div>
                <h2 className="text-2xl font-bold">
                  {category.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {category.slug}
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    setEditingCategory(
                      category
                    );

                    setEditName(
                      category.name
                    );
                  }}
                  className="flex-1 border dark:border-zinc-700 rounded-2xl py-3"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCategory(
                      category.id
                    )
                  }
                  className="flex-1 bg-red-500 text-white rounded-2xl py-3"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

          <div className="w-full max-w-lg bg-white dark:bg-zinc-950 rounded-3xl p-6 space-y-5">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Edit Category
              </h2>

              <button
                onClick={() =>
                  setEditingCategory(
                    null
                  )
                }
              >
                ✕
              </button>

            </div>

            <input
              value={editName}
              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }
              className="w-full border dark:border-zinc-800 rounded-2xl p-4 bg-transparent"
            />

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setEditingCategory(
                    null
                  )
                }
                className="flex-1 border dark:border-zinc-800 rounded-2xl py-3"
              >
                Cancel
              </button>

              <button
                onClick={
                  updateCategory
                }
                className="flex-1 bg-black text-white dark:bg-white dark:text-black rounded-2xl py-3"
              >
                Save Changes
              </button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}