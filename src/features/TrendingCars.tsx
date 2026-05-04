import { Link, useParams } from "react-router";
import { TrendingCars as trendingCarsData, type CarProduct } from "@/lib/constant";

export default function TrendingCars() {
  const { id } = useParams<{ id: string }>();

  const selectedCars: CarProduct | undefined = trendingCarsData.find(
    (car) => car.id === Number(id)
  );

  if (!selectedCars) {
    return null;
  }

  return (
    <section className="bg-[#FFFFFF] mt-5">
      <main className="w-11/12 container py-10 mx-auto">
        <p className="flex items-center text-xs gap-1 tracking-wide">
          <span className=" text-[#F97316]">●</span> Our diverse fleet for
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
            {trendingCarsData.slice(0, 3).map((cars: CarProduct) => (
              <div
                key={cars.id}
                className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden"
              >
                <div className="relative w-full h-50">
                  <img
                    src={cars.image[0]}
                    alt={cars.name}
                    className="w-full h-full object-cover"
                  />
                  <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                    {cars.carValue}
                  </p>
                </div>

                <div className="bg-[#FFFFFF] w-full px-5 py-4">
                  <span className="flex items-center justify-between">
                    <p className="text-[#A1A1A1] text-xs uppercase">
                      {cars.carType}
                    </p>
                    <p className="text-lg font-bold">${cars.price}</p>
                  </span>

                  <span className="flex items-center justify-between">
                    <h2 className="font-bold text-xl">{cars.name}</h2>
                    <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                  </span>

                  <hr className="mt-4 text-[#E6E0E0]" />

                  <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                    <div className="flex items-center gap-3 text-[#727477]">
                      <span className="flex items-center gap-1">
                        <p className="text-sm">{cars.seats}</p>
                      </span>
                      <span className="flex items-center gap-1">
                        <p className="text-sm">{cars.consumption}</p>
                      </span>
                      <span className="flex items-center gap-1">
                        <p className="text-sm">{cars.transmission}</p>
                      </span>
                    </div>

                    <Link
                      to={`/cars/cardetails/${cars.id}`}
                      className="w-full xl:w-auto px-4 py-2 text-white bg-[#F97316] rounded-full text-center font-medium"
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