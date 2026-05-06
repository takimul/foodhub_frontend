"use client";

import { useEffect, useState } from "react";

export default function ProviderOrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "/api/v1/orders/provider",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setOrders(data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
   const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    try {
      setUpdatingId(orderId);

      const res = await fetch(
        `/api/v1/orders/provider/${orderId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed to update"
        );

        return;
      }

      fetchOrders();

    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };
   const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-500";

      case "PREPARING":
        return "bg-blue-500";

      case "READY":
        return "bg-purple-500";

      case "DELIVERED":
        return "bg-green-500";

      case "CANCELLED":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading orders...
      </div>
    );
  }

  return (
    <main className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Provider Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer orders
        </p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="border rounded-3xl p-12 text-center dark:border-zinc-800">

          <h2 className="text-2xl font-bold">
            No orders yet
          </h2>

          <p className="text-gray-500 mt-2">
            Customer orders will
            appear here
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-3xl p-6 dark:border-zinc-800 bg-white dark:bg-zinc-950"
            >
              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* ORDER INFO */}
                <div className="space-y-3">

                  <div className="flex items-center gap-3 flex-wrap">

                    <h2 className="text-xl font-bold">
                      Order #
                      {order.id.slice(
                        0,
                        8
                      )}
                    </h2>

                    <span
                      className={`text-xs text-white px-3 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="space-y-1 text-sm text-gray-500">

                    <p>
                      Customer:{" "}
                      {
                        order.customer
                          ?.name
                      }
                    </p>

                    <p>
                      Email:{" "}
                      {
                        order.customer
                          ?.email
                      }
                    </p>

                    <p>
                      Address:{" "}
                      {
                        order.deliveryAddress
                      }
                    </p>

                    <p>
                      Total: ৳
                      {
                        order.totalAmount
                      }
                    </p>

                  </div>
                </div>

                {/* STATUS */}
                <div className="min-w-[220px]">

                  <label className="text-sm text-gray-500 block mb-2">
                    Update Status
                  </label>

                  <select
                    value={order.status}
                    disabled={
                      updatingId ===
                      order.id
                    }
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full border dark:border-zinc-700 rounded-2xl px-4 py-3 bg-transparent"
                  >
                    <option value="PLACED">
                      PLACED
                    </option>

                    <option value="PREPARING">
                      PREPARING
                    </option>

                    <option value="READY">
                      READY
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>
                  </select>

                </div>
              </div>

              {/* ITEMS */}
              <div className="mt-6 border-t dark:border-zinc-800 pt-6">

                <h3 className="font-semibold mb-4">
                  Order Items
                </h3>

                <div className="space-y-3">

                  {order.items.map(
                    (
                      item: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          Meal ID:{" "}
                          {
                            item.mealId
                          }
                        </div>

                        <div className="flex items-center gap-4">
                          <span>
                            Qty:{" "}
                            {
                              item.quantity
                            }
                          </span>

                          <span>
                            ৳
                            {
                              item.price
                            }
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}