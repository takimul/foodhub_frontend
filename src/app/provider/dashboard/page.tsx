"use client";

import { useEffect, useState } from "react";

export default function ProviderDashboardPage() {
  const [provider, setProvider] =
    useState<any>(null);

  const [stats, setStats] =
    useState({
      meals: 0,
      orders: 0,
      revenue: 0,
    });

  useEffect(() => {
    const load = async () => {
  try {
    
    const providerRes = await fetch(
      "/api/v1/providers/me",
      {
        credentials: "include",
      }
    );

    const providerData =
      await providerRes.json();

    const provider =
      providerData.data;

    setProvider(provider);

    
    const ordersRes = await fetch(
      "/api/v1/orders/provider",
      {
        credentials: "include",
      }
    );

    const ordersData =
      await ordersRes.json();

    const orders =
      ordersData.data || [];
     const mealsRes = await fetch(
      "/api/v1/meals",
      {
        credentials: "include",
      }
    );

    const mealsData =
      await mealsRes.json();
     const meals =
      mealsData.data.meals?.filter(
        (meal: any) =>
          meal.provider?.restaurant ===
          provider.restaurant
      ) || [];

    const revenue = orders.reduce(
      (acc: number, order: any) =>
        acc + order.totalAmount,
      0
    );

    setStats({
      meals: meals.length,
      orders: orders.length,
      revenue,
    });

  } catch (err) {
    console.error(err);
  }
};

    load();
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="border rounded-3xl p-6 dark:border-zinc-800">

        <h1 className="text-3xl font-bold">
          {provider?.restaurant}
        </h1>

        <p className="text-gray-500 mt-2">
          {provider?.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>
            📍 {provider?.address}
          </span>

          <span>
            📞 {provider?.phone}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-sm text-gray-500">
            Total Meals
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.meals}
          </h2>
        </div>

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-sm text-gray-500">
            Orders
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.orders}
          </h2>
        </div>

        <div className="border rounded-3xl p-6 dark:border-zinc-800">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ৳{stats.revenue}
          </h2>
        </div>

      </div>
    </div>
  );
}