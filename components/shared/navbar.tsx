// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useAuth } from "@/hooks/useAuth";
// import ThemeToggle from "../ui/theme-toggle";

// export default function Navbar() {
//   const { user } = useAuth();

//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800"
//     >
//       <Link href="/" className="font-bold text-lg">
//         FoodHub
//       </Link>

//       <div className="flex items-center gap-4">
//         <ThemeToggle />

//         {user ? (
//           <span className="text-sm">{user.email}</span>
//         ) : (
//           <>
//             <Link href="/login">Login</Link>
//             <Link href="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </motion.nav>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/theme-toggle";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include"
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
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl"
      >
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
    </nav>
  );
}