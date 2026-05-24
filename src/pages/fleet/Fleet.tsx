import { useState } from "react";
import { Plus } from "lucide-react";
import { DummyCarsData, type DummyCar, type VehicleFormState } from "@/constants/Fleets";
import { AddVehicleModal } from "./AddVehicleModal"; 
import { VehicleDetailDashboard } from "./VehicleDetailDashboard"; 

export default function Fleet() {
  // State variable to track if the initial Add Form drawer is open
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Core tracking states to switch views without altering layout structures
  const [selectedCar, setSelectedCar] = useState<DummyCar | null>(null);
  const [newlyCreatedCar, setNewlyCreatedCar] = useState<VehicleFormState | null>(null);

  // VIEW CONTROLLER INTERCEPTORS
  if (selectedCar) {
    return (
      <VehicleDetailDashboard 
        carData={selectedCar} 
        isFromForm={false}
        onBack={() => setSelectedCar(null)} 
      />
    );
  }

  if (newlyCreatedCar) {
    return (
      <VehicleDetailDashboard 
        carData={newlyCreatedCar} 
        isFromForm={true}
        onBack={() => setNewlyCreatedCar(null)} 
      />
    );
  }

  return (
    <section className="p-6 pt-24 min-h-screen bg-[#FAFAFA]">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">Fleet</h1>
          <p className="text-sm text-gray-500 mt-1 wrap-break-word max-w-md">
            Track availability, utilization and revenue per vehicle.
          </p>
        </div>
        <div className="shrink-0">
          {/* Clicking this button sets our open state to true */}
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition whitespace-nowrap"
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
          <p className="text-2xl font-bold text-[#16A34A] mt-1">4</p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">On Trip</p>
          <p className="text-2xl font-bold text-[#F97316] mt-1">2</p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">Reserved</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">1</p>
        </div>
        <div className="flex flex-col flex-start uppercase text-sm rounded-lg p-3 bg-[#FFFFFF] shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold">Maintenance</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">1</p>
        </div>
      </div>

      {/* Existing car grid rendering system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
        {DummyCarsData.map((car: DummyCar) => (
          <div
            className="flex flex-col border border-[#E6E0E0] rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer"
            key={car._id}
            onClick={() => setSelectedCar(car)}
          >
            <div className="relative w-full h-[250px] bg-[#FEFEFE] flex items-center justify-center overflow-hidden">
              <img
                src={car.images && car.images.length > 0 ? car.images[0].url : "/placeholder-car.png"}
                alt={car.modelName}
                className="h-full w-full object-fill transition-transform duration-300 hover:scale-105 cursor-pointer"
              />

              <span
                className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium shadow-sm ${
                  car.status === "Available" ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#EAF2F8] text-[#1A5276]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${car.status === "Available" ? "bg-[#137333]" : "bg-[#1A5276]"}`} />
                {car.status}
              </span>
            </div>

            <div className="w-full px-5 py-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-xl text-gray-900 tracking-tight">{car.modelName}</h2>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-gray-900">₦{car.pricePerDay}</p>
                    <p className="text-[#A1A1A1] text-xs">/ day</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A1A1A1] font-medium mt-1">
                  <span>{car.plateNumber}</span>
                  <span>•</span>
                  <span className="uppercase">{car.category}</span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-4 text-[#727477]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <img src="/Users Group.svg" className="w-3.5 h-3.5" alt="seats" />
                      <p className="text-xs font-medium">{car.seats}</p>
                    </span>
                    <span className="flex items-center gap-1">
                      <img src="/Vector.svg" className="w-3.5 h-3.5" alt="fuel" />
                      <p className="text-xs font-medium">{car.fuelType}</p>
                    </span>
                    <span className="flex items-center gap-1">
                      <img src="/filter-horizontal.svg" className="w-3.5 h-3.5" alt="transmission" />
                      <p className="text-xs font-medium">{car.transmission}</p>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#A1A1A1]">
                    <img src="/vectorLocation.svg" alt="" />
                    <span className="truncate max-w-[100px]">{car.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F5F5F5]">
                <div className="flex items-center justify-between text-xs font-medium text-[#A1A1A1] mb-1.5">
                  <span>Utilization (30d)</span>
                  <span className="text-gray-900 font-semibold">{car.utilization}%</span>
                </div>
                <div className="w-full bg-[#E6E0E0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#F97316] h-full rounded-full transition-all duration-500"
                    style={{ width: `${car.utilization}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the initial form side drawer layer */}
      <AddVehicleModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={(completedFormState: VehicleFormState) => {
          setIsAddOpen(false);
          setNewlyCreatedCar(completedFormState);
        }}
      />
    </section>
  );
}