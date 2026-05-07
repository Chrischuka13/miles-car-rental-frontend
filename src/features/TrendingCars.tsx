import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTrendingCars } from "@/api/cars/cars";

interface TrendingCar {
  _id: string;
  brand: string;
  modelName: string;
  category: string;
  pricePerDay: number;
  seats: number;
  fuelType: string;
  transmission: string;
  images: { url: string; public_id: string }[];
  slug: string; // 1. Add slug to the interface
}

export default function TrendingCars() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trendingCars"],
    queryFn: getTrendingCars,
  });

  const cars: TrendingCar[] = data?.data || [];

  if (isLoading)
    return (
      <div className="py-10 text-center text-orange-500">Loading trends...</div>
    );
  if (isError || cars.length === 0) return null;

  return (
    <section className="bg-[#FFFFFF] mt-5">
      <main className="w-11/12 container py-10 mx-auto">
        <p className="flex items-center text-xs gap-1 tracking-wide">
          <span className="text-[#F97316]">●</span> Our diverse fleet for
          comfort and performance
        </p>

        <div>
          <span className="flex items-center justify-between mt-2">
            <h1 className="text-2sm sm:text-2xl lg:text-[45px]">
              Trending <span className="text-[#F97316]">cars</span> for The Week
            </h1>

            <Link
              to="/cars/carlisting"
              className="flex items-center gap-1 lg:gap-3 cursor-pointer"
            >
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

        <section className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 3).map((car) => (
              <div
                key={car._id}
                className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-60">
                  <img
                    src={car.images[0]?.url || "/placeholder.png"}
                    alt={car.modelName}
                    className="w-full h-full object-cover"
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
                    <p className="text-lg font-bold">${car.pricePerDay}</p>
                  </span>

                  <span className="flex items-center justify-between">
                    <h2 className="font-bold text-xl">{car.modelName}</h2>
                    <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
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
                        <img src="/Vector.svg" className="w-4" alt="fuel" />
                        <p className="text-sm">{car.fuelType}</p>
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          src="/filter-horizontal.svg"
                          className="w-4"
                          alt="transmission"
                        />
                        <p className="text-sm">{car.transmission}</p>
                      </span>
                    </div>

                    {/* 2. UPDATE THIS LINK: Change car._id to car.slug */}
                    <Link
                      to={`/cars/cardetails/${car.slug}`}
                      className="w-full xl:w-auto px-6 py-2 text-white bg-[#F97316] transition-all duration-300 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 rounded-full text-center font-medium"
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
  );
}
