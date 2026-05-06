"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/theme-toggle";
import { useAuth } from "@/src/hooks/useAuth";
import { useCartStore } from "@/src/store/cart-store";
import { CiShoppingCart } from "react-icons/ci";
import CartDrawer from "@/src/components/cart/cart-drawer";

export default function Navbar() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = useCartStore((state) => state.totalItems());

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });

      await refresh();

      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between">
      {/* LOGO */}
      <Link href="/" className="font-bold text-lg">
        FoodHub
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => setCartOpen(true)} className="relative">
          <CiShoppingCart />
          {mounted &&totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        <ThemeToggle />

        {user ? (
          <>
            <span className="text-sm">{user.email}</span>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
            >
              {loading ? "..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>

      {/* MOBILE BURGER */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
        ☰
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-black border-t dark:border-gray-800 flex flex-col items-center gap-4 py-6 md:hidden"
          >
            <ThemeToggle />

            {user ? (
              <>
                <span className="text-sm">{user.email}</span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer
  open={cartOpen}
  onClose={() => setCartOpen(false)}
/>
    </nav>
  );
}
