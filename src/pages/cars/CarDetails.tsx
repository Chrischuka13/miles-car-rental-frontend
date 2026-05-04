import { ArrowLeft } from "lucide-react";
import {
  TrendingCars as TrendingCarsData,
  WhatsIncluded,
  type CarProduct,
  type Included,
} from "@/lib/constant";
import { useNavigate, useParams } from "react-router";
import TrendingCars from "@/features/TrendingCars";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const selectedCars: CarProduct | undefined = TrendingCarsData.find(
    (car) => car.id === Number(id)
  );

  if (!selectedCars) {
    return <p className="text-center mt-10">Car not found</p>;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col bg-white">
        <div className="container mx-auto mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
          {/* back to fleet navigation */}
          <div className="flex items-center gap-3 sm:gap-5 mt-8 sm:mt-6 lg:mt-10 cursor-pointer">
            <ArrowLeft className="text-[#1C274C] w-5 h-5 sm:w-6 sm:h-6" />
            <span
              onClick={() => navigate(-1)}
              className="text-[#9CA3AF] text-sm sm:text-base cursor-pointer"
            >
              Back to fleet
            </span>
          </div>

          {/* content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mt-6 lg:mt-10 pb-10">
            {/* first box */}
            <div className="w-full lg:w-[55%]">
              <img
                src={selectedCars.image[0]} 
                alt={selectedCars.name}
                className="rounded-2xl cursor-pointer object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-full"
              />
            </div>

            {/* second box */}
            <div className="flex flex-col w-full lg:w-[45%]">
              <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  {selectedCars.carValue}
                </p>
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  Economy
                </p>
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  Best Seller
                </p>
              </span>

              <span className="mt-4">
                <p className="text-[#F97316] font-bold text-xs sm:text-sm uppercase">
                  {selectedCars.carType} · {selectedCars.year}
                </p>

                <h1 className="py-1 font-semibold text-xl sm:text-2xl lg:text-3xl uppercase">
                  {selectedCars.name}
                </h1>

                {/* star rating */}
                <div className="flex items-center justify-start gap-1">
                  <div className="flex items-center gap-1">
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                  </div>
                  <p>4.9 · 142 trips</p>
                </div>

                <p className="text-[#505050] py-2 text-sm sm:text-base leading-relaxed">
                  Reliable, fuel-efficient and effortless to drive across Lagos.
                  The Corolla is the workhorse for daily commutes, airport runs
                  and weekend getaways.
                </p>

                <span className="flex items-baseline gap-2 sm:gap-4 max-w-xs w-full text-[#4B5563]">
                  <p className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black">
                    ${selectedCars.price}
                  </p>
                  <span className="text-sm sm:text-base">
                    /day. all-inclusive
                  </span>
                </span>
              </span>

              <span className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-5 w-full">
                <button className="flex items-center justify-center bg-[#F97316] transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 text-white rounded-full px-4 py-2 gap-2 w-full sm:w-auto cursor-pointer">
                  <p className="text-sm sm:text-base">Book this car</p>
                  <span>
                    <img src="/stasharrow.png" alt="" className="w-4 sm:w-6" />
                  </span>
                </button>

                <button className="border border-[#4B5563] px-4 py-2 rounded-full w-full sm:w-auto text-sm sm:text-base cursor-pointer">
                  <p>Add a driver</p>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* at a glance section */}
        <section className="bg-[#FCFAF8]">
          <main className="w-11/12 container py-10 mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px]">
              At a glance
            </h1>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* first child div */}
              <div className="w-full lg:w-[70%]">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4 uppercase">
                  <span className="flex flex-col items-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm ">
                    <img src="/Vector.png" alt="" className="w-6 mt-1" />
                    <p className="text-sm">{selectedCars.seats}</p>
                  </span>

                  <span className="flex flex-col items-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img src="/transmission.png" alt="" className="w-6" />
                    <p className="text-sm">{selectedCars.transmission}</p>
                  </span>

                  <span className="flex flex-col items-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img src="/gas.png" alt="" className="w-6" />
                    <p className="text-sm">{selectedCars.consumption}</p>
                  </span>

                  <span className="flex flex-col items-start gap-1 bg-[#FFFFFF] p-2 rounded-xl shadow-sm">
                    <img src="/calender.png" alt="" className="w-6" />
                    <p className="text-sm">{selectedCars.year}</p>
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
                      <p>3.5L V6</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>Top Speed</h1>
                      <p>230km/h</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>Mileage</h1>
                      <p>22km/L</p>
                    </span>

                    <span className="flex justify-between border-b">
                      <h1>BOOT</h1>
                      <p>454L</p>
                    </span>
                  </main>
                </div>
              </div>

              {/* second child div */}
              <div className="w-full lg:w-[30%]">
                <main className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">${selectedCars.price}</p>
                    <p>per day</p>
                  </div>

                  <p className="mt-2">{selectedCars.address}</p>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="date" />
                    <input type="date" />
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <p>3 days</p>
                      <p>{selectedCars.price}</p>
                    </div>

                    <div className="flex justify-between mt-2">
                      <p>Service Fee</p>
                      <p>{selectedCars.price}</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 font-semibold">
                    <p>Total</p>
                    <p>{selectedCars.price}</p>
                  </div>

                  <button className="w-full bg-[#F97316] text-white mt-4 py-2 rounded-full">
                    Book now
                  </button>
                </main>
              </div>
            </div>

            {/* What included */}
            <section className="mt-6">
              <main className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-5">
                {WhatsIncluded.map((item: Included) => (
                  <div
                    key={item.whatsIncluded}
                    className="flex items-center gap-2 py-4 px-2 bg-[#F4F0EC] rounded-xl"
                  >
                    <img src="/iconsCheck.png" alt="" />
                    <p>{item.whatsIncluded}</p>
                  </div>
                ))}
              </main>
            </section>
          </main>
        </section>

        <TrendingCars />
      </section>
    </>
  );
}