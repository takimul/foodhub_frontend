export async function getMeals({
  category,
  search
}: {
  category?: string;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (category && category !== "all") params.append("category", category);
  if (search) params.append("search", search);

  const res = await fetch(
    `http://localhost:3000/api/v1/meals?${params.toString()}`,
    {
      cache: "no-store"
    }
  );

  if (!res.ok) throw new Error("Failed to fetch meals");

  return res.json();
}