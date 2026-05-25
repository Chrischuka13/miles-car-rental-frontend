

// export default function ActivityTimeLine() {
export const ActivityTimeline = () => {
  const activities = [
    { text: "Booking Miles - 8F2A1C confirmed", time: "2m ago", color: "bg-green-500" },
    { text: "Payment ₦185,000 received via paystack", time: "15m ago", color: "bg-orange-500" },
    { text: "Lexus RX 350 marked for service", time: "1h ago", color: "bg-yellow-500" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
      <div className="relative border-l-2 border-gray-100 ml-2 space-y-8">
        {activities.map((act, i) => (
          <div key={i} className="relative pl-6">
            {/* The Dot */}
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${act.color}`} />
            <p className="text-sm font-medium text-gray-700">{act.text}</p>
            <p className="text-xs text-gray-400">{act.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
