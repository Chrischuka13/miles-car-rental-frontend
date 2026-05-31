import { useState } from "react";
import { X, Search, Star, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminDriversApi, assignDriverApi } from "@/api/admin";
import { toast } from "react-toastify";
import axios from "axios";

interface Driver {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  baseCity: string;
  rating: number;
  status: string;
  trips: number;
  licenseNumber: string;
  isVerified: boolean;
}

interface AssignDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  bookingRef: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  onDriverAssigned: (driver: Driver) => void;
}


const avatarColors = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-yellow-100 text-yellow-600",
];

const statusLabel: Record<string, string> = {
  available: "Available",
  on_trip: "On trip",
  off_duty: "Off duty",
};

export default function AssignDriverModal({
  isOpen,
  onClose,
  bookingId,
  bookingRef,
  carName,
  pickupDate,
  returnDate,
  onDriverAssigned, // ← Added this to safely extract it from props
}: AssignDriverModalProps) {
  const [search, setSearch] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const queryClient = useQueryClient();

  const { data: driversData, isLoading } = useQuery({
    queryKey: ["adminDrivers"],
    queryFn: getAdminDriversApi,
    retry: false,
    enabled: isOpen,
  });

const mutation = useMutation({
  mutationFn: assignDriverApi,
 onSuccess: (res) => {
  toast.success(res.data?.message || "Driver assigned successfully");
  onDriverAssigned(selectedDriver!); // ← This will now work perfectly without crashing
  queryClient.invalidateQueries({ queryKey: ["singleBooking", bookingId] });
  onClose();
  },
  onError: (error) => {
    if (import.meta.env.DEV) console.error(error);
    if (axios.isAxiosError(error)) {
     
      toast.error(error?.response?.data?.message || "Failed to assign driver");
    } else {
      toast.error("Something went wrong");
    }
  },
});

const handleAssign = () => {

  if (!selectedDriver) return;
  mutation.mutate({ bookingId, driverId: selectedDriver._id });
};

  

  if (!isOpen) return null;

  const drivers: Driver[] = driversData?.data?.body?.driver ?? [];

  const filtered = drivers.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.fullName.toLowerCase().includes(q) ||
      d.phoneNumber.includes(q) ||
      d.licenseNumber.toLowerCase().includes(q)
    );
  });

  const availableDrivers = filtered.filter((d) => d.status === "available");
  const busyDrivers = filtered.filter((d) => d.status !== "available");

 

  const DriverCard = ({ driver, index }: { driver: Driver; index: number }) => {
    const initials = driver.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const isSelected = selectedDriver?._id === driver._id;
    const isAvailable = driver.status === "available";

    return (
      <div
        onClick={() => isAvailable && setSelectedDriver(driver)}
        className={`flex items-center justify-between p-3 rounded-xl transition cursor-pointer ${
          isSelected ? "bg-orange-50 border border-orange-200" : "hover:bg-gray-50"
        } ${!isAvailable ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${avatarColors[index % avatarColors.length]}`}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800">{driver.fullName}</p>
              {isSelected && <Check size={14} className="text-orange-500" />}
              {driver.status !== "available" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {statusLabel[driver.status] || driver.status}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {driver.licenseNumber} · {driver.phoneNumber} · {driver.trips} Trips
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
          <Star size={14} className="text-orange-400 fill-orange-400" />
          {driver.rating.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 border-2 border-dashed border-blue-200 m-4 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold text-gray-900">Assign driver</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-400">
            For booking {bookingRef} · {carName} · {pickupDate} → {returnDate}
          </p>
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="relative border-2 border-dashed border-blue-200 rounded-xl px-4 py-2 flex items-center gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Drivers list */}
        <div className="px-4 max-h-96 overflow-y-auto border-2 border-dashed border-blue-200 mx-4 rounded-xl mb-4">
          {isLoading ? (
            <p className="text-sm text-gray-400 text-center py-6">Loading drivers...</p>
          ) : (
            <>
              {availableDrivers.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-3">
                    Available Now ({availableDrivers.length})
                  </p>
                  {availableDrivers.map((driver, i) => (
                    <DriverCard key={driver._id} driver={driver} index={i} />
                  ))}
                </>
              )}

              {busyDrivers.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-3">
                    Currently Busy
                  </p>
                  {busyDrivers.map((driver, i) => (
                    <DriverCard key={driver._id} driver={driver} index={i + availableDrivers.length} />
                  ))}
                </>
              )}

              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No drivers found</p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDriver || mutation.isPending}
            className="flex-1 bg-[#F97316] text-white rounded-full py-3 text-sm font-medium hover:bg-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Assigning..." : "Assign driver"}
          </button>
        </div>
      </div>
    </div>
  );
}