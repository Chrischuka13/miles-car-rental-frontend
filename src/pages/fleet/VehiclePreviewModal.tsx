import type { VehicleFormState } from "@/constants/Fleets";
import { useAddVehicle } from "@/hooks/useAddVehicle";
import { Loader, X } from "lucide-react";

interface VehiclePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
  onConfirmClick: () => void; // Optional fallback if needed by parent state controllers
  data: VehicleFormState;
  isPending: boolean;
}

export function VehiclePreviewModal({
  isOpen,
  onClose,
  onEditClick,
  onConfirmClick,
  data,
  isPending,
}: VehiclePreviewModalProps) {
  //  Initialize custom TanStack Query hook
  // When the parent component doesn't provide an explicit onConfirmClick handler, this fallback mutation will handle the vehicle creation logic safely within this modal's context. If the parent does provide an onConfirmClick, it will take precedence, allowing for flexible control over the mutation flow.
  const mutation = useAddVehicle(() => {
    onClose();
    if (onConfirmClick) onConfirmClick();
  });

  if (!isOpen) return null;

  const displayImage =
    data.imagePreviews && data.imagePreviews.length > 0
      ? data.imagePreviews[0]
      : "/placeholder-car.png";

  const dynamicVehicleName =
    data.brand || data.modelName
      ? `${data.brand} ${data.modelName}`.trim()
      : "Lexus RX 350";

  const handleContinueAndAdd = () => {
    if (onConfirmClick) {
      onConfirmClick(); //  parent component handle the actual single mutation upload safely
    } else {
      mutation.mutate(data); // Safe fallback query only if parent didn't provide a controller
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-[#FAFAFA] w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
        <div className=" px-6 py-4  border-gray-100 flex justify-between items-center shrink-0">
          <button
            type="button"
            disabled={mutation.isPending} 
            onClick={onEditClick}
            className={`flex items-center gap-1 font-medium transition ${
              mutation.isPending ? "opacity-40 cursor-not-allowed" : ""
            }`}
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
            disabled={mutation.isPending}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Preview Vehicle</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              This is exactly how guests will see {dynamicVehicleName} on the
              website.
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

          <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-1.5">
              {data.tags &&
                data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm uppercase"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              {data.category} · {data.year || "2026"}
            </div>

            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {dynamicVehicleName}
            </h2>

            {/* Star Rating Info Row */}
            <div className="flex items-center gap-1 text-xs">
              <div className="flex text-gray-900 text-sm">★★★★★</div>
              <span className="text-[#A1A1A1] font-medium ml-1">New</span>
              <span className="text-[#A1A1A1]">●</span>
              <span className="text-[#A1A1A1]">
                {data.tripsCount || 0} trips
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#A1A1A1]">
              {data.description ||
                "Reliable, fuel-efficient and perfect for daily Lagos trips."}
            </p>

            <div className="pt-2 border-gray-50 space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-gray-900 text-[#A1A1A1]">
                  ₦{Number(data.pricePerDay || 0).toLocaleString()}
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

          {/* At a Glance */}
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
                  {data.transmission ? data.transmission.substring(0, 2) : "AT"}
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
                  {data.fuelType}
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

          {/* Specifications  */}
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
                  {data.carSpecs?.engine || "3.5L V6"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Top Speed
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.carSpecs?.topSpeed || "230 km/h"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Mileage
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.carSpecs?.mileage || "22 km/L"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Boot
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {data.carSpecs?.boot || "454 L"}
                </p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              What's included
            </p>
            {data.features && data.features.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-white border border-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm"
                  >
                    <span className="text-orange-500 font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No features added yet.
              </p>
            )}
          </div>
        </div>

        {/* Footer Buttons Container Row */}
        <div className="p-4 border-gray-100 flex gap-3 shrink-0">
          <button
            type="button"
            disabled={isPending}
            onClick={onEditClick}
            className="flex-1 py-3 border border-gray-200 bg-white rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit details
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleContinueAndAdd}
            className={`flex-1 py-3 text-white rounded-full text-xs font-semibold transition text-center shadow-md animate-fade-in select-none ${
              isPending
                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-[#F97316] hover:bg-orange-600"
            }`}
          >
            {isPending ? (
              <Loader
                className="animate-spin text-DeepOrange flex justify-center items-center w-full"
                size={18}
              />
            ) : (
              "Continue & add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
