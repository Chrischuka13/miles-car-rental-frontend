import { Link, useParams } from "react-router";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  MapPin,
  Car,
  User,
  Clock,
  Calendar,
  Mail,
  Phone,
  UserPlus,
  AlertTriangle, // 👈 Added for modal visualization aesthetics
} from "lucide-react";
import { useState } from "react"; // 👈 Added to track the open state of the modal
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminSingleBookingApi,
  markBookingAsCompletedApi,
  cancelAdminBookingApi,
} from "@/api/admin";
import { toast } from "react-toastify";
import AssignDriverModal from "./AssignDriverModal";

const statusConfig: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "bg-orange-50", text: "text-orange-500" },
  Confirmed: { bg: "bg-green-50", text: "text-green-600" },
  Completed: { bg: "bg-gray-100", text: "text-gray-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-500" },
  Refunded: { bg: "bg-blue-50", text: "text-blue-500" },
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatNairaCode = (amount: number) => `₦${amount?.toLocaleString() || 0}`;

export default function BookingDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "complete" | "cancel" | null;
    title: string;
    description: string;
    actionLabel: string;
    actionColor: string;
  }>({
    isOpen: false,
    type: null,
    title: "",
    description: "",
    actionLabel: "",
    actionColor: "",
  });
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assignedDriver, setAssignedDriver] = useState<any>(null);

  // update the driver section condition

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleBooking", id],
    queryFn: () => getAdminSingleBookingApi(id!),
    retry: false,
    enabled: !!id,
  });

  // TanStack Mutation handler for completing bookings
  const { mutate: completeBooking, isPending: isCompleting } = useMutation({
    mutationFn: () => markBookingAsCompletedApi(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleBooking", id] });
      toast.success("Booking marked as completed successfully!");
      setModalConfig((prev) => ({ ...prev, isOpen: false })); // Close modal on success
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const serverMessage =
        error.response?.data?.message || "Failed to complete booking.";
      toast.error(serverMessage);
      setModalConfig((prev) => ({ ...prev, isOpen: false })); // Close modal on failure
    },
  });

  // TanStack Mutation handler for cancelling bookings
  const { mutate: cancelBooking, isPending: isCancelling } = useMutation({
    mutationFn: () => cancelAdminBookingApi(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleBooking", id] });
      toast.success("Booking cancelled successfully!");
      setModalConfig((prev) => ({ ...prev, isOpen: false })); // Close modal on success
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const serverMessage =
        error.response?.data?.message || "Failed to cancel booking.";
      toast.error(serverMessage);
      setModalConfig((prev) => ({ ...prev, isOpen: false })); // Close modal on failure
    },
  });

  const booking = data?.data?.booking;

  if (isLoading)
    return <div className="p-6 pt-24 text-gray-500">Loading booking...</div>;
  if (isError || !booking)
    return (
      <div className="p-6 pt-24 text-red-500">Failed to load booking.</div>
    );

  const status = statusConfig[booking.bookingStatus] || statusConfig["Pending"];
  const perDayPrice = booking?.car?.pricePerDay;

  const totalPrice = booking.payment?.amount;

  const formatNaira = (amount: number) => `₦${amount?.toLocaleString() || 0}`;

  const displayDriver = booking.driver || assignedDriver;

  //  Triggers modal presentation with appropriate action fields instead of native browser prompts
  const openConfirmation = (type: "complete" | "cancel") => {
    if (type === "complete") {
      setModalConfig({
        isOpen: true,
        type: "complete",
        title: "Mark Booking as Completed?",
        description:
          "Are you sure you want to finalize this rental? This will update the status and log the trip as finished.",
        actionLabel: "Complete Trip",
        actionColor: "bg-green-600 hover:bg-green-700",
      });
    } else {
      setModalConfig({
        isOpen: true,
        type: "cancel",
        title: "Cancel Active Booking?",
        description:
          "Are you sure you want to cancel this booking? This operation cannot be undone and may affect active schedules.",
        actionLabel: "Cancel Booking",
        actionColor: "bg-red-500 hover:bg-red-600",
      });
    }
  };

  //  Routes button confirmation intent directly to the correct mutation hook
  const handleModalConfirm = () => {
    if (modalConfig.type === "complete") {
      completeBooking();
    } else if (modalConfig.type === "cancel") {
      cancelBooking();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      {/* breadcrumb + actions */}
      <div className="md:flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 hover:text-gray-700"
          >
            <ChevronLeft size={16} />
            Bookings
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {booking._id.slice(-8).toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-4 md:pt-0">
          <button
            onClick={() => openConfirmation("complete")}
            disabled={
              isCompleting ||
              isCancelling ||
              booking.bookingStatus === "Completed" ||
              booking.bookingStatus === "Cancelled"
            }
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <CheckCircle size={15} />
            Mark completed
          </button>
          <button
            onClick={() => openConfirmation("cancel")}
            disabled={
              isCompleting ||
              isCancelling ||
              booking.bookingStatus === "Completed" ||
              booking.bookingStatus === "Cancelled"
            }
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <XCircle size={15} />
            Cancel booking
          </button>
        </div>
      </div>

      {/* main layout */}
      <div className="md:flex gap-6">
        {/* left column */}
        <div className="flex-1 space-y-4">
          {/* booking header card */}
          <div className="bg-white md:flex justify-between rounded-2xl p-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-gray-500">
                  {booking._id.slice(-8).toUpperCase()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                >
                  {booking.bookingStatus}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {formatNairaCode(booking?.payment?.amount)}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Created {formatDate(booking.createdAt)}
              </p>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span className="font-medium text-gray-700 uppercase text-xs">
                  Pick Up
                </span>
              </div>
              <p className="ml-5">
                {formatDate(booking.pickupDate)} · {booking.pickupTime}
              </p>
              <p className="ml-5 text-gray-400">
                → Return {formatDate(booking.returnDate)} · {booking.totalDays}d
              </p>
            </div>
          </div>

          {/* Trip */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">Trip</h2>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">
                  Pickup
                </p>
                <p className="font-semibold text-gray-900">
                  {booking.pickupLocation}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {formatDate(booking.pickupDate)} · {booking.pickupTime}
                </p>
              </div>

              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">
                  Return
                </p>
                <p className="font-semibold text-gray-900">
                  {booking.returnLocation}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {formatDate(booking.returnDate)} · {booking.returnTime}
                </p>
              </div>
            </div>

            <div className="w-full h-48 bg-blue-200 rounded-xl overflow-hidden">
              <img
                src="/Frame 2095585909.svg"
                alt="map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vehicle */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Car size={16} className="text-gray-500" />
                <h2 className="font-semibold text-gray-900">Vehicle</h2>
              </div>
              <button className="text-[#F97316] text-sm font-medium flex items-center gap-1 hover:underline">
                View in fleet →
              </button>
            </div>

            <div className="flex items-center gap-4">
              {booking.car?.images?.[0] ? (
                <img
                  src={booking.car.images?.[0]?.url}
                  alt={booking.car.modelName}
                  className="w-24 h-16 object-cover rounded-xl"
                />
              ) : (
                <div className="w-24 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Car size={24} className="text-gray-300" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {booking.car?.brand} {booking.car?.modelName}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formatNaira(perDayPrice)} / day
                </p>
              </div>
              {booking.driverOption && (
                <span className="px-3 py-1 bg-orange-50 text-orange-500 text-xs font-medium rounded-full">
                  With driver
                </span>
              )}
            </div>
          </div>

          {/* Driver */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <h2 className="font-semibold text-gray-900">Driver</h2>
              </div>
              {booking.driverOption && !booking.driver && (
                <button
                  onClick={() => setIsAssignDriverOpen(true)}
                  className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
                >
                  <UserPlus size={14} />
                  Assign driver
                </button>
              )}
            </div>

            {/* No driver needed */}
            {!booking.driverOption && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <User size={18} />
                  <span className="text-sm font-medium">
                    No driver needed for this booking
                  </span>
                </div>
              </div>
            )}

            {/* Driver needed but not assigned */}
            {booking.driverOption && !booking.driver && (
              <div
                onClick={() => setIsAssignDriverOpen(true)}
                className="border-2 border-dashed border-orange-200 rounded-xl p-6 flex items-center justify-center cursor-pointer hover:bg-orange-50 transition"
              >
                <div className="flex items-center gap-2 text-orange-400">
                  <UserPlus size={18} />
                  <span className="text-sm font-medium">
                    Assign a driver to this booking
                  </span>
                </div>
              </div>
            )}

            {/* Driver assigned */}
            {booking.driverOption && displayDriver && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">
                  {displayDriver.fullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {displayDriver.fullName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {displayDriver.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-400">
                    {displayDriver.licenseNumber} · {displayDriver.baseCity}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                  <span className="text-orange-400">★</span>
                  {displayDriver.rating?.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          <AssignDriverModal
            isOpen={isAssignDriverOpen}
            onClose={() => setIsAssignDriverOpen(false)}
            bookingId={booking._id}
            bookingRef={booking._id.slice(-8).toUpperCase()}
            carName={`${booking.car?.brand} ${booking.car?.modelName}`}
            pickupDate={formatDate(booking.pickupDate)}
            returnDate={formatDate(booking.returnDate)}
            onDriverAssigned={(driver) => setAssignedDriver(driver)} // ← add this
          />

          {/* Customer */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <h2 className="font-semibold text-gray-900">Customer</h2>
              </div>
              <button className="text-[#F97316] text-sm font-medium flex items-center gap-1 hover:underline">
                View profile →
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                {booking.user?.firstName?.[0]}
                {booking.user?.lastName?.[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {booking.user?.firstName} {booking.user?.lastName}
                </p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Mail size={12} />
                    {booking.user?.email}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Phone size={12} />
                    {booking.user?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">Activity</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Booking created by {booking.user?.firstName}{" "}
                    {booking.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="w-full pt-6 md:pt-0 md:w-72 space-y-4">
          {/* Price breakdown */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Price breakdown
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  {booking.totalDays}d × {formatNaira(perDayPrice)}
                </span>
                <span className="font-medium text-gray-800">
                  {formatNaira(perDayPrice * booking.totalDays)}
                </span>
              </div>
              {booking.driverOption && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver fee</span>
                  <span className="font-medium text-gray-800">
                    {formatNaira(booking.driverFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Service fee</span>
                <span className="font-medium text-gray-800">
                  {formatNaira(booking.serviceFee)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Total Paid</span>
                <span
                  className={`text-sm ${totalPrice > 0 ? "font-bold text-gray-900" : "text-gray-400 italic font-normal"}`}
                >
                  {totalPrice > 0
                    ? formatNairaCode(totalPrice)
                    : "Payment has not been made yet"}
                </span>
              </div>
            </div>
          </div>
          {/* Payment */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-800 capitalize">
                  {booking.payment?.paymentMethod || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reference</span>
                <span className="font-medium text-gray-800 text-xs">
                  {booking.payment?.reference || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`font-medium ${booking.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"}`}
                >
                  {booking.paymentStatus || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paid at</span>
                <span className="font-medium text-gray-800">
                  {booking.payment?.paidAt
                    ? formatDate(booking.payment.paidAt)
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Internal notes */}
        </div>
      </div>

      {/*  Fully Embedded Custom Action Confirmation Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-2xl p-6 shadow-xl space-y-4 transform scale-100 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-50 rounded-full text-amber-500">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {modalConfig.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {modalConfig.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                disabled={isCompleting || isCancelling}
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModalConfirm}
                disabled={isCompleting || isCancelling}
                className={`px-4 py-2 text-white rounded-full text-sm font-medium shadow-sm disabled:opacity-50 transition ${modalConfig.actionColor}`}
              >
                {isCompleting || isCancelling
                  ? "Processing..."
                  : modalConfig.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
