import TableBody from "@/components/TableBody";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface Car {
  _id: string;
  brand: string;
  modelName: string;
  images: string[];
  slug: string;
}

interface BookingUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Booking {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payment: any;
  _id: string;
  bookingStatus: string;
  car: Car;
  user: BookingUser;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string;
  returnTime: string;
  totalDays: number;
  totalPrice: number;
  driverOption: boolean;
  driverFee: number;
  serviceFee: number;
  createdAt: string;
  amount: number;
}

interface BookingsTableProps {
  bookings: Booking[];
}

const formatNaira = (amount: number) => `₦${amount?.toLocaleString() || 0}`;

const bookingColumns = [
  { uid: "ref", name: "Ref" },
  { uid: "customer", name: "Customer" },
  { uid: "vehicle", name: "Vehicle" },
  { uid: "pickupReturn", name: "Pickup / Return" },
  { uid: "location", name: "Location" },
  { uid: "driver", name: "Driver" },
  { uid: "total", name: "Total" },
  { uid: "status", name: "Status" },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "bg-orange-50", text: "text-orange-500" },
  Confirmed: { bg: "bg-green-50", text: "text-green-600" },
  Completed: { bg: "bg-gray-100", text: "text-gray-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-500" },
  Refunded: { bg: "bg-blue-50", text: "text-blue-500" },
};

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const navigate = useNavigate();

  const renderCell = useCallback((booking: Booking, columnKey: string) => {
    switch (columnKey) {
      case "ref":
        return (
          <span className="text-gray-500 font-mono text-xs">
            {booking._id.slice(-8).toUpperCase()}
          </span>
        );
      case "customer":
        return (
          <span className="font-medium text-gray-800">
            {booking.user.firstName} {booking.user.lastName}
          </span>
        );
      case "vehicle":
        return (
          <span className="text-gray-600">
            {booking.car.brand} {booking.car.modelName}
          </span>
        );
      case "pickupReturn":
        return (
          <div>
            <span className="text-gray-600">
              {new Date(booking.pickupDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
              {" → "}
              {new Date(booking.returnDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </span>
            <br />
            <span className="text-xs text-gray-400">{booking.totalDays}d</span>
          </div>
        );
      case "location":
        return <span className="text-gray-600">{booking.pickupLocation}</span>;
      case "driver":
        return (
          <span className="text-gray-600">
            {booking.driverOption ? "With Driver" : "No Driver"}
          </span>
        );
      case "total":
        return (
          <span className="font-medium text-gray-800">
                 {formatNaira(booking?.payment?.amount)}
          </span>
        );
      case "status":
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[booking.bookingStatus]?.bg || "bg-gray-100"} ${statusConfig[booking.bookingStatus]?.text || "text-gray-500"}`}
          >
            {booking.bookingStatus}
          </span>
        );
      default:
        return null;
    }
  }, []);

  const handleRowClick = useCallback(
    (booking: Booking) => {
      navigate(`/admin/bookings/${booking._id}`);
    },
    [navigate],
  );

  return (
    <div>
      <TableBody
        tableColumns={bookingColumns}
        tableData={bookings}
        renderCell={renderCell}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
