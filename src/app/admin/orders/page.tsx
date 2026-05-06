"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "/api/v1/admin/orders",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setOrders(data.data || []);

      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          All platform orders
        </p>
      </div>

      <div className="space-y-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-3xl p-6 dark:border-zinc-800"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div className="space-y-2">

                <h2 className="font-bold text-xl">
                  #
                  {order.id.slice(
                    0,
                    8
                  )}
                </h2>

                <p className="text-sm text-gray-500">
                  Customer:{" "}
                  {
                    order.customer
                      ?.name
                  }
                </p>

                <p className="text-sm text-gray-500">
                  Provider:{" "}
                  {
                    order.provider
                      ?.restaurant
                  }
                </p>

              </div>

              <div className="text-right">
                <p className="font-bold text-2xl">
                  ৳
                  {
                    order.totalAmount
                  }
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {order.status}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}