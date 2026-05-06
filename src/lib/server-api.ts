export async function getMeals({
  category,
  search,
  cuisine,
  dietary,
  minPrice,
  maxPrice,
  page = 1,
}: {
  category?: string;
  search?: string;
  cuisine?: string;
  dietary?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}) {
  const params =
    new URLSearchParams();

  if (category) {
    params.append(
      "category",
      category
    );
  }

  if (search) {
    params.append(
      "search",
      search
    );
  }

  if (cuisine) {
    params.append(
      "cuisine",
      cuisine
    );
  }

  if (dietary) {
    params.append(
      "dietary",
      dietary
    );
  }

  if (minPrice) {
    params.append(
      "minPrice",
      minPrice
    );
  }

  if (maxPrice) {
    params.append(
      "maxPrice",
      maxPrice
    );
  }

  params.append(
    "page",
    String(page)
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/meals?${params.toString()}`,
    {
      cache: "no-store",
    }
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

export const getProviders =
  async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };