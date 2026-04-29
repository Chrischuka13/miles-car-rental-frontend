import type { Car } from "../types/car";

type Props = {
  car: Car;
};

const CarCard = ({ car }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
        {car.tag}
      </span>

      <div className="mt-4 flex justify-center">
        <img src={car.image} alt={car.name} className="h-32 object-contain" />
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400 uppercase">{car.type}</p>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{car.name}</h3>

          <div className="text-right">
            <p className="text-xl font-bold">${car.price}</p>
            <p className="text-xs text-gray-400">/Day</p>
          </div>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-3">
            <span>👤 {car.seats}</span>
            <span>⛽ {car.fuel}</span>
            <span>⚙️ {car.transmission}</span>
          </div>

          <button className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;