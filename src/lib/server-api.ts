export async function getMeals({
  category,
  search,
  page = 1
}: {
  category?: string;
  search?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  params.append("page", String(page));

  const res = await fetch(
    `http://localhost:3000/api/v1/meals?${params.toString()}`,
    { cache: "no-store" }
  );

  return res.json();
}
 
export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
    {
      cache: "no-store"
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}
 export async function getMeal(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/meals/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }

  return res.json();
} 