import { useState, useRef } from "react";
import type { VehicleFormState } from "@/constants/Fleets";
import {
  initialVehicleState,
  VEHICLE_CATEGORIES,
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  STATUS_OPTIONS,
  VEHICLE_TAGS,
} from "@/constants/Fleets";
import { VehiclePreviewModal } from "./VehiclePreviewModal";
import { X, Plus } from "lucide-react";

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
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);
  
  // Local state helper for the "What's Included" input text field
  const [customFeatureInput, setCustomFeatureInput] = useState("");

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

  // Process flat form field changes accurately
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    
    // Explicitly parse dynamic backend numeric entries
    if (name === "seats" || name === "year" || name === "pricePerDay") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 👈 NEW: Safely handles updating properties inside the nested carSpecs block
  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      carSpecs: {
        ...prev.carSpecs,
        [name]: value,
      },
    }));
  };

  const handleBadgeToggle = (badge: string) => {
    setForm((prev) => {
      const isSelected = prev.tags.includes(badge);
      return {
        ...prev,
        tags: isSelected
          ? prev.tags.filter((b) => b !== badge)
          : [...prev.tags, badge],
      };
    });
  };

  // Add items dynamically to the features list
  const handleAddFeature = () => {
    const trimmedValue = customFeatureInput.trim();
    if (!trimmedValue) return;

    // Prevent duplicates
    if (!form.features.includes(trimmedValue)) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, trimmedValue],
      }));
    }
    setCustomFeatureInput("");
  };

  // Remove items dynamically from the features list
  const handleRemoveFeature = (featureToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== featureToRemove),
    }));
  };

  // 👈 FIXED: Separates binary Files (for backend) and blob URLs (for UI rendering images)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (activeUploadIndex !== null) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setForm((prevForm) => {
        const updatedImages = [...prevForm.images];
        const updatedPreviews = [...prevForm.imagePreviews];

        updatedImages[activeUploadIndex] = file;
        updatedPreviews[activeUploadIndex] = imageUrl;

        return { ...prevForm, images: updatedImages, imagePreviews: updatedPreviews };
      });

      setActiveUploadIndex(null);
    } else {
      const addedFiles = Array.from(files);
      
      setForm((prevForm) => {
        const updatedImages = [...prevForm.images];
        const updatedPreviews = [...prevForm.imagePreviews];

        addedFiles.forEach((file) => {
          if (updatedImages.length < 4) {
            updatedImages.push(file);
            updatedPreviews.push(URL.createObjectURL(file));
          }
        });

        return { ...prevForm, images: updatedImages, imagePreviews: updatedPreviews };
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
                onChange={handleImageUpload}
              />

              <div
                onClick={() => {
                  setActiveUploadIndex(0);
                  fileInputRef.current?.click();
                }}
                className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-100/70 transition mb-3 min-h-32"
              >
                {/* 👈 FIXED: Reads from preview cache URL array */}
                {form.imagePreviews[0] ? (
                  <div className="w-full h-full">
                    <img
                      src={form.imagePreviews[0]}
                      alt="Car main preview"
                      className="w-full h-auto object-contain rounded"
                    />
                  </div>
                ) : (
                  <>
                    <span className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
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
                    {/* 👈 FIXED: Reads from preview cache URL array */}
                    {form.imagePreviews[index] ? (
                      <img
                        src={form.imagePreviews[index]}
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
              
              {/* 👈 FIXED: Split vehicleName input into Brand and Model Name grid items */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Lexus"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    name="modelName"
                    value={form.modelName}
                    onChange={handleChange}
                    placeholder="RX 350"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 👈 NEW: Added explicit Price Per Day parameter slot */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Price Per Day ($)
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={form.pricePerDay || ""}
                  onChange={handleChange}
                  placeholder="120"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Marketing tagline / Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Reliable, fuel-efficient..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-white focus:outline-none"
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
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {VEHICLE_TAGS.map((brandItem) => {
                    const isSelected = form.tags.includes(brandItem);
                    return (
                      <button
                        type="button"
                        key={brandItem}
                        onClick={() => handleBadgeToggle(brandItem)}
                        className={`text-[11px] px-3 py-1 rounded-full border font-medium ${
                          isSelected
                            ? "bg-orange-50 text-[#F97316] border-orange-300"
                            : "bg-white text-gray-500 border-gray-200"
                        }`}
                      >
                        {brandItem}
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
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={form.year || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
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
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  >
                    {TRANSMISSION_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                    value={form.carSpecs.engine}
                    onChange={handleSpecChange}
                    placeholder="3.5L V6"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Top speed
                  </label>
                  <input
                    type="text"
                    name="topSpeed"
                    value={form.carSpecs.topSpeed}
                    onChange={handleSpecChange}
                    placeholder="230 km/h"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Mileage
                  </label>
                  <input
                    type="text"
                    name="mileage"
                    value={form.carSpecs.mileage}
                    onChange={handleSpecChange}
                    placeholder="22 km/L"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Boot capacity
                  </label>
                  <input
                    type="text"
                    name="boot"
                    value={form.carSpecs.boot}
                    onChange={handleSpecChange}
                    placeholder="454 L"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* WHAT'S INCLUDED */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                What's included
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  placeholder="e.g., Comprehensive Insurance, 24/7 Support"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  className="flex-1 border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition flex items-center justify-center shrink-0"
                >
                  <Plus size={20} />
                </button>
              </div>

              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-orange-50/60 border border-orange-100 text-gray-700 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="text-gray-400 hover:text-orange-600 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                  placeholder="Lekki Phase 1"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
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
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:outline-none"
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