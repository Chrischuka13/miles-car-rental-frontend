import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const fleetData = [
  { name: 'Available', value: 38, color: '#22c55e' },
  { name: 'On trip', value: 18, color: '#f97316' },
  { name: 'Maintenance', value: 6, color: '#111827' },
  { name: 'Reserved', value: 9, color: '#4b5563' },
];

export const FleetStatus = () => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-900">Fleet Status</h3>
      <button className="text-orange-500 font-medium text-sm">Manage Fleet</button>
    </div>

    <div className="h-50 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={fleetData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
            {fleetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold">72</span>
        <span className="text-gray-400 text-xs">Total Vehicles</span>
      </div>
    </div>

    <div className="space-y-3 mt-4">
      {fleetData.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}/>
            {item.name}
          </div>
          <span className="font-bold text-gray-900">{item.value} Vehicles</span>
        </div>
      ))}
    </div>
  </div>
);