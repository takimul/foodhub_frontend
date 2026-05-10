"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("CUSTOMER");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      // REGISTER
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();

        console.log(errData);

        throw new Error(errData.message || "Registration failed");
      }

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      // 🔥 PROVIDER FLOW
      if (role === "PROVIDER") {
        const roleRes = await fetch("/api/v1/auth/become-provider", {
          method: "PATCH",

          credentials: "include",
        });

        if (!roleRes.ok) {
          throw new Error("Failed to become provider");
        }

        window.dispatchEvent(new Event("auth-changed"));

        router.replace("/provider/setup");

        return;
      }

      // CUSTOMER FLOW
      window.dispatchEvent(new Event("auth-changed"));

      router.replace("/");
    } catch (error) {
      console.error(error);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[36px] overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        {/* LEFT */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-3xl">
              🍔
            </div>

            <h1 className="text-5xl font-black mt-10 leading-tight">
              Join
              <br />
              FoodHub
            </h1>

            <p className="mt-6 text-orange-100 text-lg leading-relaxed max-w-md">
              Start ordering delicious meals or launch your own restaurant
              business online.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            <div>
              <p className="font-semibold">10k+ Happy Users</p>

              <p className="text-sm text-orange-100">
                Trusted food delivery platform
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* HEADER */}
            <div className="mb-10">
              <h2 className="text-4xl font-black tracking-tight">
                Create Account
              </h2>

              <p className="text-gray-500 mt-3">
                Choose your role and start using FoodHub
              </p>
            </div>

            {/* ROLE SELECT */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* CUSTOMER */}
              <button
                onClick={() => setRole("CUSTOMER")}
                className={`rounded-3xl border p-5 text-left transition-all ${
                  role === "CUSTOMER"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-zinc-800 hover:border-orange-300"
                }`}
              >
                <div className="text-4xl">🍽️</div>

                <h3 className="font-bold text-lg mt-4">Customer</h3>

                <p className="text-sm text-gray-500 mt-2">
                  Order meals from restaurants
                </p>
              </button>

              {/* PROVIDER */}
              <button
                onClick={() => setRole("PROVIDER")}
                className={`rounded-3xl border p-5 text-left transition-all ${
                  role === "PROVIDER"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-zinc-800 hover:border-orange-300"
                }`}
              >
                <div className="text-4xl">🧑‍🍳</div>

                <h3 className="font-bold text-lg mt-4">Provider</h3>

                <p className="text-sm text-gray-500 mt-2">
                  Sell meals and manage orders
                </p>
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-50 mt-4"
              >
                {loading
                  ? "Creating Account..."
                  : role === "PROVIDER"
                    ? "Continue as Provider"
                    : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
