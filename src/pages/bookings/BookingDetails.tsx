import { useState } from "react";
import { Link } from "react-router";
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
} from "lucide-react";

// dummy data - replace with real API data later
const booking = {
  ref: "MIL-8F2A1C",
  status: "Upcoming",
  total: "₦618,000",
  createdAt: "Apr 22, 13:55",
  pickupDate: "Apr 26 · 10:00",
  returnDate: "Apr 29",
  days: 3,
  trip: {
    pickup: {
      city: "Lekki, Lagos",
      address: "12 Admiralty Way, Lekki Phase 1",
      date: "Apr 12 · 10:00",
    },
    return: {
      city: "Lekki, Lagos",
      address: "Same as pickup",
      date: "Apr 29",
    },
  },
  vehicle: {
    name: "Lexus RX 350",
    plate: "LSD-244-EK",
    pricePerDay: "₦180,000",
    image: "https://www.motortrend.com/uploads/2023/04/2023-Lexus-RX-350-front-three-quarter.jpg",
    withDriver: true,
  },
  customer: {
    initials: "AO",
    name: "Adaeze O.",
    email: "adaeze.o@example.com",
    phone: "+234 803 220 4471",
  },
  priceBreakdown: {
    base: "₦540,000",
    driverFee: "₦60,000",
    serviceFee: "₦18,000",
    total: "₦618,000",
    days: 3,
    perDay: "₦180,000",
  },
  payment: {
    method: "Paystack",
    reference: "PSK_ref_882140xc",
    paidAt: "Apr 22, 14:08",
  },
  activity: [
    {
      id: 1,
      icon: "check",
      color: "bg-green-500",
      title: "Booking confirmed",
      time: "Apr 22, 14:09",
    },
    {
      id: 2,
      icon: "payment",
      color: "bg-blue-500",
      title: "Payment ₦618,000 received via Paystack",
      time: "Apr 22, 14:08",
    },
    {
      id: 3,
      icon: "calendar",
      color: "bg-gray-400",
      title: "Booking created by Adaeze O.",
      time: "Apr 22, 13:55",
    },
  ],
};

const statusConfig: Record<string, { bg: string; text: string }> = {
  Upcoming: { bg: "bg-orange-50", text: "text-orange-500" },
  "On trip": { bg: "bg-green-50", text: "text-green-600" },
  Completed: { bg: "bg-gray-100", text: "text-gray-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-500" },
  Refunded: { bg: "bg-blue-50", text: "text-blue-500" },
};

export default function BookingDetail() {
  const [note, setNote] = useState("");

  const status = statusConfig[booking.status] || statusConfig["Upcoming"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* breadcrumb + actions */}
      <div className="flex items-center justify-between mb-6 mt-16">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/admin/bookings" className="flex items-center gap-1 hover:text-gray-700">
            <ChevronLeft size={20} />
            Bookings
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{booking.ref}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">
            <CheckCircle size={15} />
            Mark completed
          </button>
          <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition">
            <XCircle size={15} />
            Cancel booking
          </button>
        </div>
      </div>

      {/* main layout */}
      <div className="flex gap-6">

        {/* left column */}
        <div className="flex-1 space-y-4">

          {/* booking header card */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-gray-500">{booking.ref}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                {booking.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{booking.total}</h1>
            <p className="text-sm text-gray-400 mt-1">Created {booking.createdAt}</p>

            <div className="mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span className="font-medium text-gray-700">PICK UP</span>
              </div>
              <p className="ml-5">{booking.pickupDate}</p>
              <p className="ml-5 text-gray-400">→ Return {booking.returnDate} · {booking.days}d</p>
            </div>
          </div>

          {/* Trip */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">Trip</h2>
            </div>

            <div className="flex gap-4 mb-4">
              {/* pickup */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Pickup</p>
                <p className="font-semibold text-gray-900">{booking.trip.pickup.city}</p>
                <p className="text-sm text-gray-500">{booking.trip.pickup.address}</p>
                <p className="text-sm text-gray-400 mt-2">{booking.trip.pickup.date}</p>
              </div>

              {/* return */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Return</p>
                <p className="font-semibold text-gray-900">{booking.trip.return.city}</p>
                <p className="text-sm text-gray-500">{booking.trip.return.address}</p>
                <p className="text-sm text-gray-400 mt-2">{booking.trip.return.date}</p>
              </div>
            </div>

            {/* map placeholder */}
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
              <img
                src="/ChatGPT Image Apr 23, 2026, 12_50_58 PM 1.svg"
                alt="Lexus"
                className="w-24 h-16 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{booking.vehicle.name}</p>
                <p className="text-sm text-gray-400">{booking.vehicle.plate}</p>
                <p className="text-sm text-gray-600 mt-1">{booking.vehicle.pricePerDay} / day</p>
              </div>
              {booking.vehicle.withDriver && (
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
              <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700">
                <UserPlus size={14} />
                Assign driver
              </button>
            </div>

            <div className="border-2 border-dashed border-orange-200 rounded-xl p-6 flex items-center justify-center">
              <div className="flex items-center gap-2 text-orange-400">
                <UserPlus size={18} />
                <span className="text-sm font-medium">Assign a driver to this booking</span>
              </div>
            </div>
          </div>

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
                {booking.customer.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{booking.customer.name}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Mail size={12} />
                    {booking.customer.email}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Phone size={12} />
                    {booking.customer.phone}
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
              {booking.activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon === "check" && <CheckCircle size={16} className="text-white" />}
                    {item.icon === "payment" && <span className="text-white text-xs font-bold">₦</span>}
                    {item.icon === "calendar" && <Calendar size={14} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="w-72 space-y-4">

          {/* Price breakdown */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Price breakdown</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{booking.priceBreakdown.days} × {booking.priceBreakdown.perDay}</span>
                <span className="font-medium text-gray-800">{booking.priceBreakdown.base}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Driver fee</span>
                <span className="font-medium text-gray-800">{booking.priceBreakdown.driverFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service fee</span>
                <span className="font-medium text-gray-800">{booking.priceBreakdown.serviceFee}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Total Paid</span>
                <span className="font-bold text-gray-900">{booking.priceBreakdown.total}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-800">{booking.payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reference</span>
                <span className="font-medium text-gray-800 text-xs">{booking.payment.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paid at</span>
                <span className="font-medium text-gray-800">{booking.payment.paidAt}</span>
              </div>
            </div>
          </div>

          {/* Internal notes */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Internal notes</h2>
            <textarea
              rows={4}
              placeholder="Add an internal note for the team..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-gray-50 rounded-xl p-3 text-sm outline-none resize-none text-gray-600 placeholder-gray-300"
            />
            <button className="mt-3 w-full bg-[#F97316] text-white py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition">
              Add note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}