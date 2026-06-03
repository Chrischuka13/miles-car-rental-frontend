import { getMyBookings } from "@/api/booking";
import { bookingStatusColors } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";

export default function MyBookings() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });
  if (isLoading)
    return (
      <p className=" flex items-center justify-center h-screen">
        <Loader className="animate-spin w-4 h-4 text-DeepOrange" />
      </p>
    );
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
      <main className="  ">
        <div className=" bg-[#F9F9F9]    ">
          <div className="mt-10   space-y-5  max-w-6xl   mx-auto   px-7 md:px-20 lg:px-0 ">
            <p className="pt-20 text-18px font-semibold text-DeepOrange ">
              ACCOUNT
            </p>

            <h6 className=" font-bold  text-[30px] lg:text-[70px]">
              My Bookings
            </h6>

            <p className="text-gray-600 lg:max-w-1xl pb-5">
              Track upcoming trips, review past rides and manage everything in
              one place.
            </p>
          </div>
        </div>
        
        {data?.bookings?.map((booking) => (
          <div className=" max-w-6xl  mx-auto flex   border md:border-0    gap-10 lg:gap-0 px-5 md:px-20 lg:px-0  justify-between py-5 md:py-6.25 lg:py-7.5  ">
            <div key={booking._id} className="lg:py-7.5">
              <div className="md:flex items-start   gap-4 lg:w-189 mb-10">
                <img
                  src={booking.car.images?.[0]?.url}
                  alt=""
                  className=" w-50  md:w-70 lg:w-218px h-[147.41px] object-cover rounded-[6.84px]     "
                />
                <div className="lg:w-131.75  lg:space-y-3.75 pt-2 md:pt-0   ">
                  <div className="lg:space-y-2.5 ">
                    <p className=" sm:text-[16px] lg:text-[18px]   md:text-[18px] font-semibold text-[#9CA3AF]  ">
                      {" "}
                      {booking.car.brand}
                    </p>
                    <p className=" text-1xl lg:text-[32px]  font-extrabold text-DarkBlue">
                      {" "}
                      {booking.car.modelName}
                    </p>
                  </div>

                  <div className="flex md:flex-row flex-col gap-0 md:gap-7    lg:gap-50 leading-7 ">
                    <p className="text-[12px] lg:text-[18px] text-DarkBlue flex items-center gap-2">
                      <img src="location2.svg" alt="" />
                      {new Date(booking.pickupDate).toLocaleDateString()}-
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center text-[14px] lg:text-[18px]   lg:pt-0 gap-2 text-DarkBlue">
                      <img src="Map2.svg" alt="" />
                      <p> {booking.pickupLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex  pt-38 md:pt-0 lg:pt-0  gap-10">
              <div className="w-full lg:pt-5   ">
                <span
                  onClick={() => navigate(`/booking-details/${booking._id}`)}
                  className={`text-xs md:text-sm px-3 md:p-1.75  text-center rounded-full ${
                    bookingStatusColors[booking.bookingStatus as keyof typeof bookingStatusColors] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </div>
              <div className="leading-7">
                <p className="text-[18px] text-gray-500  md:pt-3  ">TOTAL</p>
                <p className="font-extrabold text-[15px]">
                  {formatToNaira(booking.totalPrice)}
                </p>
                <p className="text-[18px] text-gray-500">
                  {booking.totalDays} days
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
