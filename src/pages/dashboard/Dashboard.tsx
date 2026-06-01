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
import { getAdminDashboardStatsApi } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuth();
  type FilterOption = "Today" | "7d" | "30d" | "Custom";

    const [selected, setSelected] = useState<FilterOption>("30d");

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["dashboardStats"],
  //   queryFn: getAdminDashboardStatsApi,
  //   retry: false,
  // });

  const { data, isLoading, isError } = useQuery({
  queryKey: ["dashboardStats", selected], // ← selected as dependency
  queryFn: () => getAdminDashboardStatsApi(selected),
  retry: false,
});


  

  const body = data?.data?.body;
  const summaryCards = body?.summaryCards;


  const options: FilterOption[] = ["Today", "7d", "30d", "Custom"];

  const getGreeting = (name: string) => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return `Good morning, ${name}`;
    else if (hour >= 12 && hour < 17) return `Good afternoon, ${name}`;
    else return `Good evening, ${name}`;
  };

  const stats = [
    {
      title: "Total Bookings",
      value: isLoading ? "..." : String(summaryCards?.activeBookings?.value ?? 0),
      trend: 0,
      icon: <Calendar size={20} className="text-orange-500" />,
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Revenue (₦)",
      value: isLoading ? "..." : summaryCards?.revenue?.formattedValue ?? "₦0",
      trend: parseFloat(summaryCards?.revenue?.percentageChange ?? "0"),
      icon: <Wallet size={20} className="text-blue-500" />,
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Fleet Utilization",
      value: isLoading ? "..." : summaryCards?.fleetUtilization?.value ?? "0%",
      trend: parseFloat(summaryCards?.fleetUtilization?.percentageChange ?? "0"),
      icon: <Car size={20} className="text-green-500" />,
      iconBgColor: "bg-green-100",
    },
    {
      title: "New Customers",
      value: isLoading ? "..." : String(summaryCards?.newCustomers?.value ?? 0),
      trend: parseFloat(summaryCards?.newCustomers?.percentageChange ?? "0"),
      icon: <Users size={20} className="text-yellow-500" />,
      iconBgColor: "bg-yellow-100",
    },
  ];

  if (isError) return <div className="p-6 pt-24 text-red-500">Failed to load dashboard.</div>;

  return (
    <div className="container mx-auto px-6 md:pt-20">
      <div className="lg:flex lg:justify-between">
        <div>
          <h1 className="text-xl lg:text-4xl py-4 font-semibold">
            {getGreeting(user?.firstName ?? "")} 👋
          </h1>
          <p className="text-lg lg:text-md text-[#393E46] mb-4">
            Manage your team with confidence today.
          </p>
        </div>
        <div className="flex items-center gap-1 border border-gray-200 rounded-2xl p-1 bg-white mb-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-4 py-1 w-full rounded-full text-sm font-medium transition-all duration-200 ${
                selected === option
                  ? "bg-DarkBlue text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1 md:p-6 bg-gray-50">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:px-6 md:pb-6 py-3 md:py-0">
        <div className="lg:col-span-8">
          <RevenueChart data={body?.revenueChart?.timelineData ?? []} />
        </div>
        <div className="lg:col-span-4">
          <FleetStatus data={body?.fleetStatus?.breakdown ?? []} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6 md:px-6 lg:p-6 bg-gray-50">
        <RevenueOverview data={body?.liveOverviewList ?? []} />
        <TopPerformingVehicles data={body?.topVehicles ?? []} />
        <ActivityTimeline data={body?.activityFeed ?? []} />
      </div>

      <section className="md:px-6 lg:px-0">
        <ActionRequired data={body?.actionRequired ?? {}} />
      </section>
    </div>
  );
}