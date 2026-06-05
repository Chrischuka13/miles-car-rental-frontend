import { useEffect, useMemo, useState } from "react";
import Stepper from "@/components/booking/Stepper";
import { Switch } from "@/components/ui/switch";
import Success from "@/components/booking/Success";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateBookingSchema, type BookingForm } from "@/lib/schemaTypes";
import { createBooking } from "@/api/booking";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { initiatePayment } from "@/api/payment";
import { getCarBySlug } from "@/api/cars/cars";
import { errorHandler } from "@/lib/utils";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { Button } from "@base-ui/react/button";

interface CarData {
  images: {
    url: string;
  }[];
  category: string;
  modelName: string;
  _id: string;
  pricePerDay: number;
}

export default function Booking() {
  const { slug } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["car", slug],
    queryFn: () => getCarBySlug(slug as string),
    enabled: !!slug,
  });
  const [bookingId, setBookingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const selectedCars: CarData | undefined = data?.data;
  const bookingStorage = JSON.parse(
    localStorage.getItem("bookingData") || "null",
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(validateBookingSchema),

    defaultValues: {
      // PREFILL VALUES FROM LOCAL STORAGE
      car: bookingStorage?.car || "",
      pickupLocation: bookingStorage?.pickupLocation || "",
      returnLocation: bookingStorage?.returnLocation || "",
      pickupDate: bookingStorage?.pickupDate
        ? new Date(bookingStorage?.pickupDate).toISOString().split("T")[0] || ""
        : "",
      returnDate: bookingStorage?.returnDate
        ? new Date(bookingStorage?.returnDate).toISOString().split("T")[0] || ""
        : "",
      pickupTime: bookingStorage?.pickupTime || "",
      returnTime: bookingStorage?.returnTime || "",
      driverOption: bookingStorage?.driverOption || false,
    },
  });

  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [currentStep, setCurrentStep] = useState(1);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "";
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (selectedCars) {
      setValue("car", selectedCars?._id);
    }
  }, [selectedCars, setValue]);

  useEffect(() => {
    if (step) {
      Promise.resolve().then(() => setCurrentStep(3));
    }
  }, [step]);

  const watchPickUpLocation = useWatch({ control, name: "pickupLocation" });
  const watchPickUpDate = useWatch({ control, name: "pickupDate" });
  const watchReturnDate = useWatch({ control, name: "returnDate" });
  const start = new Date(watchPickUpDate);
  const end = new Date(watchReturnDate);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const finalDays = diffDays > 0 ? diffDays : 1;

  const getRentalCost = finalDays * (selectedCars?.pricePerDay ?? 0);
  // const getRentalCost = finalDays * (selectedCars?.pricePerDay * 200);

  const totalDays = bookingStorage?.totalDays || finalDays;
  const rentalCost = bookingStorage?.rentalCost || getRentalCost || 0;
  const serviceFee = bookingStorage?.serviceFee || 10000;

  const watchDriverOption = useWatch({ control, name: "driverOption" });
  const driverFee = useMemo(() => {
    return watchDriverOption ? 20000 * totalDays : 0;
  }, [totalDays, watchDriverOption]);

  // TOTAL
  const total = useMemo(() => {
    return rentalCost + serviceFee + driverFee;
  }, [rentalCost, serviceFee, driverFee]);

  const bookDataMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async (response) => {
      if (response.success) {
        setBookingId(response.booking._id);
        localStorage.setItem("bookingId", response.booking._id);
        handleNext();
      }
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });

  const paymentDataMutation = useMutation({
    mutationFn: initiatePayment,
    onSuccess: async (response) => {
      if (response.success) {
        toast.info(
          "Payment initiated successfully! Redirecting to Paystack...",
        );
        window.location.href = response.data.authorization_url;
      }
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });

  const createBookingData = (data: BookingForm) => {
    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        ...data,
        totalDays,
        rentalCost,
        serviceFee,
      }),
    );

    import.meta.env.DEV && console.log(
      "BOOKING STORAGE:",
      JSON.parse(localStorage.getItem("bookingData") || "{}"),
    );

    if (!user) {
      toast.error("You are not logged in, please login to continue");
      navigate("/auth/login");
      return;
    }

    bookDataMutation.mutate(data);
  };

  const handlePaystack = () => {
    if (!bookingId || !slug) {
      return;
    }
    const payload = {
      bookingId,
      slug,
      paymentMethod,
      amount: total,
      carId: selectedCars?._id,
    };
    if (!payload.carId) {
      throw new Error("Car ID is required");
    }
    paymentDataMutation.mutate({ ...payload, carId: payload.carId });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin w-4 h-4 text-DeepOrange" />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <main className="pt-20 px-4 pb-20 bg-[#F5F5F5] flex items-center justify-center lg:block min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 space-y-3">
            {currentStep < 3 && (
              <Link to="/cars/carlisting">
                <p className="text-sm text-gray-500 pt-5">&lt; Back to cars</p>
              </Link>
            )}

            <h1 className="text-DarkBlue text-2xl ">
              {currentStep === 1 && "Book your Trip"}
              {currentStep === 2 && "Secure payment"}
              {currentStep === 3 && <Success />}
            </h1>
          </div>

          <Stepper currentStep={currentStep} />

          <div className="grid grid-cols-12 gap-4 lg:gap-10 ">
            {/* LEFT - FORM */}
            <div className="col-span-12 md:col-span-8 ">
              <div className="  p-6 rounded-[15px] space-y-3 bg-white">
                {currentStep === 1 && (
                  <form
                    onSubmit={handleSubmit(createBookingData)}
                    className="space-y-3"
                  >
                    <>
                      <p className="font-semibold pb-2">When & where</p>

                      {/* Pickup */}
                      <div className="relative hidden">
                        <label className=" mb-1 block">Pickup location</label>
                        <input
                          {...register("car")}
                          type="hidden"
                          className="w-full pl-12 p-4 rounded-3xl border border-[#C3C9D3]"
                          placeholder="car"
                          value={bookingStorage?.car || selectedCars?._id}
                        />

                        <p className="text-red-500 text-sm">
                          {errors.car?.message}
                        </p>
                      </div>
                      <div className="relative">
                        <label className=" mb-1 block">Pickup location</label>
                        <input
                          {...register("pickupLocation")}
                          type="text"
                          className="w-full pl-12 p-4 rounded-3xl border border-[#C3C9D3]"
                          placeholder="Pickup location"
                        />
                        <img
                          src="/Map.svg"
                          alt=""
                          className="absolute left-4 top-14 transform -translate-y-1/2"
                        />
                        <p className="text-red-500 text-sm">
                          {errors.pickupLocation?.message}
                        </p>
                      </div>

                      {/* Return */}
                      <div className="relative">
                        <label className=" mb-1 block">Return location</label>
                        <input
                          {...register("returnLocation")}
                          type="text"
                          className="w-full pl-12 p-4  rounded-3xl border border-[#C3C9D3]"
                          placeholder="Return location"
                        />
                        <img
                          src="/Map.svg"
                          alt=""
                          className="absolute left-4 top-14 transform -translate-y-1/2"
                        />
                        <p className="text-red-500 text-sm">
                          {errors.returnLocation?.message}
                        </p>
                      </div>

                      {/* pick-up Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className=" mb-2 block">Pickup date</label>
                          <input
                            {...register("pickupDate")}
                            type="date"
                            className="w-full  lg:pr-50 p-4 rounded-3xl border border-[#C3C9D3]"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.pickupDate?.message}
                          </p>
                        </div>

                        <div>
                          <label className=" mb-2 block">Pickup time</label>
                          <input
                            {...register("pickupTime")}
                            type="time"
                            className="w-full p-4  lg:pr-50 rounded-3xl border border-[#C3C9D3]"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.pickupTime?.message}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className=" mb-2 block">Return date</label>
                          <input
                            {...register("returnDate")}
                            type="date"
                            className="w-full p-4 lg:pr-50  rounded-3xl border border-[#C3C9D3]"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.returnDate?.message}
                          </p>
                        </div>

                        <div>
                          <label className=" mb-2 block">Return time</label>
                          <input
                            {...register("returnTime")}
                            type="time"
                            className="w-full p-4 lg:pr-50  rounded-3xl border border-[#C3C9D3]"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.returnTime?.message}
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center w-full mb-2 md:col-span-2">
                          <div className="flex flex-col items-start flex-1">
                            <p className="text-[16px]">
                              Add a professional driver
                            </p>

                            <p className="text-[#A1A1A1] text-[16px]">
                              +$25/day vetted, English-speaking
                            </p>
                          </div>
                          <Controller
                            name="driverOption"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Switch
                                id="driverOption"
                                checked={value}
                                onCheckedChange={onChange}
                                className="mt-3 md:mt-0 data-checked:bg-[#fa7315] data-unchecked:bg-gray-800"
                              />
                            )}
                          />
                        </div>
                      </div>
                      {currentStep === 1 && (
                        <div className="flex justify-end mt-6">
                          <Button
                            type="submit"
                            className="w-37.5 text-center  bg-[#fa7315] rounded-full text-white p-2"
                            disabled={bookDataMutation.isPending}
                          >
                            {bookDataMutation.isPending ? (
                              "Processing..."
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                Continue
                                <img src="/arrow.svg" alt="" />
                              </div>
                            )}
                          </Button>
                        </div>
                      )}
                    </>
                  </form>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <p>Payment method</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
                        <div
                          onClick={() => setPaymentMethod("card")}
                          className={`items-center gap-2 border-2 border-gray-300 hover:border-[#fa7315] p-4 rounded-2xl cursor-pointer leading-7  transition-colors  ${
                            paymentMethod === "card"
                              ? "bg-[#FFF8F0] border-[#fa7315]"
                              : "bg-white border-gray-300 hover:bg-[#FFF8F0] hover:border-[#fa7315]"
                          }  `}
                        >
                          <img src="/Calendar Minimalistic.svg" alt="" />
                          <p>Card</p>
                          <p>Visa, Master card, Verve</p>
                        </div>

                        <div
                          onClick={() => setPaymentMethod("paystack")}
                          className={`items-center gap-2 border-2 p-4 rounded-2xl cursor-pointer leading-7 transition-colors
                                 ${
                                   paymentMethod === "paystack"
                                     ? "bg-[#FFF8F0] border-[#fa7315]"
                                     : "bg-white border-gray-300 hover:bg-[#FFF8F0] hover:border-[#fa7315]"
                                 }
                              `}
                        >
                          <img src="/flash.svg" alt="" />
                          <p>Paystack</p>
                          <p>Pay with bank, USSD or transfer</p>
                        </div>
                      </div>

                      {paymentMethod === "paystack" && (
                        <div className="mt-5 bg-[#F4F0EC] rounded-2xl p-5">
                          <div className="flex items-start gap-3 mb-5 ">
                            <img
                              src="/paystack.svg"
                              alt="Paystack"
                              className="w-10 h-10"
                            />

                            <div>
                              <p className="text-[16px]">Paystack Checkout</p>
                              <p className="text-sm text-gray-500">
                                You’ll be redirected to Paystack to complete
                                payment securely
                              </p>
                            </div>
                          </div>

                          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 leading-7">
                            <li>
                              Pay with debit card, bank transfer, USSD or mobile
                              money
                            </li>
                            <li>Instant confirmation back to miles</li>
                            <li>Refund processed within 3-5 working days</li>
                          </ul>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-5 ">
                        <img src="/Lock.svg" alt="" />
                        <span>
                          Encrypted & PCI-compliant. We never store your full
                          card number
                        </span>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="mt-5 bg-[#FDF8F3] border-2 border-[#fa7315] rounded-2xl p-6 ">
                          <div className="flex items-start gap-4 mb-5">
                            <div className=" rounded-2xl">
                              <img
                                src="/bank.svg"
                                alt=""
                                className=" w-15 h-8 mx-auto  lg:w-8 lg:h-8"
                              />
                            </div>

                            <div>
                              <p className="text-lg lg:text-xl font-semibold text-[#1E1E1E]">
                                Pay directly to our bank
                              </p>

                              <p className="text-sm lg:text-base text-gray-600 mt-1 leading-7">
                                After making payment, kindly send your payment
                                receipt to our email for confirmation and we’ll
                                proceed with your ride booking.
                              </p>
                            </div>
                          </div>

                          <hr className="border-[#E5D8CC]" />

                          <div className="mt-5">
                            <p className="text-sm font-semibold text-gray-500  tracking-wide">
                              BANK DETAILS
                            </p>

                            <div className="mt-4 space-y-3 text-gray-500">
                              <div className="flex justify-between items-center">
                                <span className="">Bank Name:</span>
                                <span className="font-medium text-right">
                                  BANK OF LAGOS
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500 ">
                                  Account Name:
                                </span>
                                <span className="font-medium text-right">
                                  MILES CAR RENTAL
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">
                                  Account Number:
                                </span>
                                <span className="font-semibold text-lg tracking-wide">
                                  1234567890
                                </span>
                              </div>
                            </div>
                          </div>

                          <hr className="mt-5 border-[#E5D8CC]" />

                          <p className="mt-4 text-sm text-gray-600">
                            Made payment?{" "}
                            <span className="font-semibold text-[#fa7315] cursor-pointer hover:underline">
                              Message us now
                            </span>
                          </p>

                          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("paystack")}
                              className="  w-full sm:w-auto  rounded-full  border border-[#D6D6D6]  bg-white  px-6 py-3  text-gray-700   hover:border-[#fa7315]"
                            >
                              Back
                            </button>

                            <button className=" w-full sm:w-auto bg-[#e56710] hover:bg-[#e4a375] text-white rounded-full   px-6 py-3   flex items-center justify-center gap-2">
                              Proceed to confirmation
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 3 ||
                  (step === "3" && (
                    <div className="space-y-6 bg-white rounded-lg ">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg">
                        {/* IMAGE */}
                        <div className="rounded-lg flex justify-center shrink-0 w-full sm:w-auto">
                          <img
                            src={selectedCars?.images[0]?.url || ""}
                            alt={selectedCars?.modelName}
                            className=" border-4 border-gray-100 rounded-2xl  w-full sm:w-51.25  h-55 sm:h-29.75   object-cover  "
                          />
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col justify-center space-y-1 w-full">
                          <p className="text-[#9CA3AF] text-sm sm:text-[20px]">
                            {selectedCars?.category}
                          </p>

                          <h2 className="text-2xl sm:text-[32px] font-extrabold leading-tight">
                            {selectedCars?.modelName}
                          </h2>

                          <h1 className="text-[20px] font-semibold text-[#9CA3AF]">
                            <h1 className="text-[20px] font-semibold text-[#9CA3AF]">
                              {totalDays} days •{" "}
                              {bookingStorage?.driverOption
                                ? "With Driver"
                                : "Self Drive"}
                            </h1>
                          </h1>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="gap-3 border border-gray-300 p-4 rounded-2xl ">
                          <div>
                            <img src="/Map.svg" alt="" className="w-5 h-5 " />
                            <p className="text-sm font-medium">
                              {bookingStorage?.pickupLocation}
                            </p>
                            <p className="text-xs text-gray-500">
                              {bookingStorage?.pickupDate},{" "}
                              {bookingStorage?.pickupTime}
                            </p>
                          </div>
                        </div>

                        <div className=" gap-3 border border-gray-300 p-4 rounded-2xl">
                          <div>
                            <img src="/Map.svg" alt="" className="w-5 h-5" />
                            <p className="text-sm font-medium">
                              {bookingStorage?.returnLocation}
                            </p>
                            <p className="text-xs text-gray-500">
                              {bookingStorage?.returnDate},{" "}
                              {bookingStorage?.returnTime}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr className=" border-gray-300 " />

                      <div>
                        <div className="flex items-center gap-2  ">
                          <img src="/shine.svg" alt="" />
                          <p>What’s next</p>
                        </div>
                        <ul className="list-decimal list-inside space-y-1 mt-3  text-[#4B5563] ">
                          <li>
                            A concierge will call you within 30 minutes to
                            confirm pickup details
                          </li>
                          <li>
                            Bring your driver’s licence and a valid ID at pickup
                          </li>
                          <li>
                            Free cancellation until 24 hours before 2026-04-23.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                <div className="flex justify-between items-center mt-6">
                  {/* BACK BUTTON (unchanged) */}
                  {currentStep > 1 &&
                  currentStep < 3 &&
                  paymentMethod !== "card" ? (
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="rounded-full px-3 py-3 border-[#C3C9D3] text-gray-500 lg:px-10 lg:py-5"
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep === 2 && paymentMethod !== "card" && (
                    <Button
                      type="button"
                      onClick={handlePaystack}
                      className="w-50 bg-[#fa7315] rounded-full text-white p-2"
                      disabled={paymentDataMutation.isPending}
                    >
                      {paymentDataMutation.isPending ? (
                        "Processing..."
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Pay with Paystack
                          <img src="/arrow.svg" alt="" />
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right part */}
            <div className="col-span-12 md:col-span-4">
              {currentStep < 3 && (
                <div className=" bg-white rounded-[15px] min-h-159.25 overflow-y-auto lg:p-3 ">
                  <div className="p-4 md:sticky md:top-20 space-y-5 lg:space-y-3">
                    <div className="bg-gray-100 rounded-xl p-2">
                      <img
                        src={selectedCars?.images[0]?.url || ""}
                        alt={selectedCars?.modelName}
                        className="w-full  object-contain rounded-lg "
                      />
                    </div>

                    <div className=" space-y-3">
                      <p className="text-[#4B5563] text-[14px] pt-2">
                        {selectedCars?.category}
                      </p>
                      <h2 className="text-2xl lg:text-[28px] font-extrabold">
                        {selectedCars?.modelName}
                      </h2>
                      <hr className="border-[#A1A1A1]" />
                    </div>

                    <div className="relative ">
                      <p className="text-[16px] pl-7 text-[#232323] font-400 ">
                        {bookingStorage?.pickupLocation ||
                          watchPickUpLocation ||
                          "Pickup location not set"}
                      </p>
                      <img
                        src="/Map.svg"
                        alt=""
                        className="absolute  top-3 transform -translate-y-1/2"
                      />
                    </div>
                    <div className="relative">
                      <p className="text-[16px]  text-[#232323] font-400  pl-7">
                        {bookingStorage?.pickupDate || watchPickUpDate || "N/A"}{" "}
                        -{" "}
                        {bookingStorage?.returnDate || watchReturnDate || "N/A"}
                      </p>
                      <img
                        src="/Calendar Minimalistic.svg"
                        alt=""
                        className="absolute  top-3 transform -translate-y-1/2"
                      />
                    </div>

                    <hr className="border-[#A1A1A1]" />

                    <div className="flex justify-between  text-[16px]  ">
                      <span className="text-[#A1A1A1] ">
                        ₦{rentalCost.toLocaleString()} × {totalDays} days
                      </span>
                      <span className="font-medium ">
                        ₦{rentalCost.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-[16px]">
                      <span className="text-[#A1A1A1] ">Service fee</span>
                      <span>₦{serviceFee.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-[16px]">
                      <span className="text-[#A1A1A1] ">Driver fee</span>
                      <span>₦{driverFee.toLocaleString()}</span>
                    </div>

                    <hr className="border-[#A1A1A1]" />

                    <div className="flex justify-between ">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>

                    <p className="text-xs text-gray-400">
                      ○ Free cancellation up to 24h before pickup
                    </p>
                  </div>
                </div>
              )}

              {/* final part step 3 */}
              {currentStep === 3 && bookingStorage?.car && (
                <div className="bg-white p-6 rounded-2xl space-y-4 min-h-141.5">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to="/cars/carlisting"
                      className="text-center  text-gray-500 "
                    >
                      Browse more cars
                    </Link>
                    <img src="/Arrow-Right.svg" alt="" />
                  </div>

                  <div className="flex items-center justify-center gap-1 ">
                    <img src="/calender2.svg" alt="" />
                    <p className=" sm:text-[20px] md:text-[13px] lg:text-[20px] text-gray-500">
                      Manage from “My bookings”
                    </p>
                  </div>

                  <div>
                    <p className="text-[20px] text-semibold text-gray-400">
                      TOTAL PAID
                    </p>
                    <p className="text-[45px]  py-6">
                      ₦{total.toLocaleString()}
                    </p>
                    <hr className="border-[#A1A1A1]" />
                  </div>

                  <div className="space-y-5 pt-3  ">
                    <div className="flex justify-between">
                      <span className="text-[#A1A1A1] ">
                        ₦{selectedCars?.pricePerDay} × {totalDays} days
                      </span>
                      <span className="font-medium ">
                        ₦{rentalCost.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-[16px]  ">
                      <span className="text-[#A1A1A1]">Service fee</span>
                      <span className="text-[#232323]">
                        ₦{serviceFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-[16px]">
                      <span className=" text-[#A1A1A1]">Driver fee</span>
                      <span className="text-[#232323]">
                        ₦{driverFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 pt-3">
                    <button className=" text-black py-2 rounded-full  flex items-center justify-center gap-2  border border-[#C3C9D3]">
                      <img
                        src="/call.svg"
                        className="h-5 w-5 filter brightness-0"
                        alt=""
                      />
                      Contact concierge
                    </button>

                    <button className="border py-2 flex items-center justify-center gap-2 rounded-full text-white bg-[#fa7315]">
                      <Link
                        to={`/booking-details/${localStorage.getItem("bookingId")}`}
                        className="flex items-center gap-2"
                      >
                        View Booking
                        <img src="/arrow.svg" alt="" />
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
