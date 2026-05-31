import { useQuery } from "@tanstack/react-query";
import { getAdminBookingsApi } from "@/api/admin";
import { useSearchParams } from "react-router";
import { useState } from "react";
import usePaginate from "@/hooks/usePaginate";
import {   Plus, Search } from "lucide-react";
import BookingsTable from "./BookingTable";
import Paginate from "@/components/Paginate";
import NewBookingModal from "./NewBookingModal";



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
  payment?: any;
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
  amount?: number;
}


const tabs = [
  { label: "All", status: "All" },
  { label: "Pending", status: "Pending" },
  { label: "Confirmed", status: "Confirmed" },
  { label: "Completed", status: "Completed" },
  { label: "Cancelled", status: "Cancelled" },
];




export default function Bookings() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminBookings", page],
    queryFn: () => getAdminBookingsApi(page),
    retry: false,
  });

 


  

  const bookings: Booking[] = data?.data?.bookings || [];
 
  const pagination = data?.data?.pagination;
  const cancelledOrders = data?.data?.cancelledOrders || 0;
  const completedOrders = data?.data?.completedOrders || 0;
  const confirmedOrders = data?.data?.confirmedOrders || 0;
  const pendingOrders = data?.data?.pendingOrders || 0;

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  // filter by tab and search on frontend
  const filtered = bookings.filter((b) => {
    const matchesTab = activeTab === "All" || b.bookingStatus === activeTab;
    const matchesSearch =
      `${b.user.firstName} ${b.user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      b._id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabCount = (status: string) => {
    if (status === "All") return bookings.length;
    if (status === "Pending") return pendingOrders;
    if (status === "Confirmed") return confirmedOrders;
    if (status === "Completed") return completedOrders;
    if (status === "Cancelled") return cancelledOrders;
    return 0;
  };

  if (isLoading) return <div className="p-6 pt-24">Loading...</div>;
  if (isError) return <div className="p-6 pt-24 text-red-500">Failed to load bookings.</div>;

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
        <div className="flex gap-6 sticky left-0 overflow-auto border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.status)}
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
        <div className="flex  items-center md:gap-2 md:justify-end mb-4">
          <div className="relative ">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ref, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4   py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-[#F97316] w-full md:w-full"
            />
          </div>
          {/* <div className="flex items-center md:gap-3">
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">
              <Filter size={15} />
              Filters
              <Filter/>
            </button>
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">
              <Download size={15} />
              Export
            </button>
          </div> */}
        </div>

        {/* Table */}
        <BookingsTable bookings={filtered} />

        {/* Pagination */}
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          hasMore={hasMore}
          handlePageChange={handlePageChange}
          totalItem={pagination?.total}
        />
      </div>

      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       
      />
    </>
  );
}