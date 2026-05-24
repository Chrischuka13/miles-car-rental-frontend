import type { VehicleFormState } from "@/constants/Fleets";
import { X } from "lucide-react";

interface VehiclePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
  onConfirmClick: () => void;
  data: VehicleFormState;
}

export function VehiclePreviewModal({
  isOpen,
  onClose,
  onEditClick,
  onConfirmClick,
  data,
}: VehiclePreviewModalProps) {
  if (!isOpen) return null;

  const displayImage =
    data.images && data.images.length > 0
      ? data.images[0]
      : "/placeholder-car.png";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      {/* Right Slide Drawer matching the exact width of the Form */}
      <div className="bg-[#FAFAFA] w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Top Header Navigation Panel */}
        <div className=" px-6 py-4  border-gray-100 flex justify-between items-center shrink-0">
          <button
            type="button"
            onClick={onEditClick}
            className=" flex items-center gap-1 font-medium transition"
          >
            <span className="flex items-center gap-2 text-base leading-none">
              <img src="/arrowLeft.jpg" alt="" className="w-[6px]" />
              <p className="text-xs text-gray-500 hover:text-gray-800">
                Back to Edit
              </p>
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Document Area Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Preview Vehicle</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              This is exactly how guests will see{" "}
              {data.vehicleName || "Lexus RX 350"} on the website.
            </p>
          </div>

          {/* Picture Box showcase block */}
          <div className="w-full bg-white h-52 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={displayImage}
              alt="Live frame preview"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Heading Detail & Text Context blocks */}
          <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-1.5">
              {data.badges.map((badge, index) => (
                <span
                  key={index}
                  className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              {data.category} · {data.year || "2026"}
            </div>

            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {data.vehicleName || "Lexus RX 350"}
            </h2>

            {/* Star Rating Info Row */}
            <div className="flex items-center gap-1 text-xs">
              <div className="flex text-gray-900 text-sm">★★★★★</div>
              <span className="text-[#A1A1A1] font-medium ml-1">New</span>
              <span className="text-[#A1A1A1]">·</span>
              <span className="text-[#A1A1A1]">No trips yet</span>
            </div>

            <p className="text-xs leading-relaxed text-[#A1A1A1]">
              {data.marketingTagline ||
                "Reliable, fuel-efficient and perfect for daily Lagos trips."}
            </p>

            <div className="pt-2 border-gray-50 space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-gray-900 text-[#A1A1A1]">
                  ₦{Number(data.dailyRate || 12000).toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#A1A1A1]">
                  Vat inclusive
                </span>
              </div>

              {/* Location pin indicator matching icon vector placement row */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <img
                  src="/adminLocation.svg"
                  alt="vector logo"
                  className="w-6 sm:w-fit "
                />
                <span className="truncate text-[#A1A1A1]">
                  {data.pickupLocation || "Lekki Phase 1"}
                </span>
              </div>
            </div>
          </div>

          {/* At a Glance specs layout matrix grids */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              At a glance
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#E9E9E9] rounded-2xl p-3 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
                <img
                  src="/adminSeat.svg"
                  alt="vector logo"
                  className="w-6 sm:w-fit "
                />
                <span className="text-sm font-bold text-gray-900">
                  {data.seats}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                  Seats
                </span>
              </div>
              <div className="bg-[#E9E9E9] rounded-2xl p-3 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
                <img
                  src="/adminTrans.svg"
                  alt="vector logo"
                  className="w-6 sm:w-fit "
                />
                <span className="text-sm font-bold text-gray-900 uppercase">
                  Hᵀ
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                  Trans
                </span>
              </div>
              <div className="bg-[#E9E9E9] rounded-2xl p-3 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
                <img
                  src="/adminGas.svg"
                  alt="vector logo"
                  className="w-6 sm:w-fit "
                />
                <span className="text-sm font-bold text-gray-900 truncate max-w-full">
                  {data.fuel}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                  Fuel
                </span>
              </div>
              <div className="bg-[#E9E9E9] rounded-2xl p-3 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
                <img
                  src="/adminRate.svg"
                  alt="vector logo"
                  className="w-6 sm:w-fit "
                />
                <span className="text-sm font-bold text-gray-900">
                  {data.year || "2026"}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                  Year
                </span>
              </div>
            </div>
          </div>

          {/* Deep Dark Blue Technical Specifications Container Sheet */}
          <div className="bg-[#0F172A] rounded-2xl p-5 text-white space-y-4 shadow-md">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Specifications
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Engine
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.engine || "3.5L V6"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Top Speed
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.topSpeed || "230 km/h"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Mileage
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.mileage || "22 km/L"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Boot
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.bootCapacity || "454 L"}
                </p>
              </div>
            </div>
          </div>

          {/* What's Included Grid checklist items block */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              What's included
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.comprehensiveInsurance
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  Comprehensive Insurance
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.roadsideAssistance247
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  24/7 road support
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.freeCancellation
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  Free cancellation
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.unlimitedMileageInCity
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  Unlimited mileage in city
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.sanitizedBetweenTrips
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  Sanitized between trips
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-bold text-[9px]">
                  ✓
                </span>
                <span
                  className={
                    data.fullTankOnPickUp
                      ? "text-gray-800 font-medium"
                      : "text-gray-400 line-through"
                  }
                >
                  Full tank at pickup
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Footer controls container */}
        <div className="p-4 border-gray-100  flex gap-3 shrink-0">
          <button
            type="button"
            onClick={onEditClick}
            className="flex-1 py-3 border border-gray-200 bg-white rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition text-center"
          >
            Edit details
          </button>
          <button
            type="button"
            onClick={onConfirmClick}
            className="flex-1 py-3 bg-[#F97316] text-white rounded-full text-xs font-semibold hover:bg-orange-600 transition text-center shadow-md animate-fade-in"
          >
            Continue & add
          </button>
        </div>
      </div>
    </div>
  );
}
