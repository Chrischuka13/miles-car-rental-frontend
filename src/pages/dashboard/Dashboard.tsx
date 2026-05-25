import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Calendar, Wallet, Car, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import { RevenueChart } from "@/pages/dashboard/RevenueChart";
import { FleetStatus } from "@/pages/dashboard/FleetStatus";

import { ActivityTimeline } from "@/pages/dashboard/ActivityTimeLine";
import { TopPerformingVehicles } from "@/pages/dashboard/TopPerformingVehicle";
import { RevenueOverview } from "@/pages/dashboard/RevenueOverview";
import ActionRequired from "./ActionRequired";

export default function Dashboard() {
  const { user } = useAuth();

  type FilterOption = "Today" | "7d" | "30d" | "Custom";

  const [selected, setSelected] = useState<FilterOption>("30d");

  const options: FilterOption[] = ["Today", "7d", "30d", "Custom"];

  const getGreeting = (name: string) => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return `Good morning, ${name}`;
    } else if (hour >= 12 && hour < 17) {
      return `Good afternoon, ${name}`;
    } else {
      return `Good evening, ${name}`;
    }
  };

  const stats = [
    {
      title: "Active Bookings",
      value: "42",
      trend: 12,
      icon: <Calendar size={20} className="text-orange-500" />,
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Revenue (₦)",
      value: "8.4M",
      trend: 6.2,
      icon: <Wallet size={20} className="text-blue-500" />,
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Fleet Utilization",
      value: "78%",
      trend: -2.1,
      icon: <Car size={20} className="text-green-500" />,
      iconBgColor: "bg-green-100",
    },
    {
      title: "New Customers",
      value: "134",
      trend: 13,
      icon: <Users size={20} className="text-yellow-500" />,
      iconBgColor: "bg-yellow-100",
    },
  ];



  return (
    <div className="container mx-auto px-6 pt-20">
      <div className="lg:flex lg:justify-between">
        <div>
          <h1 className="text-xl lg:text-4xl pb-4">
            {getGreeting(user?.firstName)} 👋
          </h1>
          <p className="text-lg pb-2 lg:text-md text-center text-[#393E46] ">
            Manage your team with confidence today.
          </p>
        </div>
        <div className="flex items-center gap-1 border border-gray-200 rounded-2xl p-1 bg-white">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-4 py-1 w-full  rounded-full text-sm font-medium transition-all duration-200 ${
                selected === option
                  ? "bg-[#111827] text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1 md:p-6 bg-gray-50">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:px-6 md:pb-6  py-3 md:py-0">
        {/* Revenue Overview - Takes up 2 columns on large screens  */}
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>

        {/* Fleet Status - Takes up 1 column */}
        <div className="lg:col-span-4">
          <FleetStatus />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:p-6 bg-gray-50">
        <RevenueOverview />
        <TopPerformingVehicles />
        <ActivityTimeline />
      </div>
      <section className="">
        <ActionRequired />
      </section>
    </div>
  );
}
