import { useState } from "react";
import { type DummyCar, type VehicleFormState } from "@/constants/Fleets";

interface VehicleDetailDashboardProps {
  carData: DummyCar | VehicleFormState;
  isFromForm: boolean;
  onBack: () => void;
}

export function VehicleDetailDashboard({
  carData,
  isFromForm,
  onBack,
}: VehicleDetailDashboardProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  // Dynamically resolve properties based on whether the data came from a dummy list or the live form state
  const modelName = isFromForm
    ? (carData as VehicleFormState).vehicleName || "Lexus RX 350"
    : (carData as DummyCar).modelName;

  const price = isFromForm
    ? Number((carData as VehicleFormState).dailyRate || 120000)
    : (carData as DummyCar).pricePerDay;

  const displayImage = isFromForm
    ? (carData as VehicleFormState).images &&
      (carData as VehicleFormState).images.length > 0
      ? (carData as VehicleFormState).images[0]
      : "/placeholder-car.png"
    : (carData as DummyCar).images && (carData as DummyCar).images.length > 0
      ? (carData as DummyCar).images[0].url
      : "/placeholder-car.png";

  const category = isFromForm
    ? (carData as VehicleFormState).category
    : (carData as DummyCar).category;
  const plateNumber = isFromForm
    ? (carData as VehicleFormState).plateNumber
    : (carData as DummyCar).plateNumber;
  const seats = isFromForm
    ? (carData as VehicleFormState).seats
    : (carData as DummyCar).seats;
  const transmission = isFromForm
    ? (carData as VehicleFormState).transmission
    : (carData as DummyCar).transmission;
  const fuelType = isFromForm
    ? (carData as VehicleFormState).fuel
    : (carData as DummyCar).fuelType;
  const location = isFromForm
    ? (carData as VehicleFormState).pickupLocation || "Lekki Phase 1"
    : (carData as DummyCar).location;
  const marketingTagline = isFromForm
    ? (carData as VehicleFormState).marketingTagline
    : "Reliable, fuel-efficient and perfect for daily Lagos trips.";
  const year = isFromForm
    ? (carData as VehicleFormState).year || "2026"
    : "2026";

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 px-8 pb-12">
      {/* Top Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <span className="text-lg">‹</span> Fleets
      </button>

      {/* Profile Header Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center h-80 shadow-sm">
          <img
            src={displayImage}
            alt={modelName}
            className="h-full object-contain"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded">
              City
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded">
              Best seller
            </span>
          </div>

          <p className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
            {category} · {year}
          </p>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {modelName}
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#A1A1A1] font-medium mt-1">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-semibold">
              {plateNumber}
            </span>
            <span>•</span>
            <span className="uppercase tracking-wider text-[10px]">
              Managed Live
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-gray-900 text-sm">★★★★★</span>
            <span>4.9</span>
            <span className="text-gray-300">·</span>
            <span>0 trips</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            {marketingTagline || "No description provided yet."}
          </p>

          <div className="pt-2 border-t border-gray-50 space-y-3">
            <div>
              <span className="text-2xl font-black text-gray-900">
                ₦{price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-medium ml-1">
                /day, all-inclusive
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>📍</span>
              <span>{location}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 bg-[#F97316] text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition shadow-sm">
              View bookings
            </button>
            <button className="flex-1 py-3 border border-gray-200 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-50 transition flex items-center justify-center gap-1">
              ✏️ Edit listing
            </button>
          </div>
        </div>
      </div>

      {/* Live Metric Statistics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm uppercase">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            Trips (30d)
          </p>
          <p className="text-xl font-bold text-gray-900 mt-1">0</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm uppercase">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            Revenue (30d)
          </p>
          <p className="text-xl font-bold text-gray-900 mt-1">₦0</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm uppercase">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            Utilization
          </p>
          <p className="text-xl font-bold text-orange-500 mt-1">0%</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm uppercase">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            Next Service
          </p>
          <p className="text-xl font-bold text-gray-300 mt-1">—</p>
        </div>
      </div>

      {/* Workspace Tabs Header Bar Menu */}
      <div className="border-b border-gray-100 flex gap-6 text-sm mb-6 bg-white px-4 py-2 rounded-xl shadow-sm">
        {["Overview", "Bookings", "Maintenance", "Photos", "Pricing"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs font-bold transition relative ${
                activeTab === tab
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ),
        )}
      </div>

      {/* Overview Details Section Block */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              🚖 At a glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Seat
                </span>
                <span className="text-sm font-bold text-gray-800 mt-1">
                  {seats}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Trans
                </span>
                <span className="text-sm font-bold text-gray-800 mt-1 uppercase">
                  {transmission}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Fuel
                </span>
                <span className="text-sm font-bold text-gray-800 mt-1 uppercase">
                  {fuelType}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Year
                </span>
                <span className="text-sm font-bold text-gray-800 mt-1">
                  {year}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              ⏱️ Specifications
            </h2>
            <div className="bg-[#0F172A] text-white rounded-2xl p-5 shadow-sm grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400">Engine</span>
                <span className="text-xs font-bold text-white">
                  {isFromForm
                    ? (carData as VehicleFormState).engine || "3.5L V6"
                    : "3.5L V6"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400">Top Speed</span>
                <span className="text-xs font-bold text-white">
                  {isFromForm
                    ? (carData as VehicleFormState).topSpeed || "230 km/h"
                    : "230 km/h"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400">Mileage</span>
                <span className="text-xs font-bold text-white">
                  {isFromForm
                    ? (carData as VehicleFormState).mileage || "22 km/L"
                    : "22 km/L"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400">Boot</span>
                <span className="text-xs font-bold text-white">
                  {isFromForm
                    ? (carData as VehicleFormState).bootCapacity || "454 L"
                    : "454 L"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900">
                What's included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                {[
                  "Comprehensive insurance",
                  "24/7 road safety",
                  "Free cancellation",
                  "Unlimited mileage in-city",
                  "Sanitize between trips",
                  "Full tank at pick",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-xl border border-gray-100"
                  >
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                      ✓
                    </span>
                    <span className="capitalize text-gray-600 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900">Performance</h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span>Bookings (lifetime)</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span>Current active</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span>Avg revenue / trip</span>
                  <span className="font-bold text-gray-900">₦0</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Utilization (30d)</span>
                  <span className="font-bold text-gray-900">0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
