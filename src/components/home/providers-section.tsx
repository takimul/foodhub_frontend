import Link from "next/link";

export default function ProvidersSection({
  providers,
}: {
  providers: any[];
}) {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-10">

        <div>
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Featured Providers
          </h2>

          <p className="text-gray-500 mt-2">
            Discover top restaurants
            and homemade food
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {providers.map(
          (provider: any) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className="group border rounded-3xl overflow-hidden dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:-translate-y-1 transition"
            >
              <img
                src={
                  provider.logoUrl ||
                  "https://placehold.co/600x400"
                }
                alt={
                  provider.restaurant
                }
                className="w-full h-56 object-cover"
              />

              <div className="p-6 space-y-3">

                <div>
                  <h3 className="text-2xl font-bold group-hover:opacity-80">
                    {
                      provider.restaurant
                    }
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {
                      provider.address
                    }
                  </p>
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {
                    provider.description
                  }
                </p>

                <div className="pt-2">
                  <span className="text-sm font-medium">
                    View Menu →
                  </span>
                </div>

              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}