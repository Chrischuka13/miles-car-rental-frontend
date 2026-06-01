export interface VehicleFormState {
  brand: string;
  modelName: string;
  slug?: string;
  year: number;
  description: string;
  category: string;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: string;
  rating: number;
  tripsCount: number;
  pickupLocation: string;
  status: "available" | "booked" | "reserved" | "maintenance";

 
  tags: string[];
  features: string[];

  
  carSpecs: {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot: string; 
  };

 
  images: File[];
  imagePreviews: string[];
}

export const initialVehicleState: VehicleFormState = {
  brand: "",
  modelName: "",
  year: new Date().getFullYear(),
  description: "",
  category: "SUV",
  pricePerDay: 0,
  seats: 5,
  fuelType: "Petrol",
  transmission: "AUTO",
  rating: 0,
  tripsCount: 0,
  pickupLocation: "",
  status: "available",
  tags: [],
  features: [],
  carSpecs: {
    engine: "",
    topSpeed: "",
    mileage: "",
    boot: "",
  },
  images: [],
  imagePreviews: [],
};


export const VEHICLE_CATEGORIES = ["SUV", "Sedan", "Luxury", "Truck", "Family"];
export const FUEL_OPTIONS = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const TRANSMISSION_OPTIONS = ["AUTO", "MANUAL", "HYBRID"];
export const STATUS_OPTIONS = ["available", "booked", "reserved", "maintenance"];
export const VEHICLE_TAGS = ["CITY", "ECONOMY", "BEST SELLER", "EXECUTIVE", "PREMIUM"];