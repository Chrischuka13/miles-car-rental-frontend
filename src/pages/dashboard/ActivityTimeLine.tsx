interface Activity {
  _id: string;
  label: string;
  variant: string;
  createdAt: string;
}

interface ActivityTimelineProps {
  data: Activity[];
}

const variantColor: Record<string, string> = {
  info: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  success: 'bg-orange-500',
};

const formatTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const ActivityTimeline = ({ data = [] }: ActivityTimelineProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
      <div className="relative border-l-2 border-gray-100 ml-2 space-y-8">
        {data.length > 0 ? data.map((act) => (
          <div key={act._id} className="relative pl-6">
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${variantColor[act.variant] || 'bg-gray-400'}`} />
            <p className="text-sm font-medium text-gray-700">{act.label}</p>
            <p className="text-xs text-gray-400">{formatTimeAgo(act.createdAt)}</p>
          </div>
        )) : (
          <p className="text-sm text-gray-400 pl-6">No recent activity</p>
        )}
      </div>
    </div>
  );
};