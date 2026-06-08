import { Clock3 } from "lucide-react";

interface LiveBooking {
  _id: string;
  bookingStatus: string;
  pickupLocation: string;
  pickupTime: string;
  car: { brand: string; modelName: string };
}

interface RevenueOverviewProps {
  data: LiveBooking[];
}

const statusColor: Record<string, string> = {
  Confirmed: 'text-green-500 bg-green-100',
  Pending: 'text-orange-500 bg-orange-100',
  Cancelled: 'text-red-500 bg-red-100',
  Completed: 'text-gray-500 bg-gray-100',
};

export const RevenueOverview = ({ data = [] }: RevenueOverviewProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-gray-800">Live Overview</h3>
        {/* <button className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">View all</button> */}
      </div>
      <div className="space-y-4">
        {data.length > 0 ? data.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b border-gray-50 pb-3">
            <div className="flex gap-3 items-center">
              <span className="text-xs text-gray-400 w-10 flex flex-col items-center">
                <Clock3 size={12} />
                {item.pickupTime}
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                {item.car?.brand?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.car?.brand} {item.car?.modelName}</p>
                <p className="text-[10px] text-gray-400">{item.pickupLocation}</p>
              </div>
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-full font-medium truncate ${statusColor[item.bookingStatus] || 'text-gray-500 bg-gray-100'}`}>
              ● {item.bookingStatus}
            </span>
          </div>
        )) : (
          <p className="text-sm text-gray-400">No live bookings</p>
        )}
      </div>
    </div>
  );
};