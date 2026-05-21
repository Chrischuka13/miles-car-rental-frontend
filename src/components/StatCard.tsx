
import React from 'react';
import { ArrowRight, MoveUpRight, MoveDownLeft } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, iconBgColor }) => {
  const isPositive = trend > 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      {/* Top Section: Icon and Title */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
        <h3 className="text-gray-600 font-medium text-sm lg:text-base">{title}</h3>
      </div>

      {/* Middle Section: Value and Trend */}
      <div className="mt-4 flex items-end gap-3">
        <span className="text-3xl lg:text-4xl font-bold text-gray-900">{value}</span>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold mb-1
          ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {Math.abs(trend)}%
          {isPositive ? <MoveUpRight size={12} /> : <MoveDownLeft size={12} />}
        </div>
      </div>

      {/* Bottom Section: Action Link */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
        <button className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
          View details
        </button>
        <ArrowRight size={18} className="text-gray-300" />
      </div>
    </div>
  );
};

export default StatCard;
