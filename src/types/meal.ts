export type Meal = {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  dietary: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
  };
  provider: {
    restaurant: string;
  };
};
