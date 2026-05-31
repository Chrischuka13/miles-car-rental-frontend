/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, ChevronDown, Check } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateAdminNewBookingSchema,
  type AdminCreateBookingSchemaType,
} from "@/lib/schemaTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminCreateBookingApi, getAdminCarsApi } from "@/api/admin";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatNaira = (amount: number) => `₦${amount?.toLocaleString() || 0}`;

export default function NewBookingModal({
  isOpen,
  onClose,
}: NewBookingModalProps) {
  const [step, setStep] = useState(1);
  const [withDriver, setWithDriver] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AdminCreateBookingSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(validateAdminNewBookingSchema) as any,
    defaultValues: {
      driverOption: false,
      paymentMethod: "Pay_with_Bank_Transfer",
    },
  });

  const { data: carsData } = useQuery({
    queryKey: ["adminCars"],
    queryFn: getAdminCarsApi,
    retry: false,
  });

 

  const allCars = carsData?.data?.data ?? [];



  const watchedValues = watch();

  const calculateDays = () => {
    if (!watchedValues.pickupDate || !watchedValues.returnDate) return 0;
    const start = new Date(watchedValues.pickupDate);
    const end = new Date(watchedValues.returnDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const dynamicDays = calculateDays();
  const basePricePerDay = 180000;
  const serviceFeeConstant = 21600;
  const driverFee = withDriver ? 90000 * (dynamicDays || 1) : 0;
  const computedVehicleTotal = basePricePerDay * dynamicDays;
  const finalTotalPrice = computedVehicleTotal + driverFee + serviceFeeConstant;

  const mutation = useMutation({
    mutationFn: adminCreateBookingApi,
    onSuccess: (res) => {
      toast.success(res.data?.message || "Booking created successfully");
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      reset();
      setStep(1);
      setWithDriver(false);
      onClose();
    },
    onError: (error) => {
      if (import.meta.env.DEV) console.error(error);
      if (axios.isAxiosError(error)) {
        console.log("Full error response:", error?.response?.data);
        toast.error(
          error?.response?.data?.message || "Failed to create booking",
        );
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const formatTime = (time: string) => {
    if (!time) return "09:00 AM";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${String(hour12).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const onSubmitForm: SubmitHandler<AdminCreateBookingSchemaType> = (data) => {
    const payload = {
      ...data,
      driverOption: withDriver,
      pickupTime: formatTime(data.pickupTime || "09:00"),
      returnTime: formatTime(data.returnTime || "09:00"),
    };
    if (import.meta.env.DEV) console.log("submitting payload:", payload);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutation.mutate(payload as any);
  };

  const handleContinue = async () => {
    if (step === 1) {
      const isValid = await trigger(["fullname", "phone", "email", "car"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      let absoluteValid = true;

      if (!watchedValues.pickupDate) {
        setError("pickupDate", {
          type: "manual",
          message: "Pickup date is required",
        });
        absoluteValid = false;
      } else {
        clearErrors("pickupDate");
      }

      if (!watchedValues.returnDate) {
        setError("returnDate", {
          type: "manual",
          message: "Return date is required",
        });
        absoluteValid = false;
      } else {
        clearErrors("returnDate");
      }

      const isRestValid = await trigger([
        "pickupLocation",
        "returnLocation",
        "paymentMethod",
      ]);

      if (absoluteValid && isRestValid) {
        const start = new Date(watchedValues.pickupDate);
        const end = new Date(watchedValues.returnDate);
        if (end <= start) {
          setError("returnDate", {
            type: "manual",
            message: "Return date must be after pickup date",
          });
          return;
        }
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCancel = () => {
    setStep(1);
    setWithDriver(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-900">New booking</h2>
        <p className="text-gray-400 text-sm mt-1 mb-6">
          Create a reservation on behalf of a customer.
        </p>

        {/* steps indicator */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <span
              className={`text-sm font-medium ${step >= 1 ? "text-gray-900" : "text-gray-400"}`}
            >
              Customer Details
            </span>
          </div>
          <div
            className={`flex-1 h-px mx-3 ${step >= 2 ? "bg-[#F97316]" : "bg-gray-200"}`}
          />
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              2
            </div>
            <span
              className={`text-sm font-medium ${step >= 2 ? "text-gray-900" : "text-gray-400"}`}
            >
              Pick up details
            </span>
          </div>
          <div
            className={`flex-1 h-px mx-3 ${step >= 3 ? "bg-[#F97316]" : "bg-gray-200"}`}
          />
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              <Check size={12} />
            </div>
            <span
              className={`text-sm font-medium ${step >= 3 ? "text-gray-900" : "text-gray-400"}`}
            >
              Confirmation
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm as any)}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    {...register("fullname")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+234..."
                    {...register("phone")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                  Vehicle
                </label>
                <div className="relative">
                  <select
                    {...register("car")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316] appearance-none bg-white"
                  >
                    <option value="">Search and select Vehicle</option>
                    {/* {cars.map((car) => (
                      <option key={car._id} value={car._id}>
                        {car.brand} {car.modelName}
                      </option>
                    ))} */}
                    {allCars.map((car: any) => (
                      <option key={car._id} value={car._id}>
                        {car.brand} {car.modelName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {errors.car && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.car.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    {...register("pickupLocation")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.pickupLocation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pickupLocation.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Return Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    {...register("returnLocation")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.returnLocation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.returnLocation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    {...register("pickupDate")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pickupDate.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    {...register("returnDate")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                  {errors.returnDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.returnDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    {...register("pickupTime")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                    Return Time
                  </label>
                  <input
                    type="time"
                    {...register("returnTime")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium text-gray-700">
                  Add a professional driver
                </span>
                <button
                  type="button"
                  onClick={() => setWithDriver(!withDriver)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${withDriver ? "bg-[#F97316]" : "bg-gray-200"}`}
                >
                  <span
                    className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${withDriver ? "translate-x-7" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                  Payment Method
                </label>
                <div className="relative">
                  <select
                    {...register("paymentMethod")}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316] appearance-none bg-white"
                  >
                    <option value="Pay_with_Bank_Transfer">
                      Bank Transfer
                    </option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-3 text-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                Customer
              </p>
              <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.fullname || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Address</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.email || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone Number</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.phone || "—"}
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 my-2" />

              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                Vehicle
              </p>
              <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="font-medium text-gray-900">
                    {allCars.find((c: any) => c._id === watchedValues.car)
                      ? `${allCars.find((c: any) => c._id === watchedValues.car)?.brand} ${allCars.find((c: any) => c._id === watchedValues.car)?.modelName}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pick up Location</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.pickupLocation || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Location</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.returnLocation || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dates</span>
                  <span className="font-medium text-gray-900">
                    {watchedValues.pickupDate && watchedValues.returnDate
                      ? `${watchedValues.pickupDate} → ${watchedValues.returnDate} (${dynamicDays} days)`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver</span>
                  <span className="font-medium text-gray-900">
                    {withDriver ? "With driver" : "No driver"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium text-gray-900">
                    Bank Transfer
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 my-2" />

              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                Price Breakdown
              </p>
              <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    {dynamicDays} days × {formatNaira(basePricePerDay)}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatNaira(computedVehicleTotal)}
                  </span>
                </div>
                {withDriver && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Driver fee</span>
                    <span className="font-medium text-gray-900">
                      {formatNaira(driverFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Service fee</span>
                  <span className="font-medium text-gray-900">
                    {formatNaira(serviceFeeConstant)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900 text-base">
                    {formatNaira(finalTotalPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 || mutation.isPending}
              className="flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 bg-[#F97316] text-white rounded-full py-3 text-sm font-medium hover:bg-orange-600 transition"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-[#F97316] text-white rounded-full py-3 text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
              >
                {mutation.isPending ? "Creating..." : "Create Booking"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
