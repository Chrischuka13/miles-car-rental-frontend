import { getMyBookings } from "@/api/booking";
import { bookingStatusColors } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function MyBookings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });
  if (isLoading) return <p className=" flex items-center justify-center h-screen"><Loader className="animate-spin w-4 h-4 text-DeepOrange" /></p>;
  if (error) return <p>Error: {error.message}</p>;

  const USD_TO_NGN = 200;

  const formatToNaira = (priceInUSD: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(priceInUSD * USD_TO_NGN);
  };

  console.log("MY BOOKINGS:", data);

  return (
    <>
      <main className="lg:pt-20 px-4 flex items-center justify-center bg-[#F9F9F9]">
        <div className="mt-6 lg:mt-10 px-4 lg:pl-20 mx-auto w-full space-y-5">
          <p className="text-gray-500">Account</p>

          <h6 className="pt-5 font-bold text-3xl lg:text-[70px]">
            My Bookings
          </h6>

          <p className="text-gray-600 max-w-2xl pb-5">
            Track upcoming trips, review past rides and manage everything in one
            place.
          </p>

          <div className="rounded-[15px] mt-6 min-h-[207.41px]">
            <div className=" space-y-10  lg:space-y-15 rounded-xl p-4 lg:p-7.5 bg-[#FFFFFF]">
              {data?.bookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col lg:flex-row items-start lg:items-center gap-5 mx-auto rounded-xl"
                >
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:flex-1 px-2 lg:px-10">
                    <div className="bg-gray-100 rounded-xl p-2">
                      <img
                        src={booking.car.images?.[0]?.url}
                        alt={booking.car.modelName}
                        className="w-[204.63px] h-[119.46px] object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col gap-1 pt-2">
                      <p className="text-[#9CA3AF] text-[16px] lg:text-[18px] font-bold">
                        {booking.car.modelName}
                      </p>

                      <h2 className="text-[#111827] text-xl lg:text-2xl font-extrabold">
                        {booking.car.brand}
                      </h2>

                      <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
                        <div className="flex items-center gap-2">
                            <img src="location2.svg" alt="" />
                          <p className="text-[14px] lg:text-[18px] text-gray-600 flex">
                            {new Date(booking.pickupDate).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </p>
                        </div>
                              <div className="flex items-center gap-2 lg:pl-50">
                                <img src="Map2.svg" alt="" />
                                <p className="text-sm text-gray-700   ">
                          {booking.pickupLocation}
                        </p>
                              </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 w-full lg:w-64 justify-start lg:justify-end pb-4 lg:pb-15">
                    <div className="w-full">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          bookingStatusColors[booking.bookingStatus] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </div>

                    <div className="w-full flex flex-col items-start">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-bold text-lg">
                        {formatToNaira(booking.totalPrice)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.totalDays} days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
