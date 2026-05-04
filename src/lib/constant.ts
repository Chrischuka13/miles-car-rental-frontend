export type CarProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string[];
  transmission: "Auto" | "Hybrid" | "Manual";
  carType: "Sedan" | "Luxury" | "Suv" | "Truck";
  seats: number;
  carValue:
    | "Executive"
    | "City"
    | "Premium"
    | "Logistics"
    | "Family"
    | "Electric";
  consumption: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  year: number;
  address: string;
};

export const TrendingCars: CarProduct[] = [
  {
    id: 1,
    name: "Lexus ES",
    brand: "Lexus",
    price: 49,
    image: [
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777741114/LexusBg_qkmtmb.png",
    ],
    transmission: "Auto",
    carType: "Luxury",
    seats: 5,
    carValue: "Executive",
    consumption: "Hybrid",
    year: 2023,
    address: "Lekki, Lagos",
  },
  {
    id: 2,
    name: "Toyota Camry",
    brand: "Toyota",
    price: 50,
    image:[
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777740861/camry_2_tihbg1.png",],
    transmission: "Auto",
    carType: "Sedan",
    seats: 5,
    carValue: "City",
    consumption: "Petrol",
    year: 2023,
    address: "Lekki, Lagos",
  },
  {
    id: 3,
    name: "Range Rover Vogue",
    brand: "Range",
    price: 89,
    image:[
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777741351/rangerover_lkqnmv.png",],
    transmission: "Auto",
    carType: "Luxury",
    seats: 5,
    carValue: "Premium",
    consumption: "Diesel",
    year: 2023,
    address: "Lekki, Lagos",
  },
  {
    id: 4,
    name: "Isuzu NPR",
    brand: "Isuzu",
    price: 169,
    image:[
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777741092/truck_vmecsb.png",],
    transmission: "Manual",
    carType: "Truck",
    seats: 3,
    carValue: "Logistics",
    consumption: "Diesel",
    year: 2023,
    address: "Lekki, Lagos",
  },
  {
    id: 5,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    price: 69,
    image:[
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777743158/hyundai_dhk1zs.png",],
    transmission: "Auto",
    carType: "Suv",
    seats: 5,
    carValue: "Family",
    consumption: "Petrol",
    year: 2023,
    address: "Lekki, Lagos",
  },
  {
    id: 6,
    name: "Tesla Cybertruck",
    brand: "Tesla",
    price: 249,
    image:[
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1777741078/cybertruck_pvkifc.png",],
    transmission: "Auto",
    carType: "Truck",
    seats: 5,
    carValue: "Electric",
    consumption: "Electric",
    year: 2023,
    address: "Lekki, Lagos",
  },
];

export type Included = {
  //   image: string;
  whatsIncluded: string;
};

export const WhatsIncluded: Included[] = [
  {
    // image:
    whatsIncluded: "Comprehensive insurance",
  },
  {
    // image:
    whatsIncluded: "24/7 road support",
  },
  {
    // image:
    whatsIncluded: "Free Cancellation",
  },
  {
    // image:
    whatsIncluded: "Unlimited mileage in-city",
  },
  {
    // image:
    whatsIncluded: "Sanitize between trips",
  },
  {
    // image:
    whatsIncluded: "Full tank at pickup",
  },
];
