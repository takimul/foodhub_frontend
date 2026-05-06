import Link from "next/link";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[240px_1fr]">

        {/* SIDEBAR */}
        <aside className="border-r dark:border-zinc-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            Provider
          </h2>

          <nav className="flex flex-col gap-3">
            <Link href="/provider/dashboard">
              Dashboard
            </Link>

            <Link href="/provider/meals">
              Meals
            </Link>

            <Link href="/provider/add-meal">
              Add Meal
            </Link>

            <Link href="/provider/orders">
              Orders
            </Link>
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="p-6">
          {children}
        </section>
      </div>
    </main>
  );
}