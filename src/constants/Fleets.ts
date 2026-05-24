export interface DummyCar {
  _id: string;
  brand: string;
  modelName: string;
  category: string;
  plateNumber: string;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: string;
  location: string;
  utilization: number;
  status: "Available" | "On trip";
  images: { url: string }[];
  slug: string;
}

export const DummyCarsData: DummyCar[] = [
  {
    _id: "car_001",
    brand: "Lexus",
    modelName: "Lexus ES",
    category: "SUV",
    plateNumber: "LND 482 KJA",
    pricePerDay: 280000,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Auto",
    location: "Lekki Phase 1",
    utilization: 76,
    status: "Available",
    images: [{ url: "/LexusEs.png" }],
    slug: "lexus-es",
  },
  {
    _id: "car_002",
    brand: "Toyota",
    modelName: "Toyota Camry",
    category: "SUV",
    plateNumber: "LND 482 KJA",
    pricePerDay: 170000,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Auto",
    location: "Ikeja GRA",
    utilization: 82,
    status: "On trip",
    images: [{ url: "/camry 2.png" }],
    slug: "toyota-camry",
  },
  {
    _id: "car_003",
    brand: "Range Rover",
    modelName: "Range Rover",
    category: "SUV",
    plateNumber: "LND 482 KJA",
    pricePerDay: 280000,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Auto",
    location: "Lekki Phase 1",
    utilization: 82,
    status: "Available",
    images: [{ url: "/rangerover.png" }],
    slug: "range-rover",
  },
];

// add vehicle
export interface VehicleFormState {
  // Media
  images: string[]; // URLs or base64 data for the photos

  // Basics
  vehicleName: string;
  marketingTagline: string;
  plateNumber: string;
  year: string;
  category: string;
  badges: string[]; // selected array strings: e.g., ["SUV", "Best Seller"]

  // At a Glance
  seats: number;
  doors: number;
  fuel: string;
  transmission: string;
  airConditioning: boolean;

  // Specifications
  engine: string;
  topSpeed: string;
  mileage: string;
  bootCapacity: string;

  // Pricing
  dailyRate: string;
  weeklyDiscount: string;
  monthlyDiscount: string;
  withDriverSurcharge: string;
  refundableDeposit: string;

  // What's Included (Checkboxes)
  comprehensiveInsurance: boolean;
  roadsideAssistance247: boolean;
  freeCancellation: boolean;
  unlimitedMileageInCity: boolean;
  sanitizedBetweenTrips: boolean;
  fullTankOnPickUp: boolean;

  // Location & Status
  pickupLocation: string;
  status: "Available" | "On trip" | "Maintenance";
  isVisibleToCustomers: boolean;
}

// Default clean state for resetting or initializing the form modal
export const initialVehicleState: VehicleFormState = {
  images: [],
  vehicleName: "",
  marketingTagline: "",
  plateNumber: "",
  year: "",
  category: "SUV",
  badges: ["SUV", "Best Seller"],
  seats: 5,
  doors: 4,
  fuel: "Petrol",
  transmission: "Automatic",
  airConditioning: true,
  engine: "",
  topSpeed: "",
  mileage: "",
  bootCapacity: "",
  dailyRate: "",
  weeklyDiscount: "",
  monthlyDiscount: "",
  withDriverSurcharge: "",
  refundableDeposit: "",
  comprehensiveInsurance: true,
  roadsideAssistance247: true,
  freeCancellation: true,
  unlimitedMileageInCity: true,
  sanitizedBetweenTrips: true,
  fullTankOnPickUp: true,
  pickupLocation: "",
  status: "Available",
  isVisibleToCustomers: true,
};

// Selection options extracted directly from your dropdown fields
export const VEHICLE_CATEGORIES = [
  "SUV",
  "Sedan",
  "Crossover",
  "Luxury",
  "Coupe",
];
export const FUEL_OPTIONS = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const TRANSMISSION_OPTIONS = ["Automatic", "Manual"];
export const STATUS_OPTIONS = ["Available", "On trip", "Maintenance"];
export const AVAILABLE_BADGES = [
  "SUV",
  "Economy",
  "Best Seller",
  "Executive",
  "Luxury",
  "Logistics",
];
