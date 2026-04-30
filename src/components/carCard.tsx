import type { Car } from "../types/car";

type Props = {
  car: Car;
};

const CarCard = ({ car }: Props) => {
  return (
    <div className="w-auto lg:w-13/9 container  mx-auto  bg-white rounded-2xl  shadow-sm hover:shadow-md transition duration-300">
      <span className="text-xs bg-gray-100 px-5 py-2 rounded-full text-gray-500">
        {car.tag}
      </span>

      <div className=" flex justify-center items-end">
        <img src={car.image} alt={car.name} className="mt-3 h-60 w-full object-cover" />
      </div>

      <div className="mt-2 px-5 pb-5">
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
            <span> {car.seats}</span>
            <span> {car.fuel}</span>
            <span> {car.transmission}</span>
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