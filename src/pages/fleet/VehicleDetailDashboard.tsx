import { useState } from "react";
import type { VehicleFormState } from "@/constants/Fleets";

import LazyLoadImageRC from "@/components/ui/lazyLoadImage";

interface VehicleDetailDashboardProps {
  carData: VehicleFormState;
  onBack: () => void;
}

interface LegacyMockImage {
  url: string;
}

export function VehicleDetailDashboard({
  carData,
  onBack,
}: VehicleDetailDashboardProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<VehicleFormState | null>(null);

  // 1. Dynamic Vehicle Name Fallback
  const currentCar: VehicleFormState = carData;
  const dynamicVehicleName =
    currentCar?.brand || currentCar?.modelName
      ? `${currentCar.brand || ""} ${currentCar.modelName || ""}`.trim()
      : "Unnamed Vehicle";

  // 2. Comprehensive Multi-Format Image Detection
  const displayImage =
    carData.images &&
    carData.images.length > 0 &&
    typeof carData.images[0] === "string"
      ? (carData.images[0] as unknown as string)
      : carData.imagePreviews && carData.imagePreviews.length > 0
        ? carData.imagePreviews[0]
        : carData.images &&
            carData.images.length > 0 &&
            typeof carData.images[0] === "object" &&
            "url" in (carData.images[0] as object)
          ? (carData.images[0] as unknown as LegacyMockImage).url
          : "/placeholder-car.png";

  const allImages: string[] =
    carData.images &&
    carData.images.length > 0 &&
    typeof carData.images[0] === "string"
      ? (carData.images as unknown as string[])
      : carData.imagePreviews && carData.imagePreviews.length > 0
        ? carData.imagePreviews
        : carData.images &&
            carData.images.length > 0 &&
            typeof carData.images[0] === "object"
          ? carData.images
              .map((img) => {
                const legacyImg = img as unknown as LegacyMockImage;
                return legacyImg.url || "";
              })
              .filter(Boolean)
          : [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] md:pt-24 px-4 md:px-8 pb-12 font-sans selection:bg-orange-100">
      {/* Top Navigation Back Action Bar */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <span className="text-sm font-bold flex items-center gap-2">
          <img src="/stroke.png" alt="" className="w-fit" />
          <p className="w-11.5 tex-lg">Fleets</p>
        </span>
      </button>

      {/* Main Profile Header Section  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-6">
        {/* Vehicle Large Hero Display Frame */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 h-[400px] sm:h-[400px] lg:h-[420px] shadow-sm relative overflow-hidden">
          <LazyLoadImageRC
            src={displayImage || "/placeholder-car.png"}
            alt={dynamicVehicleName}
            width="100%"
            height="100%"
            className="w-full h-full object-fit"
          />
        </div>

        {/* Primary Info, Pricing & Dashboard Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 items-center">
              {carData.tags && carData.tags.length > 0
                ? carData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border border-[#BBBBBB] px-2 sm:px-2 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))
                : null}
            </div>

            <p className="text-[11px] font-bold text-[#F97316] uppercase tracking-wide">
              {carData.category || "SUV"} · {carData.year || "2026"}
            </p>

            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {dynamicVehicleName}
            </h1>

            {/* Quick Summary Meta Ratings Info block */}
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
              <div className="flex text-amber-400 tracking-tighter">★★★★★</div>
              <span>4.9</span>
              <span>·</span>
              <span>{currentCar?.tripsCount || 0} trips</span>
            </div>

            <p className="text-[13px] text-gray-400 leading-relaxed font-normal">
              {carData.description ||
                "Reliable, fuel-efficient and perfect for daily trips."}
            </p>
          </div>

          <div className="border-gray-50 space-y-4">
            <div>
              <span className="text-2xl font-extrabold text-gray-900">
                ₦{Number(carData.pricePerDay || 0).toLocaleString()}
              </span>
              <span className="text-[14px] text-gray-400 font-medium ml-1">
                /day, all-inclusive
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className="text-gray-300">
                <img src="/mapPoint.png" alt="" />
              </span>
              <span>{carData.pickupLocation || "Lekki Phase 1"}</span>
            </div>

            {/* Core Operational CTA Actions Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="bg-[#F97316] hover:bg-orange-600 text-white text-[11px] font-bold py-2.5 px-4 rounded-full shadow-sm transition-colors duration-200">
                View bookings
              </button>

              <button
                onClick={() => {
                  setEditData(carData);
                  setIsEditOpen(true);
                }}
                className=" hover:bg-gray-50 text-[#111827] text-[11px] font-bold py-2.5 px-4 rounded-full border transition-colors duration-200 flex items-center justify-center gap-1.5"
              >
                <img src="/Pen.png" alt="" /> Editing Listing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topline API Analytics Performance Counters Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
            Trips (30d)
          </span>
          <span className="text-base font-extrabold text-gray-800 mt-1 block">
            {currentCar?.tripsCount || 0}
          </span>
        </div>
        {/* <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Revenue (30d)</span>
          <span className="text-base font-extrabold text-gray-800 mt-1 block">₦{Number(currentCar?.revenue30d || 0).toLocaleString()}</span>
        </div> */}

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
            Next Service
          </span>
          <span className="text-base font-extrabold text-gray-400 mt-1 block">
            {" "}
            —
          </span>
        </div>
      </div>

      {/* Expanded Multi-Tab Layout Ribbon */}
      <div className="border-b border-gray-100 flex gap-6 text-xs mb-6 bg-white px-5 py-2.5 rounded-xl shadow-sm overflow-x-auto whitespace-nowrap">
        {["Overview", "Photos"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 text-[11px] font-bold transition relative ${
                activeTab === tab
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ),
        )}
      </div>

      {/* Content Render Conditionals */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          {/* At a Glance Card Grid Blocks */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h2 className="text-[12px] font-bold text-gray-900 flex items-center gap-2">
              <img src="/motor.svg" alt="" /> At a glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <img src="/frameOne.svg" alt="" className="w-6 h-6" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  Seat
                </span>
                <span className="text-xs font-bold text-gray-800 mt-1">
                  {carData.seats || "5"}
                </span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <img src="/frameTwo.svg" alt="" className="w-6 h-6" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  Trans
                </span>
                <span className="text-xs font-bold text-gray-800 mt-1 uppercase">
                  {carData.transmission || "AUTO"}
                </span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <img src="/FrameThree.svg" alt="" className="w-6 h-6" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  Fuel
                </span>
                <span className="text-xs font-bold text-gray-800 mt-1 uppercase">
                  {carData.fuelType || "PETROL"}
                </span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col gap-1">
                <img src="/FrameFour.svg" alt="" className="w-6 h-6" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  Year
                </span>
                <span className="text-xs font-bold text-gray-800 mt-1">
                  {carData.year || "2026"}
                </span>
              </div>
            </div>
          </div>

          {/*Specifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h2 className="text-[12px] font-bold text-gray-900 flex items-center gap-2">
              <img src="/speed.png" alt="" className="w-6 h-6" /> Specifications
            </h2>
            <div className="bg-[#0F172A] text-white rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-12">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">
                  Engine
                </span>
                <span className="text-[11px] font-semibold text-white">
                  {currentCar?.carSpecs?.engine || "0 V6"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">
                  Top Speed
                </span>
                <span className="text-[11px] font-semibold text-white">
                  {currentCar?.carSpecs?.topSpeed || "0 km/h"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">
                  Mileage
                </span>
                <span className="text-[11px] font-semibold text-white">
                  {currentCar?.carSpecs?.mileage || "0 km/L"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">
                  Boot
                </span>
                <span className="text-[11px] font-semibold text-white">
                  {currentCar?.carSpecs?.boot || "0 L"}
                </span>
              </div>
            </div>
          </div>

          {/* What's Included & Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Left Included Form Features Grid */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 min-h-[220px]">
              <h3 className="text-[12px] font-bold text-gray-900">
                What's included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(carData.features && carData.features.length > 0
                  ? carData.features
                  : [
                      "Comprehensive insurance",
                      "24/7 road safety",
                      "Free cancellation",
                      "Unlimited mileage in-city",
                      "Sanitize between trips",
                      "Full tank at pick",
                    ]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 bg-gray-50/30 rounded-xl border border-gray-100 text-[11px]"
                  >
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
                      <img src="/iconsCheck.png" alt="" />
                    </span>
                    <span className="text-gray-600 font-medium capitalize">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Stacked Business Performance Analytics Matrix */}
            {/* <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 min-h-[220px]">
              <h3 className="text-[12px] font-bold text-gray-900">
                Performance
              </h3>
              <div className="space-y-3.5 text-[11px]">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">
                    Bookings (lifetime)
                  </span>
                  <span className="font-bold text-gray-800">
                    {currentCar?.lifetimeBookings || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">
                    Current active
                  </span>
                  <span className="font-bold text-gray-800">
                    {currentCar?.activeBookings || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">
                    Avg revenue / trip
                  </span>
                  <span className="font-bold text-gray-800">
                    ₦
                    {Number(
                      currentCar?.avgRevenuePerTrip || 0,
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {/* Auxiliary Tab Displays (Photos Gallery Layout Fallback) */}
      {activeTab === "Photos" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4">
            Vehicle Gallery Images
          </h3>
          {allImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-video bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={url}
                    alt={`Gallery index ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              No custom gallery image files discovered.
            </p>
          )}
        </div>
      )}

      {/* Booking List Fallback Wrapper Frame */}
      {["Bookings", "Maintenance", "Pricing"].includes(activeTab) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-xs text-gray-400 italic">
            Logs and configurations loaded dynamically upon live backend sync
            hook connection.
          </p>
        </div>
      )}
      {isEditOpen && editData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Edit Vehicle Listing
                </h2>
                <p className="text-xs text-gray-400">
                  Update vehicle details and save changes
                </p>
              </div>

              <button
                onClick={() => setIsEditOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              className="p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Updated vehicle:", editData);
                setIsEditOpen(false);
              }}
            >
              {/* Brand */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Brand
                </label>
                <input
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={editData.brand || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, brand: e.target.value } : prev,
                    )
                  }
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Model
                </label>
                <input
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={editData.modelName || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, modelName: e.target.value } : prev,
                    )
                  }
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Price per day
                </label>
                <input
                  type="number"
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={editData.pricePerDay || 0}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev
                        ? { ...prev, pricePerDay: Number(e.target.value) }
                        : prev,
                    )
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full mt-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev,
                    )
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 text-sm rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
