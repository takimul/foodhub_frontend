"use client";

import { useEffect, useState } from "react";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/v1/orders/provider", {
        credentials: "include",
      });

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
  const updateStatus = async (orderId: string, status: string) => {
    try {
      setUpdatingId(orderId);

      const res = await fetch(`/api/v1/orders/provider/${orderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update");

        return;
      }

      fetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };
  const getStatusColor = (status: string) => {
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
    return <div className="p-10">Loading orders...</div>;
  }

  return (
    <main className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Provider Orders</h1>

        <p className="text-gray-500 mt-2">Manage customer orders</p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="border rounded-3xl p-12 text-center dark:border-zinc-800">
          <h2 className="text-2xl font-bold">No orders yet</h2>

          <p className="text-gray-500 mt-2">Customer orders will appear here</p>
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
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <span
                      className={`text-xs text-white px-3 py-1 rounded-full ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* AVATAR */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
                      {order.customer?.image ? (
                        <img
                          src={order.customer.image}
                          alt={order.customer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                          👤
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>
                        Customer:
                        <span className="ml-1 font-medium text-black dark:text-white">
                          {order.customer?.name}
                        </span>
                      </p>

                      <p>
                        Email:
                        <span className="ml-1">{order.customer?.email}</span>
                      </p>

                      <p>
                        Address:
                        <span className="ml-1">{order.deliveryAddress}</span>
                      </p>

                      <p>
                        Total:
                        <span className="ml-1 font-semibold text-black dark:text-white">
                          ৳{order.totalAmount}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div className="min-w-[220px]">
                  <label className="text-sm text-gray-500 block mb-2">
                    Update Status
                  </label>

                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="w-full border dark:border-zinc-700 rounded-2xl px-4 py-3 bg-transparent"
                  >
                    <option value="PLACED">PLACED</option>

                    <option value="PREPARING">PREPARING</option>

                    <option value="READY">READY</option>

                    <option value="DELIVERED">DELIVERED</option>

                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* ITEMS */}
              <div className="mt-8 border-t dark:border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-lg">Order Items</h3>

                  <div className="text-sm text-gray-500">
                    {order.items.length} items
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => {
                    const averageRating =
                      item.meal?.reviews?.length > 0
                        ? item.meal.reviews.reduce(
                            (acc: number, r: any) => acc + r.rating,
                            0,
                          ) / item.meal.reviews.length
                        : 0;

                    return (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/40 p-4"
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                          {/* IMAGE */}
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 dark:bg-zinc-800 flex-shrink-0">
                            {item.meal?.imageUrl ? (
                              <img
                                src={item.meal.imageUrl}
                                alt={item.meal.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* INFO */}
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.meal?.title}
                              </h3>

                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            {/* REVIEWS */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>

                                <span className="text-sm font-medium">
                                  {averageRating > 0
                                    ? averageRating.toFixed(1)
                                    : "New"}
                                </span>
                              </div>

                              <span className="text-xs text-gray-500">
                                ({item.meal?.reviews?.length || 0} reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right space-y-2">
                          <div>
                            <p className="text-sm text-gray-500">Price</p>

                            <h3 className="font-bold text-lg">৳{item.price}</h3>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Total</p>

                            <h3 className="font-bold text-2xl">
                              ৳{item.price * item.quantity}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
