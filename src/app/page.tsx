import MealsSection from "@/src/components/home/meals-section";
import Hero from "@/src/components/home/hero";
import { getCategories, getMeals } from "@/src/lib/server-api";


export default async function HomePage({ searchParams }: any) {
  const params = await searchParams;

const [mealsRes, catRes] = await Promise.all([
  getMeals({
    category: params.category,
    search: params.search,
    page: Number(params.page) || 1,
  }),
  getCategories(),
]);
console.log("category", catRes);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Hero />
      <MealsSection initialData={mealsRes.data}
    categories={catRes.data} />
    </main>
  );
}