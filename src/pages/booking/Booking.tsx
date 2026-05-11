import { useMemo, useState } from "react";
import Stepper from "@/components/booking/Stepper";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Success from "@/components/booking/Success";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateBookingSchema, type BookingForm } from "@/lib/schemaTypes";

export default function Booking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(validateBookingSchema),
    defaultValues: {
      driverOption: false,
    },
  });

  const vehicles = [
    {
      id: 1,
      name: "Lexus ES",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
      location: "Lekki, Lagos",
      trip: {
        startDate: "2026-04-23",
        endDate: "2026-04-29",
        pricePerDay: 49,
        days: 6,
      },
      fees: {
        service: 15,
        driver: 10,
      },
    },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [addDriver, setAddDriver] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paystack");

  const [currentStep, setCurrentStep] = useState(1);
  const totalDaysPrice = useMemo(() => {
    return selectedVehicle.trip.pricePerDay * selectedVehicle.trip.days;
  }, [selectedVehicle]);

  const driverFee = useMemo(() => {
    return addDriver ? 25 * selectedVehicle.trip.days : 0;
  }, [addDriver, selectedVehicle]);

  const total = useMemo(() => {
    return (
      totalDaysPrice +
      selectedVehicle.fees.service +
      selectedVehicle.fees.driver +
      driverFee
    );
  }, [totalDaysPrice, driverFee, selectedVehicle]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  // const totalDaysPrice =
  //   selectedVehicle?.trip.pricePerDay * selectedVehicle?.trip.days;
  // const driverFee = addDriver ? 25 * selectedVehicle?.trip.days : 0;

  // const total =
  //   totalDaysPrice +
  //   selectedVehicle?.fees.service +
  //   selectedVehicle?.fees.driver +
  //   driverFee;

  // const onFormSubmit = (data) => {
  //   console.log(data);
  // };

  const onFormSubmit = (data: BookingForm) => {
    console.log("SUCCESS:", data);
    // setCurrentStep(2);
  };

  const onError = (errors: never) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <>
      <main className="pt-20 px-4 pb-20 bg-[#F5F5F5] flex items-center justify-center lg:block min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 space-y-3">
            {currentStep < 3 && (
              <p className="text-sm text-gray-500 pt-5">&lt; Back to sign in</p>
            )}

            <h1 className="text-[#111827] text-2xl ">
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
                  <form onSubmit={handleSubmit(onFormSubmit, onError)}>
                    <>
                      <p className="font-semibold">When & where</p>

                      {/* Pickup */}
                      <div className="relative hidden">
                        <label className=" mb-1 block">Pickup location</label>
                        <input
                          {...register("car")}
                          type="hidden"
                          className="w-full pl-12 p-4 rounded-3xl border border-[#C3C9D3]"
                          placeholder="car"
                          value={vehicles[0].id}
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
                        </div>
                      </div>
                      {currentStep === 1 && (
                        <div className="flex justify-end mt-6">
                          <Button
                            type="submit"
                            className="flex items-center justify-end gap-2 bg-[#fa7315] rounded-full text-white py-5 lg:py-6 px-4"
                          >
                            Continue
                            <img src="/arrow.svg" alt="" />
                          </Button>
                        </div>
                      )}
                    </>
                  </form>
                )}
                {/* <Switch
                            checked={addDriver}
                            onCheckedChange={setAddDriver}
                            className="mt-3 md:mt-0  data-checked:bg-[#fa7315] data-unchecked:bg-gray-300"
                          /> */}

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
                          <p>card</p>
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

                {currentStep === 3 && (
                  <div className="space-y-6 bg-white rounded-lg ">
                    {vehicles.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg"
                      >
                        {/* IMAGE */}
                        <div className="rounded-lg flex justify-center shrink-0 w-full sm:w-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className=" border-4 border-gray-100 rounded-2xl  w-full sm:w-[205px]  h-[220px] sm:h-[119px]   object-cover  "
                          />
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col justify-center space-y-1 w-full">
                          <p className="text-[#9CA3AF] text-sm sm:text-[20px]">
                            VEHICLE
                          </p>

                          <h2 className="text-2xl sm:text-[32px] font-extrabold leading-tight">
                            {item.name}
                          </h2>

                          <h1 className="text-[20px] font-semibold text-[#9CA3AF]">
                            {item.trip.days} days . With Driver
                          </h1>
                        </div>
                      </div>
                    ))}

                    {vehicles.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="gap-3 border border-gray-300 p-4 rounded-2xl ">
                          <div>
                            <img src="/Map.svg" alt="" className="w-5 h-5 " />
                            <p className="text-sm font-medium">
                              {item.location}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.trip.startDate}
                            </p>
                          </div>
                        </div>

                        <div className=" gap-3 border border-gray-300 p-4 rounded-2xl">
                          <div>
                            <img src="/Map.svg" alt="" className="w-5 h-5" />
                            <p className="text-sm font-medium">
                              {item.location}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.trip.endDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr className=" border-gray-300 " />

                    <div>
                      <div className="flex items-center gap-2  ">
                        <img src="/shine.svg" alt="" />
                        <p>What’s next</p>
                      </div>
                      <ul className="list-decimal list-inside space-y-1 mt-3  text-[#4B5563] ">
                        <li>
                          A concierge will call you within 30 minutes to confirm
                          pickup details
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
                )}
                <div className="flex justify-between items-center mt-6">
                  {/* BACK BUTTON (unchanged) */}
                  {currentStep > 1 && paymentMethod !== "card" ? (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="rounded-full px-5 py-3 border-[#C3C9D3] text-gray-500 lg:px-10 lg:py-5"
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {/* RIGHT BUTTONS */}

                  {/* STEP 1 → SUBMIT FORM */}

                  {/* STEP 2 → MANUAL NAVIGATION */}
                  {currentStep === 2 && paymentMethod !== "card" && (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center justify-center gap-2 bg-[#fa7315] rounded-full text-white py-5 lg:py-6 px-4"
                    >
                      Pay with Paystack
                      <img src="/arrow.svg" alt="" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right part */}
            <div className="col-span-12 md:col-span-4">
              {currentStep < 3 && (
                <div className=" bg-white rounded-[15px] min-h-[637px] overflow-y-auto lg:p-3 ">
                  {vehicles.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="p-4 md:sticky md:top-20 space-y-5 lg:space-y-3"
                      >
                        <div className="bg-gray-100 rounded-xl p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full  object-contain rounded-lg "
                          />
                        </div>

                        <div className=" space-y-3">
                          <p className="text-[#4B5563] text-[14px] pt-2">
                            VEHICLE
                          </p>
                          <h2 className="text-[32px] font-extrabold">
                            {item.name}
                          </h2>
                          <hr className="border-[#A1A1A1]" />
                        </div>

                        <div className="relative ">
                          <p className="text-[16px] pl-7 text-[#232323] font-400 ">
                            {item.location}
                          </p>
                          <img
                            src="/Map.svg"
                            alt=""
                            className="absolute  top-3 transform -translate-y-1/2"
                          />
                        </div>
                        <div className="relative">
                          <p className="text-[16px]  text-[#232323] font-400  pl-7">
                            {item.trip.startDate} - {item.trip.endDate}
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
                            ${item.trip.pricePerDay} × {item.trip.days} days
                          </span>
                          <span className="font-medium ">
                            ${totalDaysPrice}
                          </span>
                        </div>

                        <div className="flex justify-between text-[16px]">
                          <span className="text-[#A1A1A1] ">Service fee</span>
                          <span>${item.fees.service}</span>
                        </div>

                        <div className="flex justify-between text-[16px]">
                          <span className="text-[#A1A1A1] ">Driver fee</span>
                          <span>${driverFee}</span>
                        </div>

                        <hr className="border-[#A1A1A1]" />

                        <div className="flex justify-between ">
                          <span>Total</span>
                          <span>${total}</span>
                        </div>

                        <p className="text-xs text-gray-400">
                          ○ Free cancellation up to 24h before pickup
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* final part step 4 */}
              {currentStep === 3 && selectedVehicle && (
                <div className="bg-white p-6 rounded-2xl space-y-4 min-h-[566px]">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-center  text-gray-500 ">
                      Browse more cars
                    </h2>
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
                    <p className="text-[45px]  py-6">${total}</p>
                    <hr className="border-[#A1A1A1]" />
                  </div>

                  <div className="space-y-5 pt-3  ">
                    <div className="flex justify-between">
                      <span className="text-[16px] text-[#A1A1A1] ">
                        ${selectedVehicle.trip.pricePerDay} ×{" "}
                        {selectedVehicle.trip.days} days
                      </span>
                      <span>${totalDaysPrice}</span>
                    </div>

                    <div className="flex justify-between text-[16px]  ">
                      <span className="text-[#A1A1A1]">Service fee</span>
                      <span className="text-[#232323]">
                        ${selectedVehicle.fees.service}
                      </span>
                    </div>

                    <div className="flex justify-between text-[16px]">
                      <span className=" text-[#A1A1A1]">Driver fee</span>
                      <span className="text-[#232323]">${driverFee}</span>
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

                    <button className="border py-2   flex items-center justify-center gap-2 rounded-full  text-white bg-[#fa7315]">
                      View Booking
                      <img src="/arrow.svg" alt="" />
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
