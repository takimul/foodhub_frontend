"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/v1/orders", {
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10">
      <section className="max-w-5xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track your recent food orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="border rounded-3xl p-10 text-center dark:border-zinc-800">
            <p className="text-gray-500">
              No orders found
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-3xl p-6 dark:border-zinc-800 space-y-4"
              >
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-semibold">
                      #{order.id.slice(0, 8)}
                    </h2>
                  </div>

                  <div>
                    <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm">
                      {order.status}
                    </span>
                  </div>
                </div>

                
                <div className="space-y-3">
                  {order.items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.meal?.title} × {item.quantity}
                      </span>

                      <span>
                        ৳
                        {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                
                <div className="border-t dark:border-zinc-800 pt-4 flex justify-between font-semibold">
                  <span>Total</span>

                  <span>
                    ৳{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}