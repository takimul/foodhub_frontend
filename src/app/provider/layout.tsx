// "use client";

// import Link from "next/link";
// import { useAuth } from "@/src/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProviderLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading } = useAuth();

//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (
//         !user ||
//         (user.role !== "PROVIDER" &&
//           user.role !== "ADMIN")
//       ) {
//         router.push("/");
//       }
//     }
//   }, [user, loading, router]);

//   if (loading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (
//     user.role !== "PROVIDER" &&
//     user.role !== "ADMIN"
//   ) {
//     return null;
//   }

//   return (
//     <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-[240px_1fr]">

//         {/* SIDEBAR */}
//         <aside className="border-r dark:border-zinc-800 p-6 space-y-4">
//           <h2 className="text-2xl font-bold">
//             Provider
//           </h2>

//           <nav className="flex flex-col gap-3">
//             <Link href="/provider/dashboard">
//               Dashboard
//             </Link>

//             <Link href="/provider/meals">
//               Meals
//             </Link>

//             <Link href="/provider/add-meal">
//               Add Meal
//             </Link>

//             <Link href="/provider/orders">
//               Orders
//             </Link>
//             <Link href="/provider/profile">
//               Profile
//             </Link>
//           </nav>
//         </aside>

//         {/* CONTENT */}
//         <section className="p-6">
//           {children}
//         </section>
//       </div>
//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } =
    useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[260px_1fr] gap-6 px-4 md:px-6 py-6">
        {/* SIDEBAR */}
        <aside className="rounded-[32px] border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 h-fit sticky top-24 shadow-sm">
          {/* PROFILE */}
          <div className="flex items-center gap-4 pb-6 border-b dark:border-zinc-800">
            <div className="w-16 h-16 rounded-3xl overflow-hidden bg-orange-500 flex items-center justify-center text-white text-2xl">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                "🍔"
              )}
            </div>

            <div>
              <h2 className="font-bold text-lg">
                {user?.name ||
                  "Provider"}
              </h2>

              <p className="text-sm text-gray-500">
                Provider Panel
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-2 mt-6">
            <Link
              href="/provider/dashboard"
              className="h-12 px-4 rounded-2xl flex items-center hover:bg-orange-50 dark:hover:bg-zinc-900 transition font-medium"
            >
              Dashboard
            </Link>

            <Link
              href="/provider/meals"
              className="h-12 px-4 rounded-2xl flex items-center hover:bg-orange-50 dark:hover:bg-zinc-900 transition font-medium"
            >
              Meals
            </Link>

            <Link
              href="/provider/add-meal"
              className="h-12 px-4 rounded-2xl flex items-center hover:bg-orange-50 dark:hover:bg-zinc-900 transition font-medium"
            >
              Add Meal
            </Link>

            <Link
              href="/provider/orders"
              className="h-12 px-4 rounded-2xl flex items-center hover:bg-orange-50 dark:hover:bg-zinc-900 transition font-medium"
            >
              Orders
            </Link>

            <Link
              href="/provider/profile"
              className="h-12 px-4 rounded-2xl flex items-center hover:bg-orange-50 dark:hover:bg-zinc-900 transition font-medium"
            >
              Profile
            </Link>
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="min-w-0">
          {children}
        </section>
      </div>
    </main>
  );
}