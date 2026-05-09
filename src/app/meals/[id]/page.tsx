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
          {meal.imageUrl ? (
            <img
              src={meal.imageUrl}
              alt={meal.title}
              className="w-full h-full object-cover"
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

            <h1 className="text-4xl font-bold">{meal.title}</h1>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {meal.description}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">★</span>

                <span className="font-semibold text-lg">
                  {meal.averageRating ? meal.averageRating.toFixed(1) : "New"}
                </span>
              </div>

              <span className="text-gray-500 text-sm">
                ({meal.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          {/* PROVIDER */}
          <div className="border-y border-gray-200 dark:border-zinc-800 py-4">
            <p className="text-sm text-gray-500">Restaurant</p>

            <h3 className="text-lg font-semibold">
              {meal.provider?.restaurant}
            </h3>
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Price</p>

              <h2 className="text-3xl font-bold">৳{meal.price}</h2>
            </div>

            <AddToCartButton meal={meal} />
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            <div className="text-sm text-gray-500">
              {meal.reviewCount || 0} reviews
            </div>
          </div>

          {/* EMPTY */}
          {meal.reviews?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700 p-10 text-center text-gray-500">
              No reviews yet
            </div>
          )}

          {/* LIST */}
          <div className="space-y-4">
            {meal.reviews?.map((review: any) => (
              <div
                key={review.id}
                className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  {/* AVATAR */}
                  <img
                    src={
                      review.customer.image ||
                      `https://ui-avatars.com/api/?name=${review.customer.name}`
                    }
                    alt={review.customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    {/* TOP */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">
                          {review.customer.name}
                        </h4>

                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({
                            length: review.rating,
                          }).map((_, i) => (
                            <span key={i} className="text-yellow-500 text-sm">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* COMMENT */}
                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
