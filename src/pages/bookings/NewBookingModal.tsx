import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewBookingModal({ isOpen, onClose }: NewBookingModalProps) {
  const [step, setStep] = useState(1);

  // Step 1 - Customer Details
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");

  // Step 2 - Pickup Details
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [payment, setPayment] = useState("");

  if (!isOpen) return null;

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
    else onClose();
  };

  const handleCancel = () => {
    setStep(1);
    onClose();
  };

  // dummy price calculation
  const basePrice = 180000;
  const days = 3;
  const driverFee = withDriver ? 90000 : 0;
  const serviceFee = 21600;
  const total = basePrice * days + driverFee + serviceFee;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-8 relative max-h-[90vh] overflow-y-auto">

        {/* close button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {/* title */}
        <h2 className="text-xl font-bold text-gray-900">New booking</h2>
        <p className="text-gray-400 text-sm mt-1 mb-6">Create a reservation on behalf of a customer.</p>

        {/* steps indicator */}
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}>
              1
            </div>
            <span className={`text-sm font-medium ${step >= 1 ? "text-gray-900" : "text-gray-400"}`}>Customer Details</span>
          </div>

          <div className={`flex-1 h-px mx-3 ${step >= 2 ? "bg-[#F97316]" : "bg-gray-200"}`} />

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
            <span className={`text-sm font-medium ${step >= 2 ? "text-gray-900" : "text-gray-400"}`}>Pick up details</span>
          </div>

          <div className={`flex-1 h-px mx-3 ${step >= 3 ? "bg-[#F97316]" : "bg-gray-200"}`} />

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"}`}>
              3
            </div>
            <span className={`text-sm font-medium ${step >= 3 ? "text-gray-900" : "text-gray-400"}`}>Confirmation</span>
          </div>
        </div>

        {/* ── Step 1 - Customer Details ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Vehicle</label>
              <div className="relative">
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316] appearance-none bg-white"
                >
                  <option value="">Search and select Vehicle</option>
                  <option value="Lexus RX 350 - LSD-244-EK">Lexus RX 350 - LSD-244-EK</option>
                  <option value="Toyota Camry">Toyota Camry</option>
                  <option value="Mercedes GLE">Mercedes GLE</option>
                  <option value="Range Rover Velar">Range Rover Velar</option>
                  <option value="Toyota Corolla">Toyota Corolla</option>
                  <option value="Honda Accord">Honda Accord</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2 - Pickup Details ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Pickup Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Return Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            {/* Driver toggle */}
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-gray-700">Add a professional driver</span>
              <button
                type="button"
                onClick={() => setWithDriver(!withDriver)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${withDriver ? "bg-[#F97316]" : "bg-gray-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${withDriver ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>

            {/* Payment */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Payment</label>
              <div className="relative">
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#F97316] appearance-none bg-white"
                >
                  <option value="">Select payment</option>
                  <option value="Paystack">Paystack</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3 - Confirmation ── */}
        {step === 3 && (
          <div className="space-y-3 text-sm">

            {/* Customer */}
            <p className="text-xs font-bold  uppercase tracking-widest">Customer</p>
            <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{customerName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email Address</span>
                <span className="font-medium text-gray-900">{email || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone Number</span>
                <span className="font-medium text-gray-900">{phone || "—"}</span>
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Vehicle */}
            <p className="text-xs font-bold  uppercase tracking-widest">Vehicle</p>
            <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-medium text-gray-900">{vehicle || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pick up Location</span>
                <span className="font-medium text-gray-900">{pickupLocation || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Return Location</span>
                <span className="font-medium text-gray-900">{returnLocation || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dates</span>
                <span className="font-medium text-gray-900">
                  {pickupDate && returnDate ? `${pickupDate} → ${returnDate} (${days}d)` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Driver</span>
                <span className="font-medium text-gray-900">{withDriver ? "With driver" : "No driver"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="font-medium text-gray-900">{payment || "—"}</span>
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Price Breakdown */}
            <p className="text-xs font-bold  uppercase tracking-widest">Price Breakdown</p>
            <div className="space-y-2 bg-[#F9F7F4] p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">{days} × {formatNaira(basePrice)}</span>
                <span className="font-medium text-gray-900">{formatNaira(basePrice * days)}</span>
              </div>
              {withDriver && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver fee</span>
                  <span className="font-medium text-gray-900">{formatNaira(driverFee)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Service fee</span>
                <span className="font-medium text-gray-900">{formatNaira(serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dates</span>
                <span className="font-medium text-gray-900">
                  {pickupDate && returnDate ? `${pickupDate} → ${returnDate} (${days}d)` : "—"}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{formatNaira(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-[#F97316] text-white rounded-full py-3 text-sm font-medium hover:bg-orange-600 transition"
          >
            {step === 3 ? "Create Booking" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}