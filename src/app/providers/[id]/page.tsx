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

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* COVER */}
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        <div className="border rounded-3xl overflow-hidden dark:border-zinc-800">

          <img
            src={
              provider.logoUrl ||
              "https://placehold.co/1200x400"
            }
            alt={
              provider.restaurant
            }
            className="w-full h-80 object-cover"
          />

          <div className="p-8 space-y-4">

            <h1 className="text-5xl font-bold">
              {
                provider.restaurant
              }
            </h1>

            <p className="text-gray-500 max-w-3xl">
              {
                provider.description
              }
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500">

              <span>
                📍{" "}
                {
                  provider.address
                }
              </span>

              <span>
                📞{" "}
                {provider.phone}
              </span>

            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-8">

          <div>
            <h2 className="text-4xl font-bold">
              Menu
            </h2>

            <p className="text-gray-500 mt-2">
              Meals offered by this
              provider
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {meals.map((meal: any) => (
              <div
                key={meal.id}
                className="border rounded-3xl overflow-hidden dark:border-zinc-800"
              >
                <img
                  src={
                    meal.imageUrl ||
                    "https://placehold.co/600x400"
                  }
                  alt={meal.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-3">

                  <div className="flex justify-between">
                    <h3 className="font-bold text-xl">
                      {meal.title}
                    </h3>

                    <span className="font-bold">
                      ৳{meal.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {
                      meal.description
                    }
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}