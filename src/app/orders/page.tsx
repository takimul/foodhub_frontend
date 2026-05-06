"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "/api/v1/orders",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();

      
      const sortedOrders = (
        data.data || []
      ).reverse();

      setOrders(sortedOrders);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchOrders();

    
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);
   const getStatusStyles = (
    status: string
  ) => {
    switch (status) {
      case "PLACED":
        return {
          badge:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

          card:
            "border-yellow-200 dark:border-yellow-900/40",
        };

      case "PREPARING":
        return {
          badge:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

          card:
            "border-blue-200 dark:border-blue-900/40",
        };

      case "READY":
        return {
          badge:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

          card:
            "border-purple-200 dark:border-purple-900/40",
        };

      case "DELIVERED":
        return {
          badge:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

          card:
            "border-green-200 dark:border-green-900/40",
        };

      case "CANCELLED":
        return {
          badge:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

          card:
            "border-red-200 dark:border-red-900/40",
        };

      default:
        return {
          badge:
            "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",

          card:
            "border-zinc-200 dark:border-zinc-800",
        };
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <p className="text-lg">
          Loading orders...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10">

      <section className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track your recent food
            orders in real-time
          </p>
        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="border rounded-3xl p-14 text-center dark:border-zinc-800">

            <h2 className="text-2xl font-bold">
              No orders found
            </h2>

            <p className="text-gray-500 mt-2">
              Your placed orders will
              appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => {
              const styles =
                getStatusStyles(
                  order.status
                );

              return (
                <div
                  key={order.id}
                  className={`border rounded-3xl p-6 space-y-6 bg-white dark:bg-zinc-950 transition ${styles.card}`}
                >
                  {/* TOP */}
                  <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="font-bold text-xl mt-1">
                        #
                        {order.id.slice(
                          0,
                          8
                        )}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${styles.badge}`}
                      >
                        {
                          order.status
                        }
                      </span>

                      <span className="text-sm text-gray-500">
                        ৳
                        {
                          order.totalAmount
                        }
                      </span>

                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-3">

                    {order.items?.map(
                      (item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b dark:border-zinc-800 pb-3"
                        >
                          <div>
                            <h3 className="font-medium">
                              {
                                item.meal
                                  ?.title ||
                                "Meal"
                              }
                            </h3>

                            <p className="text-sm text-gray-500">
                              Quantity:{" "}
                              {
                                item.quantity
                              }
                            </p>
                          </div>

                          <div className="font-semibold">
                            ৳
                            {item.price *
                              item.quantity}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-2">

                    <div className="text-sm text-gray-500">
                      Delivery Address
                    </div>

                    <div className="text-sm font-medium text-right max-w-[60%]">
                      {
                        order.deliveryAddress
                      }
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}