import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProviderProfilePage({
  params,
}: any) {
  const { id } = await params;

  const providerRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`,
    {
      cache: "no-store",
    }
  );

  const providerData =
    await providerRes.json();

  if (!providerData.data) {
    return notFound();
  }

  const provider =
    providerData.data;

  const mealsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/meals`,
    {
      cache: "no-store",
    }
  );

  const mealsData =
    await mealsRes.json();

  const meals =
    mealsData.data.meals.filter(
      (meal: any) =>
        meal.provider
          ?.restaurant ===
        provider.restaurant
    );

  // STATS
  const totalReviews =
    meals.reduce(
      (
        acc: number,
        meal: any
      ) =>
        acc +
        (meal.reviewCount ||
          0),
      0
    );

  const totalRatings =
    meals.reduce(
      (
        acc: number,
        meal: any
      ) =>
        acc +
        ((meal.averageRating ||
          0) *
          (meal.reviewCount ||
            0)),
      0
    );

  const averageRating =
    totalReviews > 0
      ? (
          totalRatings /
          totalReviews
        ).toFixed(1)
      : "New";

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black text-black dark:text-white">
      {/* HERO */}
      <section className="relative">
        {/* COVER IMAGE */}
        <div className="relative h-[420px] overflow-hidden">
          <img
            src={
              provider.logoUrl ||
              "https://placehold.co/1600x600"
            }
            alt={
              provider.restaurant
            }
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative -mt-28 z-10">
            <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl shadow-2xl">
              <div className="p-8 lg:p-10">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
                  {/* LEFT */}
                  <div className="flex items-start gap-6">
                    {/* LOGO */}
                    <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-lg bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                      <img
                        src={
                          provider.logoUrl ||
                          "https://placehold.co/300"
                        }
                        alt={
                          provider.restaurant
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                          {
                            provider.restaurant
                          }
                        </h1>

                        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                          {
                            provider.description
                          }
                        </p>
                      </div>

                      {/* META */}
                      <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm font-medium">
                          📍{" "}
                          {
                            provider.address
                          }
                        </div>

                        <div className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm font-medium">
                          📞{" "}
                          {
                            provider.phone
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="grid grid-cols-2 gap-4 min-w-[320px]">
                    {/* RATING */}
                    <div className="rounded-3xl bg-orange-500 text-white p-5">
                      <p className="text-orange-100 text-sm">
                        Rating
                      </p>

                      <div className="flex items-end gap-2 mt-3">
                        <h2 className="text-4xl font-bold">
                          {
                            averageRating
                          }
                        </h2>

                        <span className="mb-1">
                          ★
                        </span>
                      </div>

                      <p className="text-sm text-orange-100 mt-2">
                        {
                          totalReviews
                        }{" "}
                        reviews
                      </p>
                    </div>

                    {/* MEALS */}
                    <div className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
                      <p className="text-sm text-gray-500">
                        Total Meals
                      </p>

                      <h2 className="text-4xl font-bold mt-3">
                        {
                          meals.length
                        }
                      </h2>

                      <p className="text-sm text-gray-500 mt-2">
                        Available menu
                        items
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              Popular Menu
            </h2>

            <p className="text-gray-500 mt-3">
              Discover delicious
              meals from this
              restaurant
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl border dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <p className="text-sm text-gray-500">
                Meals
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {
                  meals.length
                }
              </h3>
            </div>

            <div className="px-5 py-3 rounded-2xl border dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <p className="text-sm text-gray-500">
                Reviews
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {
                  totalReviews
                }
              </h3>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {meals.map((meal: any) => (
            <Link
              href={`/meals/${meal.id}`}
              key={meal.id}
              className="group rounded-[30px] overflow-hidden border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    meal.imageUrl ||
                    "https://placehold.co/600x400"
                  }
                  alt={meal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* PRICE */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xl font-bold shadow-lg">
                  ৳{meal.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {meal.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {
                        meal.description
                      }
                    </p>
                  </div>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  {meal.cuisine && (
                    <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium">
                      {
                        meal.cuisine
                      }
                    </span>
                  )}

                  {meal.dietary && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium">
                      {
                        meal.dietary
                      }
                    </span>
                  )}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-2">
                  {/* REVIEWS */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">
                        ★
                      </span>

                      <span className="font-semibold">
                        {meal.averageRating
                          ? meal.averageRating.toFixed(
                              1
                            )
                          : "New"}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      (
                      {meal.reviewCount ||
                        0}
                      )
                    </span>
                  </div>

                  {/* REVIEWERS */}
                  {meal.reviewCount >
                    0 && (
                    <div className="flex -space-x-3">
                      {meal.reviews
                        ?.slice(0, 3)
                        .map(
                          (
                            review: any
                          ) => (
                            <img
                              key={
                                review.id
                              }
                              src={
                                review
                                  .customer
                                  ?.image ||
                                `https://ui-avatars.com/api/?name=${review.customer?.name}`
                              }
                              alt={
                                review
                                  .customer
                                  ?.name
                              }
                              className="w-9 h-9 rounded-full border-2 border-white dark:border-zinc-950 object-cover"
                            />
                          )
                        )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {meals.length === 0 && (
          <div className="rounded-[32px] border border-dashed dark:border-zinc-800 p-16 text-center bg-white dark:bg-zinc-950">
            <div className="text-6xl">
              🍽️
            </div>

            <h2 className="text-3xl font-bold mt-6">
              No meals available
            </h2>

            <p className="text-gray-500 mt-3">
              This provider has not
              added meals yet
            </p>
          </div>
        )}
      </section>
    </main>
  );
}