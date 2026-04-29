import type { Car } from "../types/car";

export const trendingCars: Car[] = [
  {
    id: 1,
    tag: "CITY",
    type: "SEDAN",
    name: "Toyota Camry",
    price: 49,
    fuel: "Petrol",
    transmission: "Auto",
    seats: 5,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200",
  },
  {
    id: 2,
    tag: "EXECUTIVE",
    type: "LUXURY",
    name: "Lexus ES",
    price: 59,
    fuel: "Hybrid",
    transmission: "Auto",
    seats: 5,
    image: "https://images.unsplash.com/photo-1617814076668-8df3a6d1f58d?q=80&w=1200",
  },
  {
    id: 3,
    tag: "LOGISTICS",
    type: "TRUCK",
    name: "Isuzu NPR",
    price: 169,
    fuel: "Diesel",
    transmission: "Manual",
    seats: 3,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200",
  },
];