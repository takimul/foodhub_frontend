"use client";

import { useEffect, useMemo, useState } from "react";

export default function ProviderDashboardPage() {
  const [provider, setProvider] =
    useState<any>(null);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [meals, setMeals] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // PROVIDER
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

        // ORDERS
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

        setOrders(orders);

        // MEALS
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
              meal.provider
                ?.restaurant ===
              provider.restaurant
          ) || [];

        setMeals(meals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // STATS
  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (
        acc: number,
        order: any
      ) =>
        acc +
        order.totalAmount,
      0
    );

    const totalReviews =
      meals.reduce(
        (
          acc: number,
          meal: any
        ) =>
          acc +
          (meal.reviewCount ||
            0),
        0
      );

    const totalRatings =
      meals.reduce(
        (
          acc: number,
          meal: any
        ) =>
          acc +
          ((meal.averageRating ||
            0) *
            (meal.reviewCount ||
              0)),
        0
      );

    const averageRating =
      totalReviews > 0
        ? totalRatings /
          totalReviews
        : 0;

    return {
      meals: meals.length,
      orders: orders.length,
      revenue,
      reviews: totalReviews,
      rating:
        averageRating.toFixed(1),
    };
  }, [orders, meals]);

  // TOP MEALS
  const topMeals = [...meals]
    .sort(
      (a, b) =>
        (b.reviewCount || 0) -
        (a.reviewCount || 0)
    )
    .slice(0, 4);

  // RECENT ORDERS
  const recentOrders =
    orders.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 md:p-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/20 bg-white/10">
              {provider?.logoUrl ? (
                <img
                  src={
                    provider.logoUrl
                  }
                  alt={
                    provider.restaurant
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🍽️
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {
                  provider?.restaurant
                }
              </h1>

              <p className="mt-2 text-orange-100 max-w-xl">
                {
                  provider?.description
                }
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-orange-100">
                <span>
                  📍{" "}
                  {
                    provider?.address
                  }
                </span>

                <span>
                  📞{" "}
                  {
                    provider?.phone
                  }
                </span>
              </div>
            </div>
          </div>

          {/* RATING */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 min-w-[220px]">
            <p className="text-sm text-orange-100">
              Restaurant Rating
            </p>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-5xl font-bold">
                {
                  stats.rating
                }
              </span>

              <div>
                <div className="flex text-yellow-300 text-lg">
                  ★★★★★
                </div>

                <p className="text-sm text-orange-100 mt-1">
                  {
                    stats.reviews
                  }{" "}
                  reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* MEALS */}
        <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div className="text-4xl">
            🍔
          </div>

          <p className="text-gray-500 mt-4">
            Total Meals
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.meals}
          </h2>
        </div>

        {/* ORDERS */}
        <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div className="text-4xl">
            📦
          </div>

          <p className="text-gray-500 mt-4">
            Orders
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.orders}
          </h2>
        </div>

        {/* REVENUE */}
        <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div className="text-4xl">
            💰
          </div>

          <p className="text-gray-500 mt-4">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ৳
            {stats.revenue}
          </h2>
        </div>

        {/* REVIEWS */}
        <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div className="text-4xl">
            ⭐
          </div>

          <p className="text-gray-500 mt-4">
            Reviews
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              stats.reviews
            }
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid xl:grid-cols-3 gap-8">
        {/* TOP MEALS */}
        <div className="xl:col-span-2 rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Top Meals
              </h2>

              <p className="text-gray-500 mt-1">
                Best performing
                meals by reviews
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {topMeals.map(
              (meal: any) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between gap-5 rounded-2xl border border-gray-100 dark:border-zinc-800 p-4"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 dark:bg-zinc-800">
                      <img
                        src={
                          meal.imageUrl ||
                          "https://placehold.co/400"
                        }
                        alt={
                          meal.title
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {
                          meal.title
                        }
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        ৳
                        {
                          meal.price
                        }
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500">
                          ★
                        </span>

                        <span className="font-medium">
                          {meal.averageRating
                            ? meal.averageRating.toFixed(
                                1
                              )
                            : "New"}
                        </span>

                        <span className="text-sm text-gray-500">
                          (
                          {meal.reviewCount ||
                            0}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* REVIEWERS */}
                  <div className="hidden md:flex -space-x-3">
                    {meal.reviews
                      ?.slice(0, 4)
                      .map(
                        (
                          review: any
                        ) => (
                          <img
                            key={
                              review.id
                            }
                            src={
                              review
                                .customer
                                ?.image ||
                              `https://ui-avatars.com/api/?name=${review.customer?.name}`
                            }
                            alt={
                              review
                                .customer
                                ?.name
                            }
                            className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 object-cover"
                          />
                        )
                      )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

            <p className="text-gray-500 mt-1">
              Latest incoming
              customer orders
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {recentOrders.map(
              (order: any) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      #
                      {order.id.slice(
                        0,
                        8
                      )}
                    </h3>

                    <span className="text-sm font-medium text-orange-500">
                      ৳
                      {
                        order.totalAmount
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
                      {order.customer
                        ?.image ? (
                        <img
                          src={
                            order
                              .customer
                              .image
                          }
                          alt={
                            order
                              .customer
                              .name
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm">
                          👤
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-medium">
                        {
                          order
                            .customer
                            ?.name
                        }
                      </p>

                      <p className="text-xs text-gray-500">
                        {
                          order.status
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}