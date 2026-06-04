import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: {
    date: string;
    amount: number;
    method: string;
    paystackAmount: number;
    bankTransferAmount: number;
  }[];
}

export const RevenueChart = ({ data = [] }: RevenueChartProps) => {
  const chartData = data.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    paystack: item.paystackAmount || item.amount, // ← fallback to amount if paystackAmount is 0
    bankTransfer: item.bankTransferAmount,
    total: item.amount,
  }));

  return (
    <div className="bg-white py-5 p-6 rounded-2xl border border-gray-100 shadow-sm h-120 lg:h-111">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="lg:text-xl font-bold text-gray-900">
            Revenue Overview
          </h3>
          <p className="text-gray-400 text-sm">Last 30 days</p>
        </div>
       
        
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCard" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#f97316"
            fillOpacity={1}
            fill="url(#colorCard)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="bankTransfer"
            stroke="#111827"
            fill="transparent"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex gap-6 lg:mt-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500" /> Paystack
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-900" /> Bank Transfer
        </div>
      </div>
    </div>
  );
};
