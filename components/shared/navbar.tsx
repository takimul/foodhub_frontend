"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "../ui/theme-toggle";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800"
    >
      <Link href="/" className="font-bold text-lg">
        FoodHub
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {user ? (
          <span className="text-sm">{user.email}</span>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}