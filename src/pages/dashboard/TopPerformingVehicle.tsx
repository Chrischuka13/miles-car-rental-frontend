

export const TopPerformingVehicles = () => {
  const vehicles = [
    { rank: "#1", name: "Lexus RX 350", trips: "28 trips", amount: "₦1.42M", bg: "bg-orange-50" },
    { rank: "#2", name: "Mercedes GLE 450", trips: "24 trips", amount: "₦1.31M", bg: "bg-blue-50" },
    { rank: "#3", name: "Toyota Camry XLE", trips: "22 trips", amount: "₦820K", bg: "bg-green-50" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Top Performing Vehicles</h3>
      <div className="space-y-3">
        {vehicles.map((v, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${v.bg}`}>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 font-bold">{v.rank}</span>
              <div>
                <p className="font-bold text-sm">{v.name}</p>
                <p className="text-xs text-gray-400">{v.trips}</p>
              </div>
            </div>
            <p className="font-bold">{v.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
