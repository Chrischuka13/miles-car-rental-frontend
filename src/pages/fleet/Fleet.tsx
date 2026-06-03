import { useState } from "react";
import { Plus } from "lucide-react";
import { type VehicleFormState } from "@/constants/Fleets";
import { AddVehicleModal } from "./AddVehicleModal";
import { VehicleDetailDashboard } from "./VehicleDetailDashboard";
import { useQuery } from "@tanstack/react-query";
import { getAdminFleetCars } from "@/api/adminFleet";
import LazyLoadImageRC from "@/components/ui/lazyLoadImage";
import Pagination from "@/features/Pagination";
import Loader from "@/components/ui/Loader";
import { useAddVehicle } from "@/hooks/useAddVehicle";

interface AdminCar {
  _id: string;
  slug: string;
  brand: string;
  description: string;
  category: "LUXURY" | "SEDAN" | "SUV" | "TRUCK";
  modelName: string;
  year: number;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: "Auto" | "Manual" | "Hybrid";
  images: {
    url: string;
    public_id: string;
  }[];
  carSpecs: {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot?: string;
  };
  status: "available" | "booked" | "maintenance" | "reserved";
  rating: number;
  tripsCount: number;
  features: string[];
  tags: string[];
  plateNumber?: string;
  location?: string;
}

interface AdminFleetResponse {
  success: boolean;
  message: string;
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageSize?: number;
  };
  cars: AdminCar[];
  stats: {
    available: number;
    booked: number;
    maintenance: number;
    reserved: number;
  };
}

export default function Fleet() {
  // State variable to track if the initial Add Form drawer is open
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Core state variables for view control and data passing between the main fleet page and the nested detail dashboard
  const [selectedCar, setSelectedCar] = useState<AdminCar | null>(null);
  const [newlyCreatedCar, setNewlyCreatedCar] =
    useState<VehicleFormState | null>(null);

  //  Destructured 'isPending' from your custom backend upload hook
  const { mutate: addVehicle, isPending } = useAddVehicle(() => {
    setIsAddOpen(false); // close the add vehicle modal on successful addition
  });

  const { data, isLoading } = useQuery<AdminFleetResponse>({
    queryKey: ["adminFleetCars", page],
    queryFn: () => getAdminFleetCars(page),
  });

  const fleetCars = data?.cars || [];

  const stats: AdminFleetResponse["stats"] = data?.stats || {
    available: 0,
    booked: 0,
    maintenance: 0,
    reserved: 0,
  };

  if (isLoading) {
    return <Loader />;
  }

  // VIEW CONTROLLER INTERCEPTORS
  if (selectedCar) {
    return (
      <VehicleDetailDashboard
        carData={selectedCar as unknown as VehicleFormState}
        onBack={() => setSelectedCar(null)}
      />
    );
  }

  if (newlyCreatedCar) {
    return (
      <VehicleDetailDashboard
        carData={newlyCreatedCar}
        onBack={() => setNewlyCreatedCar(null)}
      />
    );
  }

  return (
    <section className="p-6 md:pt-24 min-h-screen bg-[#FAFAFA]">
      <div className="md:flex justify-between items-center gap-4 w-full">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">Fleet</h1>
          <p className="text-lg text-gray-500 mt-1 wrap-break-word max-w-md mb-4 ">
            Track availability, utilization and revenue per vehicle.
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-DeepOrange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition whitespace-nowrap"
          >
            <Plus size={16} />
            Add vehicle
          </button>
        </div>
      </div>

      {/* Available stats grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">Available</p>
          <p className="text-2xl font-bold text-[#16A34A] mt-1">
            {stats.available || 0}
          </p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">On Trip</p>
          <p className="text-2xl font-bold text-[#F97316] mt-1">
            {stats.booked || 0}
          </p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">Reserved</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.reserved || 0}
          </p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">Maintenance</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.maintenance || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
        {fleetCars.map((car: AdminCar) => (
          <div
            className="flex flex-col border border-[#E6E0E0] rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer w-full h-full transition-all duration-300 hover:shadow-md"
            key={car._id}
            onClick={() => setSelectedCar(car)}
          >
            <div className="relative w-full h-55 sm:h-60 md:h-65 lg:h-62.5 xl:h-70 bg-[#FEFEFE] overflow-hidden">
              <LazyLoadImageRC
                src={
                  car.images && car.images.length > 0
                    ? car.images[0].url
                    : "/placeholder-car.png"
                }
                alt={car.modelName}
                width="100%"
                height="100%"
                className="w-full h-full object-fill transition-transform duration-300 hover:scale-105"
              />

              <span
                className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium shadow-sm ${
                  car.status === "available" || car.status === "booked"
                    ? "bg-[#E6F4EA] text-[#137333]"
                    : "bg-[#EAF2F8] text-[#1A5276]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    car.status === "available" || car.status === "booked"
                      ? "bg-[#137333]"
                      : "bg-[#1A5276]"
                  }`}
                />
                {car.status}
              </span>
            </div>

            <div className="w-full px-4 sm:px-5 py-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-start justify-between gap-10 w-full">
                  <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 tracking-tight truncate max-w-[65%]">
                    {car.brand} {car.modelName}
                  </h2>

                  <div className="text-right shrink-0">
                    <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">
                      ₦{car.pricePerDay}
                    </p>
                    <p className="text-[#A1A1A1] text-xs">/ day</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A1A1A1] font-medium mt-1 flex-wrap">
                  <span className="truncate max-w-[90px] sm:max-w-[120px]">
                    {car._id}
                  </span>
                  <span>•</span>
                  <span className="uppercase truncate">{car.category}</span>
                </div>

                <div className="flex border-t flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mt-4 pt-2 border-gray-50 text-[#727477]">
                  <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
                    <span className="flex items-center gap-1 shrink-0">
                      <img
                        src="/Users Group.svg"
                        className="w-3.5 h-3.5 object-contain"
                        alt="seats"
                      />
                      <p className="text-xs font-medium">{car.seats}</p>
                    </span>

                    <span className="flex items-center gap-1 min-w-0">
                      <img
                        src="/Vector.svg"
                        className="w-3.5 h-3.5 object-contain shrink-0"
                        alt="fuel"
                      />
                      <p className="text-xs font-medium truncate max-w-[70px] sm:max-w-[none]">
                        {car.fuelType}
                      </p>
                    </span>

                    <span className="flex items-center gap-1 min-w-0">
                      <img
                        src="/filter-horizontal.svg"
                        className="w-3.5 h-3.5 object-contain shrink-0"
                        alt="transmission"
                      />
                      <p className="text-xs font-medium truncate max-w-[70px] sm:max-w-[none]">
                        {car.transmission}
                      </p>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#A1A1A1] shrink-0 self-end xs:self-auto">
                    <span className="flex gap-1 whitespace-nowrap">
                      <p className="text-xs font-medium text-[#727477]">
                        Trips:
                      </p>
                      {car.tripsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination pagination={data?.pagination} setPage={setPage} />

      {/* Render the add vehicle modal */}
      <AddVehicleModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={(completedFormState: VehicleFormState) => {
          addVehicle(completedFormState);
        }}
        isPending={isPending}
      />
    </section>
  );
}
