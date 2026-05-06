"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-72 min-h-screen border-r dark:border-zinc-800 p-6 hidden lg:block">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Admin</h1>

            <p className="text-gray-500 mt-2">FoodHub Dashboard</p>
          </div>

          <nav className="space-y-3">
            <Link
              href="/admin/dashboard"
              className="block px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/users"
              className="block px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Users
            </Link>

            <Link
              href="/admin/orders"
              className="block px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Orders
            </Link>

            <Link
              href="/admin/categories"
              className="block px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Categories
            </Link>
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="flex-1 p-6 lg:p-10">{children}</section>
      </div>
    </main>
  );
}
