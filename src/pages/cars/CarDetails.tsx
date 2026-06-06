import { useState, useMemo } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import TrendingCars from "@/features/TrendingCars";
import { useQuery } from "@tanstack/react-query";
import { getCarBySlug } from "@/api/cars/cars";
import {
  validateCarBookingSchema1,
  // type BookingForm,
  type CarBookingFormData1,
} from "@/lib/schemaTypes";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LazyLoadImageRC from "@/components/ui/lazyLoadImage";

interface Car {
  _id: string;
  brand: string;
  description: string;
  category: string;
  modelName: string;
  year: number;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: string;
  rating: number;
  tripsCount: number;
  address?: string;
  tags: string[];
  features: string[];
  images: { url: string; public_id: string }[];
  carSpecs: {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot: string;
  };
  slug: string;
}

export default function CarDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["car", slug],
    queryFn: () => getCarBySlug(slug as string),
    enabled: !!slug,
  });

   import.meta.env.DEV && console.log(data);

  const selectedCars: Car | undefined = data?.data;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CarBookingFormData1>({
    resolver: zodResolver(validateCarBookingSchema1) as never,
  });

  const SERVICE_FEE = 10000;
  const pickupDate = useWatch({ control, name: "pickupDate" });
  const returnDate = useWatch({ control, name: "returnDate" });
  const pickupLocation = useWatch({ control, name: "pickupLocation" });

  const { totalDays, rentalCost, totalPrice } = useMemo(() => {
    const pricePerDayInNaira = selectedCars?.pricePerDay || 0;
    if (!pickupDate || !returnDate || !selectedCars) {
      return {
        totalDays: 1,
        rentalCost: pricePerDayInNaira,
        totalPrice: pricePerDayInNaira + SERVICE_FEE,
      };
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const finalDays = diffDays > 0 ? diffDays : 1;

    const rentalCost = finalDays * pricePerDayInNaira;

    return {
      totalDays: finalDays,
      rentalCost,
      totalPrice: rentalCost + SERVICE_FEE,
    };
  }, [pickupDate, returnDate, selectedCars]);

  // const handleBooking = (data: CarBookingFormData1) => {
  const handleBooking = () => {
    if (!selectedCars) {
      return;
    }

    const bookingData = {
      carId: selectedCars._id,
      car: selectedCars,
      pickupLocation,
      pickupDate,
      returnDate,
      totalDays,
      rentalCost,
      serviceFee: SERVICE_FEE,
      totalPrice,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    navigate(`/booking/${selectedCars.slug}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin w-4 h-4 text-DeepOrange" />
      </div>
    );
  }

  if (!selectedCars) {
    return <p className="text-center mt-10">Car not found</p>;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col bg-[#F6F6F6] px-2">
        {/* back to fleet navigation */}
        <div
          className=" w-11/12 container mx-auto flex items-center gap-3 sm:gap-3 mt-8 sm:mt-6 lg:mt-10 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-[#1C274C] w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[#9CA3AF] text-sm sm:text-base cursor-pointer">
            Back to fleet
          </span>
        </div>
        <div className="bg-[#ffffff] container mx-auto mt-8 px-2 md:px-4 rounded-2xl">
          {/* content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 py-3 lg:py-8 ">
            {/* first box */}
            <div className="w-full lg:w-[55%]">
              <div className="w-full overflow-hidden rounded-2xl bg-[#F4F0EC]">
                <LazyLoadImageRC
                  src={selectedCars.images?.[0]?.url || "/placeholder.png"}
                  alt={selectedCars.modelName}
                  width="100%"
                  height="100%"
                  className="rounded-2xl cursor-pointer object-fit w-full h-55 sm:h-70 md:h-80 lg:h-92.5 xl:h-112.5"
                />
              </div>

              {/* car thumbnail */}
              <div className="flex items-center justify-between gap-2 md:gap-3 w-full mt-2 overflow-x-auto no-scrollbar">
                <img
                  src={selectedCars.images?.[0]?.url || "/placeholder.png"}
                  alt={selectedCars.modelName}
                  onClick={() =>
                    setOpenImage(selectedCars.images?.[0]?.url || "")
                  }
                  className="w-[120px] sm:w-[140px] md:w-[150px] h-[80px] shrink-0 object-cover rounded-lg border border-gray-200 cursor-pointer p-1 bg-[#F6F6F6]"
                />

                <img
                  src={selectedCars.images?.[1]?.url || "/placeholder.png"}
                  alt={selectedCars.modelName}
                  onClick={() =>
                    setOpenImage(selectedCars.images?.[1]?.url || "")
                  }
                  className="w-[120px] sm:w-[140px] md:w-[150px] h-[80px] flex-shrink-0 object-cover rounded-lg border border-gray-200 cursor-pointer p-1 bg-[#F6F6F6]"
                />

                <img
                  src={selectedCars.images?.[2]?.url || "/placeholder.png"}
                  alt={selectedCars.modelName}
                  onClick={() =>
                    setOpenImage(selectedCars.images?.[2]?.url || "")
                  }
                  className="w-[120px] sm:w-[140px] md:w-[150px] h-[80px] flex-shrink-0 object-cover rounded-lg border border-gray-200 cursor-pointer p-1 bg-[#F6F6F6]"
                />

                <img
                  src={selectedCars.images?.[3]?.url || "/placeholder.png"}
                  alt={selectedCars.modelName}
                  onClick={() =>
                    setOpenImage(selectedCars.images?.[3]?.url || "")
                  }
                  className="w-[120px] sm:w-[140px] md:w-[150px] h-[80px] flex-shrink-0 object-cover rounded-lg border border-gray-200 cursor-pointer p-1 bg-[#F6F6F6]"
                />
              </div>
            </div>

            {/* second box */}
            <div className="flex flex-col w-full lg:w-[45%]">
              <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                {selectedCars.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm uppercase"
                  >
                    {tag}
                  </p>
                ))}
              </span>

              <span className="mt-4">
                <p className="text-[#F97316] font-bold text-xs sm:text-sm uppercase">
                  {selectedCars.fuelType} · {selectedCars.year}
                </p>

                <h1 className="py-1 font-semibold text-xl sm:text-2xl lg:text-3xl uppercase">
                  {selectedCars.brand} {selectedCars.modelName}
                </h1>

                {/* star rating */}
                <div className="flex items-center justify-start gap-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src="/star.svg" alt="" className="h-5 w-5" />
                    ))}
                  </div>
                  <p>
                    {selectedCars.rating} · {selectedCars.tripsCount} trips
                  </p>
                </div>

                <p className="text-[#505050] py-2 text-sm sm:text-base leading-relaxed">
                  {selectedCars.description}
                </p>

                <span className="flex items-baseline gap-2 sm:gap-4 max-w-md w-full text-[#4B5563]">
                  <p className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black">
                    ₦{selectedCars.pricePerDay.toLocaleString()}
                  </p>
                  <span className="text-sm sm:text-base">
                    /day. all-inclusive
                  </span>
                </span>
              </span>
              <span className="lg:flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mt-5 w-full ">
                <Link to={`/booking/${selectedCars.slug}`}>
                  <button
                    disabled={!selectedCars}
                    className="flex items-center justify-center bg-DeepOrange transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 text-white rounded-full px-4 py-2 gap-2 w-full sm:w-auto cursor-pointer mb-3"
                  >
                    <p className="text-sm sm:text-base">Book this car</p>
                    <span>
                      <img
                        src="/stasharrow.png"
                        alt=""
                        className="w-4 sm:w-6"
                      />
                    </span>
                  </button>
                </Link>

                <button className="border border-[#4B5563] px-4 py-2 rounded-full w-full sm:w-auto text-sm sm:text-base cursor-pointer">
                  <p>Add a driver</p>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* at a glance section */}
        <section className="bg-[#FCFAF8] mt-10">
          <main className="w-11/12 container py-10 mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px]">At a glance</h1>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* first child div */}
              <div className="w-full lg:w-[70%]">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4 uppercase">
                  <span className="flex flex-col items-start justify-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm ">
                    <img
                      src="/Vector.png"
                      alt="vector logo"
                      className="w-6 sm:w-fit mt-1"
                    />
                    <p className="uppercase text-sm sm:text-base text-[#111827]">
                      Seats
                    </p>
                    <p className="font-medium">{selectedCars.seats}</p>
                  </span>

                  <span className="flex flex-col items-start justify-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img
                      src="/transmission.png"
                      alt="vector logo"
                      className="w-6 sm:w-fit"
                    />
                    <p className="uppercase text-sm sm:text-base text-[#111827]">
                      Trans
                    </p>
                    <p className="font-medium">{selectedCars.transmission}</p>
                  </span>

                  <span className="flex flex-col items-start justify-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img
                      src="/gas.png"
                      alt="vector logo"
                      className="w-6 sm:w-fit"
                    />
                    <p className="uppercase text-sm sm:text-base text-[#111827]">
                      Fuel
                    </p>
                    <p className="font-medium">{selectedCars.fuelType}</p>
                  </span>

                  <span className="flex flex-col items-start justify-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img
                      src="/calender.png"
                      alt="vector logo"
                      className="w-6 sm:w-fit"
                    />
                    <p className="uppercase text-sm sm:text-base text-[#111827]">
                      Year
                    </p>
                    <p className="font-medium">{selectedCars.year}</p>
                  </span>
                </div>

                {/* specification */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-[32px] mt-7">
                    Specifications
                  </h1>

                  <main className="bg-[#111827] grid grid-cols-1 sm:grid-cols-2 gap-10 rounded-xl p-4 mt-5 text-[#ffffff]">
                    <span className="flex justify-between border-b">
                      <h1>Engine</h1>
                      <p>{selectedCars.carSpecs?.engine}</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>Top Speed</h1>
                      <p>{selectedCars.carSpecs?.topSpeed}</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>Mileage</h1>
                      <p>{selectedCars.carSpecs?.mileage}</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>BOOT</h1>
                      <p>{selectedCars.carSpecs?.boot}</p>
                    </span>
                  </main>
                </div>
              </div>

              {/* second child div */}
              <div className="w-full lg:w-[30%]">
                <form
                  onSubmit={handleSubmit(handleBooking)}
                  className="bg-[#FFFFFF] pl-2  p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">
                      ₦{selectedCars.pricePerDay.toLocaleString()}
                    </p>
                    <p className="text-[#4B5563]">per day</p>
                  </div>

                  {/* pick up location */}
                  <div className="flex flex-col pl-2 py-4 bg-[#F4F0EC] mt-2 rounded-xl ">
                    <span className="uppercase text-xs text-[#666666]">
                      Pick up location
                    </span>

                    <span className="flex items-center justify-left gap-2 mt-2">
                      <img src="/Map.png" alt="" className="w-5 h-5" />

                      <input
                        className="outline-none border-none text-sm"
                        type="text"
                        placeholder="Please Enter Address..."
                        {...register("pickupLocation")}
                      />
                    </span>
                  </div>
                  {errors?.pickupLocation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pickupLocation?.message}
                    </p>
                  )}

                  {/* pickup date and return */}
                  <div className="grid grid-cols-2 gap-1 md:gap-2  pl-2 py-4  mt-2 rounded-xl w-full">
                    <div className=" ">
                      <div className="bg-[#F4F0EC] rounded-xl p-2">
                        <span className="uppercase text-xs text-[#666666]">
                          Pick up
                        </span>
                        <span className="flex flex-col">
                          <input
                            type="date"
                            {...register("pickupDate")}
                            name="pickupDate"
                          />
                        </span>
                      </div>
                      {errors.pickupDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pickupDate?.message}
                        </p>
                      )}
                    </div>

                    <div className="">
                      <div className="bg-[#F4F0EC] rounded-xl p-2">
                        <span className="uppercase text-xs text-[#666666]">
                          Return
                        </span>
                        <span className="flex flex-col">
                          <input
                            type="date"
                            {...register("returnDate")}
                            name="returnDate"
                          />
                        </span>
                      </div>

                      {errors.returnDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.returnDate?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* duration of days and service fee */}
                  <hr className="mt-2" />

                  <div className="pb-5 py-5 text-[#4B5563]">
                    <span className="flex items-center justify-between">
                      <p>
                        {totalDays} {totalDays > 1 ? "days" : "day"}
                      </p>
                      <p>₦{rentalCost.toLocaleString()}</p>
                    </span>

                    <span className="flex items-center justify-between mt-2">
                      <p>Service Fee</p>
                      <p>₦{SERVICE_FEE.toLocaleString()}</p>
                    </span>
                  </div>

                  <hr />

                  <span className="flex items-center justify-between font-semibold mt-5">
                    <p className="text-lg">Total</p>
                    <p className="text-2xl lg:text-3xl">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </span>

                  {/* book now button */}
                  <div className="w-full bg-DeepOrange transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 rounded-full cursor-pointer flex items-center justify-center mt-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center text-white  px-4 py-2 gap-2 sm:w-auto"
                    >
                      <p className="text-sm sm:text-base w-full">
                        Book this car
                      </p>
                      <span>
                        <img src="/stasharrow.png" alt="" className="w-8" />
                      </span>
                    </button>
                  </div>

                  <span className="flex items-center justify-center py-3 text-[#A1A1A1] gap-5">
                    <img src="/shield.png"></img>{" "}
                    <p>Free cancellation up to 24h</p>
                  </span>
                </form>
              </div>
            </div>

            {/* What included */}
            <section className="mt-10">
              <main className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-5">
                {selectedCars.features?.map((features, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-4 px-2 bg-[#F4F0EC] rounded-xl"
                  >
                    <img src="/iconsCheck.png" alt="" />
                    <p>{features}</p>
                  </div>
                ))}
              </main>
            </section>
          </main>
        </section>

        <TrendingCars />
      </section>
      {openImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpenImage(null)}
        >
          <div className="relative">
            <img
              src={openImage}
              alt="preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />

            <button
              onClick={() => setOpenImage(null)}
              className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}