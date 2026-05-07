import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";
import { getAllCars } from "@/api/cars/cars";
import { useQuery } from "@tanstack/react-query";

interface Car {
  _id: string;
  slug: string;
  brand: string;
  description: string;
  category: "LUXURY" | "SEDAN" | "SUV" | "TRUCK";
  modelName: string;
  year: number;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: "Auto" | "Manual" | "Hybrid";
  images: {
    url: string;
    public_id: string;
  }[];
  carSpecs: {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot: string;
  };
}

interface ApiResponse {
  count: number;
  data: Car[];
}

export default function Cars() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["cars"],
    queryFn: () => getAllCars(),
  });

  const cars = data?.data || [];
   console.log(data)

  const filteredCars = useMemo(() => {
    let filtered =
      activeCategory === "ALL"
        ? cars
        : cars.filter((car) => car.category === activeCategory);

    if (searchTerm.trim()) {
      filtered = filtered.filter((car) =>
        [
          car.modelName,
          car.brand,
          car.category,
          car.fuelType,
          car.transmission,
          car.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [cars, activeCategory, searchTerm]);

  return (
    <>
      {/* ... Search and Filter Section remains the same ... */}
      <section className="w-11/12 container p-4 mx-auto relative">
        <div className="relative lg:absolute w-full -top-15 lg:-top-10 py-4 px-6 rounded-2xl bg-[#FFFFFF]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10 py-2">
            <div className="w-full lg:auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full lg:w-120 py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-[#F4F0EC] focus:ring-gray-200 focus:border-gray-400 outline-none"
                  placeholder="Search by name, brand, fuel, transmission..."
                />
              </div>
            </div>

            <div className="w-full lg:flex-1">
              <div className="flex items-center justify-start lg:justify-between gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <span
                  onClick={() => setActiveCategory("ALL")}
                  className={`py-3 px-6 rounded-2xl cursor-pointer whitespace-nowrap ${
                    activeCategory === "ALL"
                      ? "text-white bg-[#F97316]"
                      : "bg-[#F4F0EC]"
                  }`}
                >
                  All
                </span>

                <span
                  onClick={() => setActiveCategory("SEDAN")}
                  className={`py-3 px-6 rounded-2xl cursor-pointer whitespace-nowrap ${
                    activeCategory === "SEDAN"
                      ? "text-white bg-[#F97316]"
                      : "bg-[#F4F0EC]"
                  }`}
                >
                  Sedan
                </span>

                <span
                  onClick={() => setActiveCategory("SUV")}
                  className={`py-3 px-6 rounded-2xl cursor-pointer whitespace-nowrap ${
                    activeCategory === "SUV"
                      ? "text-white bg-[#F97316]"
                      : "bg-[#F4F0EC]"
                  }`}
                >
                  SUV
                </span>

                <span
                  onClick={() => setActiveCategory("LUXURY")}
                  className={`py-3 px-6 rounded-2xl cursor-pointer whitespace-nowrap ${
                    activeCategory === "LUXURY"
                      ? "text-white bg-[#F97316]"
                      : "bg-[#F4F0EC]"
                  }`}
                >
                  Luxury
                </span>

                <span
                  onClick={() => setActiveCategory("TRUCK")}
                  className={`py-3 px-6 rounded-2xl cursor-pointer whitespace-nowrap ${
                    activeCategory === "TRUCK"
                      ? "text-white bg-[#F97316]"
                      : "bg-[#F4F0EC]"
                  }`}
                >
                  Truck
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-11/12 container p-4 mx-auto lg:py-20 pb-5">
        <div className="flex items-center justify-between lg:mt-0">
          <p className="flex items-center gap-2">
            <span className="font-semibold">{filteredCars.length}</span>
            <span className="text-[#A1A1A1]">Vehicle Available</span>
          </p>

          <div className="flex gap-3 font-semibold cursor-pointer">
            <SlidersHorizontal />
            <p className="hidden sm:block">More filters</p>
          </div>
        </div>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading cars...</p>
            ) : (
              filteredCars.map((car: Car) => (
                <div
                  className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden"
                  key={car._id}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={
                        car.images && car.images.length > 0
                          ? car.images[0].url
                          : "/placeholder-car.png"
                      }
                      alt={car.modelName}
                      className="w-full h-full object-fit"
                    />

                    <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                      {car.brand}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] w-full px-5 py-4">
                    <span className="flex items-center justify-between">
                      <p className="text-[#A1A1A1] text-xs uppercase">
                        {car.category}
                      </p>

                      <p className="text-lg font-bold">
                        ${car.pricePerDay}
                      </p>
                    </span>

                    <span className="flex items-center justify-between">
                      <h2 className="font-bold text-xl">
                        {car.modelName}
                      </h2>

                      <p className="text-[#A1A1A1] text-xs uppercase">
                        /Day
                      </p>
                    </span>

                    <hr className="mt-4 text-[#E6E0E0]" />

                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                      <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                        <span className="flex items-center gap-1">
                          <img
                            src="/Users Group.svg"
                            className="w-4"
                            alt="seats"
                          />
                          <p className="text-sm">{car.seats}</p>
                        </span>

                        <span className="flex items-center gap-1">
                          <img
                            src="/Vector.svg"
                            className="w-4"
                            alt="fuel"
                          />
                          <p className="text-sm">{car.fuelType}</p>
                        </span>

                        <span className="flex items-center gap-1">
                          <img
                            src="/filter-horizontal.svg"
                            className="w-4"
                            alt="transmission"
                          />
                          <p className="text-sm">
                            {car.transmission}
                          </p>
                        </span>
                      </div>

                      <Link
                        to={`/cars/cardetails/${car.slug}`}
                        className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 rounded-full text-center font-medium"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ... Pagination remains the same ... */}
        <section className="flex items-center justify-between mt-5 py-5 lg:py-2">
          <div className="hidden md:flex items-center gap-2 text-[#878789]">
            <span>10</span>Entries per page
          </div>

          <div className="flex items-center gap-2 text-[#878789]">
            Page 1 of 1
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center gap-2 text-[#878789] border border-[#878789] py-1 px-1 md:px-5 md:py-2 cursor-pointer w-40">
              <img src="/Path 94.svg" alt="prev" />
              <span>Previous</span>
            </button>

            <button className="flex items-center justify-center gap-2 text-[#878789] border border-[#878789] py-1 px-1 md:px-5 md:py-2 cursor-pointer w-40">
              <span>Next</span>
              <img src="/Path 93.svg" alt="next" />
            </button>
          </div>
        </section>
      </section>
    </>
  );
}