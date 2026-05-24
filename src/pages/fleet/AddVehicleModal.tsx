import { useState, useRef } from "react";

import type { VehicleFormState } from "@/constants/Fleets";
import {
  initialVehicleState,
  VEHICLE_CATEGORIES,
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  STATUS_OPTIONS,
  AVAILABLE_BADGES,
} from "@/constants/Fleets";
import { VehiclePreviewModal } from "./VehiclePreviewModal";
import { X } from "lucide-react";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (formState: VehicleFormState) => void;
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onSuccess,
}: AddVehicleModalProps) {
  const [form, setForm] = useState<VehicleFormState>(initialVehicleState);
  const [activeScreen, setActiveScreen] = useState<"form" | "preview">("form");
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleGoToPreview = () => {
    setActiveScreen("preview");
  };
  const handleBackToEdit = () => {
    setIsEditMode(true);
    setActiveScreen("form");
  };

  const handleCancelOrBack = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      onClose();
    }
  };

  const handleFinalSubmit = () => {
    onSuccess(form);
    setActiveScreen("form");
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "seats" || name === "doors") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBadgeToggle = (badge: string) => {
    setForm((prev) => {
      const isSelected = prev.badges.includes(badge);
      return {
        ...prev,
        badges: isSelected
          ? prev.badges.filter((b) => b !== badge)
          : [...prev.badges, badge],
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (activeUploadIndex !== null) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setForm((prevForm) => {
        const updatedImages = [...prevForm.images];
        updatedImages[activeUploadIndex] = imageUrl;
        return { ...prevForm, images: updatedImages };
      });

      setActiveUploadIndex(null);
    } else {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setForm((prevForm) => {
        const updatedImages = [...prevForm.images];
        newImageUrls.forEach((url) => {
          if (updatedImages.length < 4) {
            updatedImages.push(url);
          }
        });
        return { ...prevForm, images: updatedImages };
      });
    }
    e.target.value = "";
  };

  if (activeScreen === "preview") {
    return (
      <VehiclePreviewModal
        isOpen={true}
        onClose={() => {
          setActiveScreen("form");
          onClose();
        }}
        onEditClick={handleBackToEdit}
        onConfirmClick={handleFinalSubmit}
        data={form}
      />
    );
  }
  // Otherwise, render the Standalone Form drawer (Screen 1 or Screen 2)
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              {isEditMode ? "Edit Details" : "Add a Vehicle"}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-xs text-[#656565] mb-6">
            Select what goes live on the website. These fields populate the
            public car details page.
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* PHOTO UPLOAD SLOTS */}
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                // Changed the bulky inline code to reference your function directly
                onChange={handleImageUpload}
              />

              <div
                onClick={() => {
                  setActiveUploadIndex(0);
                  fileInputRef.current?.click();
                }}
                className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-100/70 transition mb-3 min-h-32"
              >
                {form.images[0] ? (
                  <div className="w-full h-full">
                    <img
                      src={form.images[0]}
                      alt="Car main preview"
                      className="w-full h-auto object-contain rounded"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-orange-500 text-xs font-semibold mb-1">
                      <img src="/lucide_car.svg" alt="" />
                    </span>
                    <span className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                      <img src="/Gallery Add.svg" alt="" />
                      <p className="text-base text-[#F97316]">Upload photo</p>
                    </span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveUploadIndex(index);
                      fileInputRef.current?.click();
                    }}
                    className="border border-dashed border-gray-200 rounded-xl h-20 flex items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-100 text-gray-400 text-[11px] overflow-hidden"
                  >
                    {form.images[index] ? (
                      <img
                        src={form.images[index]}
                        alt="Sub slot preview"
                        className="h-full w-full object-fit"
                      />
                    ) : (
                      <span>+ Sub {index}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BASICS */}
            <div className="space-y-3">
              <p className="text-[13px] text-[#4B5563] tracking-wider">
                Basics
              </p>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Vehicle name
                </label>
                <input
                  type="text"
                  name="vehicleName"
                  value={form.vehicleName}
                  onChange={handleChange}
                  placeholder="Lexus RX 350"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Marketing tagline
                </label>
                <input
                  type="text"
                  name="marketingTagline"
                  value={form.marketingTagline}
                  onChange={handleChange}
                  placeholder="Reliable, fuel-efficient..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Plate number
                  </label>
                  <input
                    type="text"
                    name="plateNumber"
                    value={form.plateNumber}
                    onChange={handleChange}
                    placeholder="LSR 123AB"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="2024"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-white"
                >
                  {VEHICLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Badges
                </label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {AVAILABLE_BADGES.map((badge) => {
                    const isSelected = form.badges.includes(badge);
                    return (
                      <button
                        type="button"
                        key={badge}
                        onClick={() => handleBadgeToggle(badge)}
                        className={`text-[11px] px-3 py-1 rounded-full border font-medium ${
                          isSelected
                            ? "bg-orange-50 text-[#F97316] border-orange-300"
                            : "bg-white text-gray-500 border-gray-200"
                        }`}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AT A GLANCE */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                At a glance
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={form.seats || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Doors
                  </label>
                  <input
                    type="number"
                    name="doors"
                    value={form.doors || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Fuel
                  </label>
                  <select
                    name="fuel"
                    value={form.fuel}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  >
                    {FUEL_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  >
                    {TRANSMISSION_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-gray-600 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="airConditioning"
                  checked={form.airConditioning}
                  onChange={handleChange}
                  className="accent-orange-500 w-4 h-4"
                />
                Air conditioning
              </label>
            </div>

            {/* SPECIFICATIONS */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Specifications
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Engine
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={form.engine}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Top speed
                  </label>
                  <input
                    type="text"
                    name="topSpeed"
                    value={form.topSpeed}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Mileage
                  </label>
                  <input
                    type="text"
                    name="mileage"
                    value={form.mileage}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Boot capacity
                  </label>
                  <input
                    type="text"
                    name="bootCapacity"
                    value={form.bootCapacity}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Pricing
              </p>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Daily rate (₦)
                </label>
                <input
                  type="text"
                  name="dailyRate"
                  value={form.dailyRate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Weekly discount (%)
                  </label>
                  <input
                    type="text"
                    name="weeklyDiscount"
                    value={form.weeklyDiscount}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Monthly discount (%)
                  </label>
                  <input
                    type="text"
                    name="monthlyDiscount"
                    value={form.monthlyDiscount}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    With-driver surcharge (₦/Day)
                  </label>
                  <input
                    type="text"
                    name="withDriverSurcharge"
                    value={form.withDriverSurcharge}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Refundable deposit (₦)
                  </label>
                  <input
                    type="text"
                    name="refundableDeposit"
                    value={form.refundableDeposit}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            {/* WHAT'S INCLUDED */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                What's included
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <label className="flex items-center gap-2 p-2.5 bg-orange-50/40 border border-orange-100 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="comprehensiveInsurance"
                    checked={form.comprehensiveInsurance}
                    onChange={handleChange}
                    className="accent-orange-500 w-4 h-4"
                  />
                  Comprehensive Insurance
                </label>
                <label className="flex items-center gap-2 p-2.5 bg-orange-50/40 border border-orange-100 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="roadsideAssistance247"
                    checked={form.roadsideAssistance247}
                    onChange={handleChange}
                    className="accent-orange-500 w-4 h-4"
                  />
                  24/7 Roadside Support
                </label>
                <label className="flex items-center gap-2 p-2.5 bg-orange-50/40 border border-orange-100 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="freeCancellation"
                    checked={form.freeCancellation}
                    onChange={handleChange}
                    className="accent-orange-500 w-4 h-4"
                  />
                  Free cancellation
                </label>
                <label className="flex items-center gap-2 p-2.5 bg-orange-50/40 border border-orange-100 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="unlimitedMileageInCity"
                    checked={form.unlimitedMileageInCity}
                    onChange={handleChange}
                    className="accent-orange-500 w-4 h-4"
                  />
                  Unlimited mileage in city
                </label>
              </div>
            </div>

            {/* LOCATION & STATUS */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Pickup location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={form.pickupLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* BOTTOM PANEL BUTTON ACTIONS */}
        <div className="flex gap-3 border-t border-gray-100 pt-4 mt-8 bg-white">
          <button
            type="button"
            onClick={handleCancelOrBack}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            {isEditMode ? "Back" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={handleGoToPreview}
            className="flex-1 py-3 bg-[#F97316] text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition shadow-sm"
          >
            Preview vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
