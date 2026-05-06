import Hero from "@/src/components/home/hero";

import MealsSection from "@/src/components/home/meals-section";

import ProvidersSection from "@/src/components/home/providers-section";

import WhyChooseUs from "@/src/components/home/why-choose-us";

import {
  getCategories,
  getMeals,
  getProviders,
} from "@/src/lib/server-api";

export default async function HomePage({
  searchParams,
}: any) {
  const params = await searchParams;

  const [
    mealsRes,
    catRes,
    providersRes,
  ] = await Promise.all([
    getMeals({
      category: params.category,
      search: params.search,
      page:
        Number(params.page) ||
        1,
    }),

    getCategories(),

    getProviders(),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-black">

      {/* HERO */}
      <Hero />

      {/* MEALS */}
      <MealsSection
        initialData={mealsRes.data}
        categories={catRes.data}
      />

      {/* PROVIDERS */}
      <ProvidersSection
        providers={
          providersRes.data
        }
      />

      {/* EXTRA SECTION */}
      <WhyChooseUs/>

    </main>
  );
}