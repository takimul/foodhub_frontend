"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "/api/v1/admin/dashboard",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setStats(data.data);

      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor platform analytics
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-gray-500 text-sm">
            Providers
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.totalProviders}
          </h2>
        </div>

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-gray-500 text-sm">
            Orders
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-gray-500 text-sm">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ৳{stats.totalRevenue}
          </h2>
        </div>

      </div>
    </div>
  );
}