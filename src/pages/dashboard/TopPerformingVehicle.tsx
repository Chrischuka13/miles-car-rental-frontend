interface Vehicle {
  brand: string;
  modelName: string;
  tripsCount: number;
  totalEarned: number;
  image: { url: string };
}

interface TopPerformingVehiclesProps {
  data: Vehicle[];
}

const bgColors = ['bg-orange-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50'];

const formatNaira = (amount: number) => {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
  return `₦${amount}`;
};

export const TopPerformingVehicles = ({ data = [] }: TopPerformingVehiclesProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Top Performing Vehicles</h3>
      <div className="space-y-3">
        {data.length > 0 ? data.map((v, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${bgColors[i % bgColors.length]}`}>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 font-bold">#{i + 1}</span>
              <div>
                <p className="font-bold text-sm">{v.brand} {v.modelName}</p>
                <p className="text-xs text-gray-400">{v.tripsCount} trips</p>
              </div>
            </div>
            <p className="font-bold">{formatNaira(v.totalEarned)}</p>
          </div>
        )) : (
          <p className="text-sm text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
};