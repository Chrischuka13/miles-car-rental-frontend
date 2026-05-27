export interface VehicleFormState {
  brand: string;
  modelName: string;
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

  // Array parameters
  tags: string[];
  features: string[];

  // Nested specifications object block
  carSpecs: {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot: string; // Changed from bootCapacity to match backend
  };

  // Binary files for the form data upload + local URLs for the UI preview cards
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

// Standard selection sync groupings for dropdown inputs
export const VEHICLE_CATEGORIES = ["SUV", "Sedan", "Luxury", "Truck", "Family"];
export const FUEL_OPTIONS = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const TRANSMISSION_OPTIONS = ["AUTO", "MANUAL"];
export const STATUS_OPTIONS = ["available", "booked", "reserved", "maintenance"];
export const VEHICLE_TAGS = ["CITY", "ECONOMY", "BEST SELLER", "EXECUTIVE", "LUXURY", "PREMIUM"];