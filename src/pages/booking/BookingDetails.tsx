import {  useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookingById } from "@/api/booking";
import { Loader } from "lucide-react";
import { bookingStatusColors, errorHandler } from "@/lib/utils";
import { cancelBooking } from "@/api/booking";
import { toast } from "react-toastify";

export default function BookingDetails() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  if (!id) {
    throw new Error("Booking ID is required");
  }

  const [showCancelModal, setShowCancelModal] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["booking-details", id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
 
    
  });
 
  



  const mutation = useMutation({
    mutationFn: () => cancelBooking(id!),

    onSuccess: () => {
      setShowCancelModal(false);
      toast.success("Booking cancelled successfully");

      navigate("/my-bookings");

      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["booking-details", id],
      });
    },


    onError: (error: Error) => {
      errorHandler(error);
    },
  });

  
  

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin w-4 h-4 text-DeepOrange" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const booking = data?.booking;
  if (!booking) {
    return <div className="p-6 mt-50">No booking found</div>;
  }

  

 

  return (
    <>
      <main>
        <section className="bg-[#F9F9F9] mt-20 px-4 sm:px-6 lg:px-0">
          <div className="gap-3.75 max-w-6xl mx-auto">
            <Link to="/my-bookings">
              <p className="text-sm text-gray-500  pt-5 lg:pt-10  ">
                &lt; Back to bookings
              </p>
            </Link>

            <div className="flex flex-wrap items-center gap-2 pt-3  hover:cursor-pointer ">
              <p>{booking?.car?.brand}</p>

              <span
                className={`text-xs md:text-sm px-3 md:p-1.75 text-center rounded-full ${
                  bookingStatusColors[booking?.bookingStatus as keyof typeof bookingStatusColors] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {booking?.bookingStatus}
              </span>
            </div>

            <p className="text-[38px] sm:text-[50px] lg:text-[70px] font-bold text-[#000000] pb-10 lg:pb-20 leading-tight">
              {booking?.car?.modelName}
            </p>
          </div>
        </section>

        {/* section2 */}
        <section className="bg-[#FFFFFF] max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="lg:flex gap-8.25 py-7.5 lg:py-12.5">
            {/* part 1 div */}
            <div className="space-y-6 lg:space-y-10 ">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-[25px] lg:rounded-[40px] py-6.25 lg:py-10 px-4 lg:px-5 w-full lg:w-160">
                {/* IMAGE */}
                <div className="rounded-lg flex justify-center shrink-0 w-full sm:w-auto">
                  <img
                    src={booking?.car?.images[0]?.url || ""}
                    alt={booking?.car?.modelName}
                    className="border-[6px] border-gray-100 rounded-2xl w-full sm:w-51.25 h-55 sm:h-29.75 object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="flex flex-col justify-center space-y-1 w-full">
                  <p className="text-[#9CA3AF] text-sm sm:text-[20px]">
                    {booking?.car?.category}
                  </p>

                  <h2 className="text-[28px] sm:text-[32px] font-extrabold leading-tight">
                    {booking?.car?.modelName}
                  </h2>

                  <h1 className="text-[16px] sm:text-[20px] font-semibold text-[#9CA3AF]">
                    {booking?.totalDays} days{" "}
                    {booking?.driverOption ? "With-Driver" : "Self-Drive"}
                  </h1>
                </div>
              </div>

              <div className="border rounded-[20px] w-full lg:w-160 lg:h-71.5 p-5 lg:p-7.5">
                <p className="font-extrabold text-[24px] lg:text-[32px]">
                  trip details
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 leading-7">
                  <div className="p-2.5 rounded-[15px] bg-[#F4F0EC]">
                    <img src="/Map2.svg" alt="" />

                    <p className="text-[16px] text-[#666666]">PICKUP</p>

                    <p className="wrap-break-word">{booking?.pickupLocation}</p>

                    <div className="flex items-center gap-2">
                      <img src="/Circle.svg" alt="" />

                      <p>
                        {new Date(booking?.pickupDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-[15px] bg-[#F4F0EC]">
                    <img src="/Map2.svg" alt="" />

                    <p className="text-[16px] text-[#666666]">RETURN</p>

                    <p>{booking?.returnLocation}</p>

                    <div className="flex items-center gap-2">
                      <img src="/Circle.svg" alt="" />

                      <p>
                        {new Date(booking?.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* part 2 div */}
            <div className="bg-white p-5 lg:p-7.5 border border-[#F5F3F0] gap-10 rounded-[15px] space-y-4 w-full lg:w-136.75 lg:h-132.25 mt-8 lg:mt-0">
              <div>
                <p className="text-[18px] lg:text-[20px] font-semibold text-gray-400">
                  TOTAL PAID
                </p>

                <p className="text-[35px] lg:text-[45px] font-semibold pb-3 wrap-break-word">
                  {booking?.totalPrice}
                </p>

                <hr className="border-[#A1A1A1]" />
              </div>

              <div className="space-y-3 pt-3">
                <div className="flex justify-between text-[16px] gap-4">
                  <span className="text-[#A1A1A1]">
                    Vehicle({booking?.totalDays}d)
                  </span>

                  <span className="text-[#232323] text-right">
                    {booking?.totalPrice}
                  </span>
                </div>

                <div className="flex justify-between text-[16px] gap-4">
                  <span className="text-[#A1A1A1]">Service fee</span>

                  <span className="text-[#232323] text-right">
                    {booking?.serviceFee}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5 pt-3">
                <button className="text-black py-3 rounded-full flex items-center justify-center gap-2 border border-[#C3C9D3] w-full">
                  <img
                    src="/call.svg"
                    className="h-5 w-5 filter brightness-0"
                    alt=""
                  />
                  Contact concierge
                </button>

                <button className="border py-1 flex items-center justify-center gap-2 rounded-full text-white bg-[#fa7315] w-full">
                  <Link
                    to="/cars/carlisting"
                    className="flex items-center gap-2"
                    onClick={() => navigate("/cars/carlisting")}
                  >
                    Book Again
                    <img src="/arrow.svg" alt="" />
                  </Link>
                </button>
              </div>

             

              <div className="flex justify-center">
                <button
                  onClick={() => setShowCancelModal(true)}
                  disabled={mutation.isPending}
                  className="flex items-center gap-2"
                >
                  <img src="/cancel.svg" alt="" />

                  <p className="text-[18px] text-[#DC2626]">
                    {mutation.isPending ? "Cancelling..." : "Cancel Booking"}
                  </p>
                </button>
              </div>

              <div className="flex justify-center  gap-2">
                <img src="/Shield .svg" alt="" />
                <p className="text-[14px] text-[#A1A1A1]">
                  Free cancellation up to 24h before pickup
                </p>
              </div>
            </div>
          </div>

          <div className="lg:flex py-8 gap-6 lg:gap-10">
            <div className="w-full">
              <div className="w-full lg:w-160 p-5 sm:p-7.5 border border-[#E7E3DF] rounded-[20px] lg:rounded-[30px]">
                <p className="text-[24px] sm:text-[32px] text-DarkBlue font-extrabold">
                  Driver & contact
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <img src="/User.svg" alt=""  />

                    <div className="pt-2 sm:pt-5">
                      <p className="font-semibold text-[#9CA3AF] text-[16px] sm:text-[20px]">
                        Lead driver
                      </p>

                    <p className="font-semibold text-[18px] sm:text-[20px]">
                      {!booking?.driverOption
                        ? "Self-Drive"
                        : booking?.driver?.fullName || "Assigning driver..."}
                    </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src="/Letter.svg" alt="" />

                    <div className="pt-2 sm:pt-5">
                      <p className="font-semibold text-[#9CA3AF] text-[16px] sm:text-[20px]">
                        Email
                      </p>

                    <p className="font-semibold text-[18px] sm:text-[20px]">
                      {!booking?.driverOption
                        ? "N/A"
                        : booking?.driver?.email || "Pending..."}
                    </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mt-4   ">
                  <div className="flex items-center gap-2">
                    <img src="/Phone (1).svg" alt="" />

                    <div className="pt-2 sm:pt-5">
                      <p className="font-semibold text-[#9CA3AF] text-[16px] sm:text-[20px]">
                        Phone
                      </p>

                      <p className="font-semibold text-[18px] sm:text-[20px]">
                      {!booking?.driverOption
                        ? "N/A"
                        : booking?.driver?.phoneNumber || "Pending..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center  gap-2">
                    <img src="/flash.svg" alt="" />

                    <div className="pt-2 sm:pt-5">
                      <p className="font-semibold text-[#9CA3AF] text-[16px] sm:text-[20px]">
                        Payment
                      </p>

                      <p className="font-semibold text-[18px] sm:text-[20px]">
                     Paystack
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7.5 gap-2.5 rounded-[20px] border bg-DarkBlue lg:h-30.5 w-full mt-5 lg:mt-0 ">
              <div className="flex gap-2 items-center">
                <img src="/date.svg" alt="" />

                <p className="text-[#FFFFFF] font-semibold text-[16px] sm:text-[18px]">
                  Booked on
                </p>
              </div>

              <p className="text-[#FFFFFF] font-semibold text-[16px] sm:text-[18px] pt-2">
               {new Date(booking?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[25px] p-8 max-w-md w-full shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-DarkBlue">Cancel Booking?</h3>
                <p className="text-gray-500">
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  No, keep it
                </button>
                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="flex-1 py-3 bg-[#DC2626] text-white rounded-full font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {mutation.isPending ? "Cancelling..." : "Yes, cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
