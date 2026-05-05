import { api } from "@/lib/api";

export default async function HomePage() {
  const data = await api<any>("/api/v1/meals");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Meals</h1>

      {data?.data?.map((meal: any) => (
        <div key={meal.id}>{meal.title}</div>
      ))}
    </div>
  );
}