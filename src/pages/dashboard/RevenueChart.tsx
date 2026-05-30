import { AreaChart, Area, XAxis, YAxis,  Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'D1', card: 120, paystack: 100 },
  { name: 'D5', card: 160, paystack: 110 },
  // ... rest of your backend data
];

export const RevenueChart = () => (
  <div className="bg-white py-5 p-6 rounded-2xl border border-gray-100 shadow-sm h-120 lg:h-111">
    <div className="flex justify-between items-start ">
      <div>
        <h3 className="lg:text-xl font-bold text-gray-900">Revenue Overview</h3>
        <p className="text-gray-400 text-sm">Last 30 days</p>
      </div>
      <div className="flex bg-gray-100  p-1 rounded-full text-xs font-medium">
        <button className="bg-white px-1 lg:px-4 py-1 rounded-full shadow-sm">Daily</button>
        <button className="px-1 lg:px-4 py-1 text-gray-500">Weekly</button>
        <button className="px-1 lg:px-4 py-1 text-gray-500">Monthly</button>
      </div>
    </div>

    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
        <Tooltip />
        <Area type="monotone" dataKey="card" stroke="#f97316" fillOpacity={1} fill="url(#colorCard)" strokeWidth={2} />
        <Area type="monotone" dataKey="paystack" stroke="#111827" fill="transparent" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
    
    <div className="flex gap-6 lg:mt-4 text-sm font-medium">
      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"/> Card payments</div>
      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-900"/> Paystack</div>
    </div>
  </div>
);