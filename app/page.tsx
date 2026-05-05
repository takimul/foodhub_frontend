import MealsSection from "@/components/home/meals-section";
import Hero from "@/components/home/hero";
import { getMeals } from "@/lib/server-api";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams; 

  const data = await getMeals({
    category: params.category,
    search: params.search
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Hero />
      <MealsSection meals={data.data || []} />
    </main>
  );
}