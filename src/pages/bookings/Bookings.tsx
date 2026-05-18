import { useState } from "react";
import { Filter, Download, Plus, Search } from "lucide-react";
import NewBookingModal from "./NewBookingModal";
import { useNavigate } from "react-router";

type BookingStatus =
  | "Upcoming"
  | "On trip"
  | "Completed"
  | "Cancelled"
  | "Refunded";

interface Booking {
  id: string;
  ref: string;
  customer: string;
  vehicle: string;
  pickupDate: string;
  returnDate: string;
  duration: string;
  location: string;
  driver: "With Driver" | "No Driver";
  total: string;
  status: BookingStatus;
}

const dummyBookings: Booking[] = [
  {
    id: "1",
    ref: "MIL-8F2A1C",
    customer: "Adaeze Okafor",
    vehicle: "Lexus RX 350",
    pickupDate: "Apr 26",
    returnDate: "Apr 29",
    duration: "3d",
    location: "Lekki Phase 1",
    driver: "With Driver",
    total: "₦540,000",
    status: "Upcoming",
  },
  {
    id: "2",
    ref: "MIL-9K7B22",
    customer: "Tunde Makinde",
    vehicle: "Toyota Camry",
    pickupDate: "Apr 25",
    returnDate: "Apr 27",
    duration: "2d",
    location: "Ikeja GRA",
    driver: "No Driver",
    total: "₦180,000",
    status: "On trip",
  },
  {
    id: "3",
    ref: "MIL-2P5C09",
    customer: "Kemi Eze",
    vehicle: "Mercedes GLE",
    pickupDate: "Apr 26",
    returnDate: "Apr 30",
    duration: "4d",
    location: "MMIA T2",
    driver: "With Driver",
    total: "₦1,120,000",
    status: "Upcoming",
  },
  {
    id: "4",
    ref: "MIL-3D1F88",
    customer: "James Nwankwo",
    vehicle: "Hyundai Tucson",
    pickupDate: "Apr 21",
    returnDate: "Apr 24",
    duration: "3d",
    location: "Victoria Island",
    driver: "No Driver",
    total: "₦310,000",
    status: "Completed",
  },
];

const statusConfig: Record<BookingStatus, { bg: string; text: string }> = {
  Upcoming: { bg: "bg-orange-50", text: "text-orange-500" },
  "On trip": { bg: "bg-green-50", text: "text-green-600" },
  Completed: { bg: "bg-gray-100", text: "text-gray-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-500" },
  Refunded: { bg: "bg-blue-50", text: "text-blue-500" },
};

const tabs: { label: string; status: BookingStatus | "All" }[] = [
  { label: "All", status: "All" },
  { label: "Upcoming", status: "Upcoming" },
  { label: "Active", status: "On trip" },
  { label: "Completed", status: "Completed" },
  { label: "Cancelled", status: "Cancelled" },
  { label: "Refunded", status: "Refunded" },
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<BookingStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = dummyBookings.filter((b) => {
    const matchesTab = activeTab === "All" || b.status === activeTab;
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.ref.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map((b) => b.id));
    }
  };

  const getTabCount = (status: BookingStatus | "All") => {
    if (status === "All") return dummyBookings.length;
    return dummyBookings.filter((b) => b.status === status).length;
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="p-6 pt-24 overflow-x-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky left-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all reservations across your fleet.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            <Plus size={16} />
            New booking
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 sticky left-0  overflow-auto border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.status);
                setCurrentPage(1);
              }}
              className={`pb-3 text-sm font-medium transition-all ${
                activeTab === tab.status
                  ? "border-b-2 border-[#F97316] text-[#F97316]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label} ({getTabCount(tab.status)})
            </button>
          ))}
        </div>

        {/* Search + Actions */}
        <div className="flex items-center justify-between lg:pl-170 md:pl-60 mb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ref, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-[#F97316] w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">
              <Filter size={15} />
              Filters
            </button>
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-100 ">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide"
              
              >
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === paginated.length &&
                      paginated.length > 0
                    }
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="p-4 text-left font-medium">Ref</th>
                <th className="p-4 text-left font-medium">Customer</th>
                <th className="p-4 text-left font-medium">Vehicle</th>
                <th className="p-4 text-left font-medium">
                  Pickup <br /> Return
                </th>
                <th className="p-4 text-left font-medium">Location</th>
                <th className="p-4 text-left font-medium">Driver</th>
                <th className="p-4 text-left font-medium">Total</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition"
                  onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(booking.id)}
                      onChange={() => toggleSelect(booking.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-xs">
                    {booking.ref}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {booking.customer}
                  </td>
                  <td className="p-4 text-gray-600">{booking.vehicle}</td>
                  <td className="p-4 text-gray-600">
                    <span>
                      {booking.pickupDate} → {booking.returnDate}
                    </span>
                    <br />
                    <span className="text-xs text-gray-400">
                      {booking.duration}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{booking.location}</td>
                  <td className="p-4 text-gray-600">{booking.driver}</td>
                  <td className="p-4 font-medium text-gray-800">
                    {booking.total}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[booking.status].bg} ${statusConfig[booking.status].text}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
            <span>{entriesPerPage} Entries per page</span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition"
              >
                ← Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
