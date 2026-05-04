import CarCard from "../components/carCard";
import { trendingCars } from "../constants/trendingCars";

const TrendingCars = () => {
  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4 gap-10">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-20 lg:gap-45 mt-5">
          {trendingCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingCars;