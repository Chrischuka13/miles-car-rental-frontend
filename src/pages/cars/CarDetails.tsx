import { ArrowLeft, EqualNot, Fuel, UsersRound } from "lucide-react";
import { TrendingCars, WhatsIncluded } from "@/lib/constant";
import { Link, useNavigate, useParams } from "react-router";

export default function CarDetails() {
  const { id } = useParams();

  const selectedCars = TrendingCars.find((car) => car.id === Number(id));

  const navigate = useNavigate();

  if (!selectedCars) {
    return null;
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
              {<img
                src={selectedCars.image}
                alt=""
                className="rounded-2xl cursor-pointer object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-full"
              />}
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
            {/* parent div */}
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
                    <p className="font-medium">{selectedCars.consumption}</p>
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
                    <span className="flex items-center justify-between border-b border-[#8282825C]">
                      <h1>Engine</h1>
                      <p>3.5L V6</p>
                    </span>

                    <span className="flex items-center justify-between border-b border-[#8282825C]">
                      <h1>Top Speed</h1>
                      <p>230km/h</p>
                    </span>
                    <span className="flex items-center justify-between border-b border-[#8282825C]">
                      <h1>Mileage</h1>
                      <p>22km/L</p>
                    </span>
                    <span className="flex items-center justify-between border-b border-[#8282825C]">
                      <h1>BOOT</h1>
                      <p>454L</p>
                    </span>
                  </main>
                </div>
              </div>

              {/* second child div */}
              <div className="w-full lg:w-[30%]">
                <main className="bg-[#FFFFFF] pl-2  p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">${selectedCars.price}</p>
                    <p className="text-[#4B5563]">per day</p>
                  </div>
                  {/* pick up location */}
                  <div className="flex flex-col pl-2 py-4 bg-[#F4F0EC] mt-2 rounded-xl ">
                    <span className="uppercase text-xs text-[#666666]">
                      Pick up location
                    </span>
                    <span className="flex items-center justify-left gap-2 mt-2">
                      <img src="/Map.png" alt="" className="w-5 h-5" />
                      <p className="text-xs text-[#5E5E5E]">
                        {selectedCars.address}
                      </p>
                    </span>
                  </div>

                  {/* pickup date and return */}
                  <div className="grid grid-cols-2 gap-1 md:gap-2  pl-2 py-4  mt-2 rounded-xl w-full">
                    <div className="bg-[#F4F0EC] rounded-xl p-2">
                      <span className="uppercase text-xs text-[#666666]">
                        Pick up
                      </span>
                      <span className="flex flex-col">
                        <input type="date" name="" id="" />
                      </span>
                    </div>
                    <div className="bg-[#F4F0EC] rounded-xl p-2">
                      <span className="uppercase text-xs text-[#666666]">
                        Return
                      </span>
                      <span className="flex flex-col">
                        <input type="date" name="" id="" />
                      </span>
                    </div>
                  </div>

                  {/* duration of days and service fee */}
                  <hr className="mt-2" />
                  <div className="pb-5 py-5 text-[#4B5563]">
                    <span className="flex items-center justify-between">
                      <p>3 days</p>
                      <p>{selectedCars.price}</p>
                    </span>
                    <span className="flex items-center justify-between mt-2">
                      <p>Service Fee</p>
                      <p>{selectedCars.price}</p>
                    </span>
                  </div>
                  <hr />
                  <span className="flex items-center justify-between font-semibold mt-5">
                    <p className="text-lg">Total</p>
                    <p className="text-2xl lg:text-3xl">{selectedCars.price}</p>
                  </span>

                  {/* book now button */}
                  <div className="w-full bg-[#F97316] transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 rounded-full cursor-pointer flex items-center justify-center mt-4">
                    <button className="flex items-center justify-center text-white  px-4 py-2 gap-2 sm:w-auto">
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
                </main>
              </div>
            </div>
            {/* What included section*/}
            <section className="mt-6">
              <main className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-5">
                {WhatsIncluded.map((item) => (
                  <div className="flex items-center gap-2 py-4 px-2 bg-[#F4F0EC] rounded-xl">
                    <span>
                      <img src="/iconsCheck.png" alt="" />
                    </span>
                    <p className="text-lg md:text-base">{item.whatsIncluded}</p>
                  </div>
                ))}
              </main>
            </section>
          </main>
        </section>
        {/* trending cars section */}
        <section className="bg-[#FFFFFF] mt-5">
          <main className="w-11/12 container py-10 mx-auto">
            <p className="flex items-center text-xs gap-1 tracking-wide">
              <span className=" text-[#F97316]">●</span> Our diverse fleet for
              comfort and performance
            </p>
            {/* trending cars for the week display section */}
            <div>
              <span className="flex items-center justify-between mt-2">
                <h1 className="text-2sm sm:text-2xl lg:text-[45px]">
                  Trending <span className="text-[#F97316]">cars</span> for The
                  Week
                </h1>
                <Link to="/cars/carlisting" className="flex items-center gap-1 lg:gap-3 cursor-pointer">
                  <p className="text-xs text-[#F97316] sm:text-base lg:text-base">
                    Explore full fleet
                  </p>
                  <img
                    src="/arrowRight.png"
                    alt=""
                    className="w-5 md:w-6 lg:w-base"
                  />
                </Link>
              </span>
            </div>

            {/* the cars to be displayed */}
            <section className="mt-10">
              {/* Added gap and adjusted grid cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* each grid boxes for each car */}
                {/* one */}
                {TrendingCars.slice(0,3).map((cars) => (
                  <div
                    className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden"
                    key={cars.id}
                  >
                    {/* box for the image */}
                    <div className="relative w-full h-50">
                      {<img
                        src={cars.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />}
                      <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                        {cars.carValue}
                      </p>
                    </div>
                    {/* box for vehicle description */}
                    <div className="bg-[#FFFFFF] w-full px-5 py-4">
                      <span className="flex items-center justify-between">
                        <p className="text-[#A1A1A1] text-xs uppercase">
                          {cars.carType}
                        </p>
                        <p className="text-lg font-bold">${cars.price}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <h2 className="font-bold text-xl">{cars.name}</h2>{" "}
                        <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                      </span>
                      <hr className="mt-4 text-[#E6E0E0]" />
                      <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                        {/* features */}
                        <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                          <span className="flex items-center gap-1">
                            <UsersRound className="w-4" />
                            <p className="text-sm">{cars.seats}</p>
                          </span>
                          <span className="flex items-center gap-1">
                            <Fuel className="w-4" />
                            <p className="text-sm">{cars.consumption}</p>
                          </span>
                          <span className="flex items-center gap-1">
                            <EqualNot className="w-4" />
                            <p className="text-sm">{cars.transmission}</p>
                          </span>
                        </div>
                        {/* button */}
                        <Link
                           to={`/cars/cardetails/${cars.id}`}
                          className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 rounded-full text-center font-medium"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>
        </section>
      </section>
    </>
  );
}
