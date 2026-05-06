import { getMeal } from "@/src/lib/server-api";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/src/components/cart/add-to-cart-button";

export default async function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getMeal(id);

  const meal = res.data;

  if (!meal) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10 items-start">
        
        {/* IMAGE */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900">
          {meal.image ? (
            <Image
              src={meal.image}
              alt={meal.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-sm inline-block">
              {meal.category?.name}
            </span>

            <h1 className="text-4xl font-bold">
              {meal.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {meal.description}
            </p>
          </div>

          {/* PROVIDER */}
          <div className="border-y border-gray-200 dark:border-zinc-800 py-4">
            <p className="text-sm text-gray-500">
              Restaurant
            </p>

            <h3 className="text-lg font-semibold">
              {meal.provider?.restaurant}
            </h3>
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Price
              </p>

              <h2 className="text-3xl font-bold">
                ৳{meal.price}
              </h2>
            </div>

            <AddToCartButton meal={meal} />
          </div>
        </div>
      </section>
    </main>
  );
}