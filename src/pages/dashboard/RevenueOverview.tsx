import { Clock3 } from "lucide-react";


  
export const RevenueOverview = () => {
const bookings = [
    { time: "9:30", name: "Lexus RX 350", loc: "Lekki Phase 1", status: "Upcoming", color: "text-orange-500 bg-orange-100" },
    { time: "10:15", name: "Toyota Camry", loc: "Ikeja GRA", status: "On trip", color: "text-green-500 bg-green-100" },
    { time: "11:45", name: "Mercedes GLE", loc: "MMA Terminal 2", status: "Upcoming", color: "text-orange-500 bg-orange-100" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-gray-800">Revenue Overview</h3>
        <button className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">View all</button>
      </div>
      <div className="space-y-4">
        {bookings.map((item, i) => (
          <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3">
            <div className="flex gap-3 items-center">
              <span className="text-xs text-gray-400 w-10">  <Clock3 />{item.time}</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-[10px] text-gray-400">{item.loc}</p>
              </div>
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${item.color}`}>
              ● {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
