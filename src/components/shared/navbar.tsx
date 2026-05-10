"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CiShoppingCart } from "react-icons/ci";

import ThemeToggle from "../ui/theme-toggle";
import { useAuth } from "@/src/hooks/useAuth";
import { useCartStore } from "@/src/store/cart-store";
import CartDrawer from "@/src/components/cart/cart-drawer";
import BecomeProviderButton from "@/src/components/provider/become-provider-button";

export default function Navbar() {
  const { user, refresh } = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const totalItems = useCartStore((state) => state.totalItems());

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

      window.dispatchEvent(new Event("auth-changed"));

      await refresh();

      router.replace("/login");
      router.refresh();

    } finally {
      setLoading(false);
    }
  };
  const RoleButton = () => {
    // if (user?.role === "CUSTOMER") {
    //   return <BecomeProviderButton />;
    // }
    if (user?.role === "PROVIDER") {
      return (
        <Link
          href="/provider/dashboard"
          className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:opacity-90 transition"
        >
          Dashboard
        </Link>
      );
    }
    if (user?.role === "ADMIN") {
      return (
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:opacity-90 transition"
        >
          Admin
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold">
            FoodHub
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm hover:text-orange-500 transition">
              Home
            </Link>

            {user && (
              <Link
                href="/orders"
                className="text-sm hover:text-orange-500 transition"
              >
                Orders
              </Link>
            )}

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-2xl"
            >
              <CiShoppingCart />

              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <ThemeToggle />

            {/* AUTH */}
            {user ? (
              <div className="flex items-center gap-3">
                <RoleButton />

                <span className="text-sm text-gray-500 max-w-[160px] truncate">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                >
                  {loading ? "..." : "Logout"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl border dark:border-zinc-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="md:hidden border-t dark:border-zinc-800 bg-white dark:bg-black"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>

                {user && (
                  <Link href="/orders" onClick={() => setOpen(false)}>
                    Orders
                  </Link>
                )}

                {/* CART */}
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <CiShoppingCart />

                  <span>
                    Cart
                    {mounted && totalItems > 0 && ` (${totalItems})`}
                  </span>
                </button>

                <ThemeToggle />

                {/* ROLE BUTTON */}
                {user && (
                  <div onClick={() => setOpen(false)}>
                    <RoleButton />
                  </div>
                )}

                {/* AUTH */}
                {user ? (
                  <>
                    <span className="text-sm text-gray-500 break-all">
                      {user.email}
                    </span>

                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-fit px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
                    >
                      {loading ? "..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 rounded-xl border dark:border-zinc-700 text-center"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
