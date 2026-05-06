"use client";

import { useCartStore } from "@/src/store/cart-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const { items, totalPrice, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: "",
    phone: "",
  });

  const handleOrder = async () => {
    try {
      
      if (!form.address.trim()) {
        alert("Address is required");
        return;
      }

      if (!form.phone.trim()) {
        alert("Phone number is required");
        return;
      }

      if (items.length === 0) {
        alert("Your cart is empty");
        return;
      }

      setLoading(true);

      const payload = {
        items: items.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
        deliveryAddress: form.address,
      };

      const res = await fetch("/api/v1/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      
      clearCart();

      
      router.push("/orders");

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">


        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>


          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Delivery Address
            </label>

            <textarea
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              placeholder="Enter delivery address"
              className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
              rows={4}
            />
          </div>


          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Phone Number
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="01XXXXXXXXX"
              className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none"
            />
          </div>
        </div>


        <div className="border rounded-3xl p-6 h-fit dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <div>
                    <h3 className="font-medium">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p>
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t dark:border-zinc-800 mt-6 pt-6 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>৳{totalPrice()}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading || items.length === 0}
            className="mt-6 w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </section>
    </main>
  );
}