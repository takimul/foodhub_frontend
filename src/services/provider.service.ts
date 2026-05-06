export const ProviderService = {
   async getMeals() {
    const res = await fetch(
      "/api/v1/meals",
      {
        credentials: "include",
      }
    );

    return res.json();
  },

  async deleteMeal(id: string) {
    const res = await fetch(
      `/api/v1/meals/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    return res.json();
  },
   async getOrders() {
    const res = await fetch(
      "/api/v1/orders/provider",
      {
        credentials: "include",
      }
    );

    return res.json();
  },
};