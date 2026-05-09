"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/v1/orders", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      const sortedOrders = (data.data || []).reverse();

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

    return () => clearInterval(interval);
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PLACED":
        return {
          badge:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

          card: "border-yellow-200 dark:border-yellow-900/40",
        };

      case "PREPARING":
        return {
          badge:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

          card: "border-blue-200 dark:border-blue-900/40",
        };

      case "READY":
        return {
          badge:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

          card: "border-purple-200 dark:border-purple-900/40",
        };

      case "DELIVERED":
        return {
          badge:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

          card: "border-green-200 dark:border-green-900/40",
        };

      case "CANCELLED":
        return {
          badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

          card: "border-red-200 dark:border-red-900/40",
        };

      default:
        return {
          badge:
            "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",

          card: "border-zinc-200 dark:border-zinc-800",
        };
    }
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setComment("");
    setRating(5);
  };

  const submitReview = async () => {
    if (!selectedMeal) return;

    try {
      setSubmitting(true);

      const res = await fetch("/api/v1/reviews", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          mealId: selectedMeal.id,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Review added");

        fetchOrders();

        closeModal();
      } else {
        alert(data.message || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <p className="text-lg">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10">
      <section className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">My Orders</h1>

          <p className="text-gray-500 mt-2">
            Track your recent food orders in real-time
          </p>
        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="border rounded-3xl p-14 text-center dark:border-zinc-800">
            <h2 className="text-2xl font-bold">No orders found</h2>

            <p className="text-gray-500 mt-2">
              Your placed orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const styles = getStatusStyles(order.status);

              return (
                <div
                  key={order.id}
                  className={`border rounded-3xl p-6 space-y-6 bg-white dark:bg-zinc-950 transition ${styles.card}`}
                >
                  {/* TOP */}
                  <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-5">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>

                      <h2 className="font-bold text-xl mt-1">
                        #{order.id.slice(0, 8)}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${styles.badge}`}
                      >
                        {order.status}
                      </span>

                      <span className="text-sm text-gray-500">
                        ৳{order.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* ITEMS */}
                  {/* ITEMS */}
                  <div className="space-y-4">
                    {order.items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-5 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 bg-gray-50 dark:bg-zinc-900/40"
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
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            {/* REVIEW ACTION */}
                            {order.status === "DELIVERED" && (
                              <>
                                {!item.meal?.reviews?.length ? (
                                  <button
                                    onClick={() => setSelectedMeal(item.meal)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition"
                                  >
                                    ★ Leave Review
                                  </button>
                                ) : (
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-semibold">
                                    ✓ Reviewed
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>

                          <h3 className="text-xl font-bold">
                            ৳{item.price * item.quantity}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-500">
                      Delivery Address
                    </div>

                    <div className="text-sm font-medium text-right max-w-[60%]">
                      {order.deliveryAddress}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* REVIEW MODAL */}
      {selectedMeal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 p-6 space-y-5">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Leave Review</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {selectedMeal.title}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* STARS */}
            <div className="flex items-center gap-2">
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`text-3xl transition ${
                    i < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* COMMENT */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full h-32 rounded-2xl border dark:border-zinc-700 bg-transparent p-4 outline-none resize-none"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-xl border dark:border-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                disabled={submitting || comment.trim().length < 3}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
