import CarCard from "../components/carCard";
import { trendingCars } from "../data/trendingCars";

const TrendingCars = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Trending Cars</h2>
          <p className="text-gray-500 text-sm">
            Most popular choices this week
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingCars;