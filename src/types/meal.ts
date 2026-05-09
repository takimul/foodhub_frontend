// export type Meal = {
//   id: string;
//   title: string;
//   description: string;
//   cuisine: string;
//   dietary: string;
//   price: number;
//   imageUrl?: string;
//   isAvailable: boolean;
//   category: {
//     id: string;
//     name: string;
//   };
//   provider: {
//     restaurant: string;
//   };
// };

export type Meal = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  cuisine?: string;
  dietary?: string;

  averageRating?: number;
  reviewCount?: number;

  provider: {
    restaurant: string;
  };

  reviews?: {
    id: string;
    rating: number;
    comment: string;

    customer: {
      id: string;
      name: string;
      image?: string;
    };
  }[];
};