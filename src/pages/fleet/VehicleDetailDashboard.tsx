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

  // 1. Dynamic Vehicle Name Fallback
  const currentCar: VehicleFormState = carData;
  const dynamicVehicleName = (currentCar?.brand || currentCar?.modelName)
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
    <div className="min-h-screen bg-[#FAFAFA] pt-24 px-8 pb-12 font-sans selection:bg-orange-100">
      {/* Top Navigation Back Action Bar */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <span className="text-sm font-bold">‹</span> Fleets
      </button>

      {/* Main Profile Header Section (Split Image / Details Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-6">
        {/* Left Side: Vehicle Large Hero Display Frame */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center min-h-[340px] shadow-sm relative overflow-hidden">

              <LazyLoadImageRC
                src={displayImage || "/placeholder-car.png"}
                alt={dynamicVehicleName}
                width="100%"
                height="100%"
                className="max-h-64 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />

         
        
        </div>

        {/* Right Side: Primary Info, Pricing & CTA Dashboard Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="bg-gray-50 text-[10px] font-bold text-gray-500 px-2.5 py-1 rounded-md border border-gray-100 capitalize">
                {carData.category || "City"}
              </span>
              <span className="bg-gray-50 text-[10px] font-bold text-gray-500 px-2.5 py-1 rounded-md border border-gray-100">
                Best seller
              </span>
            </div>

            <p className="text-[11px] font-bold text-[#F97316] uppercase tracking-wide">
              {carData.category || "SUV"} · {carData.year || "2026"}
            </p>

            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {dynamicVehicleName}
            </h1>

            {/* Quick Summary Meta Ratings Info block */}
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
              <div className="flex text-amber-400 tracking-tighter">★★★★★</div>
              <span>4.9</span>
              <span>·</span>
              <span>{(currentCar?.tripsCount || 0)} trips</span>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
              {carData.description || "Reliable, fuel-efficient and perfect for daily trips."}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-4">
            <div>
              <span className="text-xl font-extrabold text-gray-900">
                ₦{Number(carData.pricePerDay || 0).toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-400 font-medium ml-1">
                /day, all-inclusive
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className="text-gray-300">👥</span>
              <span>{carData.pickupLocation || "Lekki Phase 1"}</span>
            </div>

            {/* Core Operational CTA Actions Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="bg-[#F97316] hover:bg-orange-600 text-white text-[11px] font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors duration-200">
                View bookings
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 text-[11px] font-bold py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm transition-colors duration-200 flex items-center justify-center gap-1.5">
                📝 Editing listing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topline API Analytics Performance Counters Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Trips (30d)</span>
          <span className="text-base font-extrabold text-gray-800 mt-1 block">{(currentCar?.trips30d || 0)}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Revenue (30d)</span>
          <span className="text-base font-extrabold text-gray-800 mt-1 block">₦{Number(currentCar?.revenue30d || 0).toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Utilization</span>
          <span className="text-base font-extrabold text-orange-500 mt-1 block">{currentCar?.utilizationRate || "0%"}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Next Service</span>
          <span className="text-base font-extrabold text-gray-400 mt-1 block">{currentCar?.nextServiceDate || "—"}</span>
        </div>
      </div>

      {/* Expanded Multi-Tab Layout Ribbon */}
      <div className="border-b border-gray-100 flex gap-6 text-xs mb-6 bg-white px-5 py-2.5 rounded-xl shadow-sm overflow-x-auto whitespace-nowrap">
        {["Overview", "Bookings", "Maintenance", "Photos", "Pricing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 text-[11px] font-bold transition relative ${
              activeTab === tab ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Render Conditionals */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          {/* Section A: At a Glance Card Grid Blocks */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h2 className="text-[12px] font-bold text-gray-900 flex items-center gap-2">
              🚗 At a glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Seat</span>
                <span className="text-xs font-bold text-gray-800 mt-1">{carData.seats || "5"}</span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Trans</span>
                <span className="text-xs font-bold text-gray-800 mt-1 uppercase">{carData.transmission || "AUTO"}</span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Fuel</span>
                <span className="text-xs font-bold text-gray-800 mt-1 uppercase">{carData.fuelType || "PETROL"}</span>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between min-h-[72px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Year</span>
                <span className="text-xs font-bold text-gray-800 mt-1">{carData.year || "2026"}</span>
              </div>
            </div>
          </div>

          {/* Section B: Dark Mechanical Technical Specifications Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h2 className="text-[12px] font-bold text-gray-900 flex items-center gap-2">
              ⚙️ Specifications
            </h2>
            <div className="bg-[#0F172A] text-white rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-12">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">Engine</span>
                <span className="text-[11px] font-semibold text-white">{currentCar?.carSpecs?.engine || "0 V6"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">Top Speed</span>
                <span className="text-[11px] font-semibold text-white">{currentCar?.carSpecs?.topSpeed || "0 km/h"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">Mileage</span>
                <span className="text-[11px] font-semibold text-white">{currentCar?.carSpecs?.mileage || "0 km/L"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-[11px] text-slate-400 font-normal">Boot</span>
                <span className="text-[11px] font-semibold text-white">{currentCar?.carSpecs?.boot || "0 L"}</span>
              </div>
            </div>
          </div>

          {/* Section C: Dual Layout Splits (What's Included & Performance Table Metrics) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Left Included Form Features Grid */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 min-h-[220px]">
              <h3 className="text-[12px] font-bold text-gray-900">What's included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(carData.features && carData.features.length > 0 ? carData.features : [
                  "Comprehensive insurance", "24/7 road safety",
                  "Free cancellation", "Unlimited mileage in-city",
                  "Sanitize between trips", "Full tank at pick"
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 bg-gray-50/30 rounded-xl border border-gray-100 text-[11px]">
                    <span className="text-orange-500 font-bold bg-orange-50 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">✓</span>
                    <span className="text-gray-600 font-medium capitalize">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Stacked Business Performance Analytics Matrix */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 min-h-[220px]">
              <h3 className="text-[12px] font-bold text-gray-900">Performance</h3>
              <div className="space-y-3.5 text-[11px]">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Bookings (lifetime)</span>
                  <span className="font-bold text-gray-800">{(currentCar?.lifetimeBookings || 0)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Current active</span>
                  <span className="font-bold text-gray-800">{(currentCar?.activeBookings || 0)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Avg revenue / trip</span>
                  <span className="font-bold text-gray-800">₦{Number(currentCar?.avgRevenuePerTrip || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auxiliary Tab Displays (Photos Gallery Layout Fallback) */}
      {activeTab === "Photos" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4">Vehicle Gallery Images</h3>
          {allImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((url, idx) => (
                <div key={idx} className="aspect-video bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img src={url} alt={`Gallery index ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No custom gallery image files discovered.</p>
          )}
        </div>
      )}

      {/* Booking List Fallback Wrapper Frame */}
      {["Bookings", "Maintenance", "Pricing"].includes(activeTab) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-xs text-gray-400 italic">Logs and configurations loaded dynamically upon live backend sync hook connection.</p>
        </div>
      )}
    </div>
  );
}