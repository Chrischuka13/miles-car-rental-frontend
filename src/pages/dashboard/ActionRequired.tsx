import { AlertCircle, MessageCircle, Settings, X } from 'lucide-react';

const ActionRequired = () => {
  const actions = [
    {
      title: "3 vehicles overdue for return",
      desc: "Combined ₦240,000 late fees pending. Customers notified",
      btnText: "View all",
      icon: <AlertCircle className="text-red-500" size={20} />,
      iconBg: "bg-red-50",
      accent: "border-red-500",
      btnBg: "bg-red-50 text-red-600"
    },
    {
      title: "8 unanswered customer messages",
      desc: "Average response time today: 12m (target 5m).",
      btnText: "Reply",
      icon: <MessageCircle className="text-blue-500" size={20} />,
      iconBg: "bg-blue-50",
      accent: "border-blue-500",
      btnBg: "bg-blue-50 text-blue-600"
    },
    {
      title: "5 vehicles due for maintenance",
      desc: "Scheduled service window: Thursday - Friday this week.",
      btnText: "Schedule",
      icon: <Settings className="text-yellow-500" size={20} />,
      iconBg: "bg-yellow-50",
      accent: "border-yellow-500",
      btnBg: "bg-yellow-50 text-yellow-600"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:mx-6 my-6">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-gray-300">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Action Required</h2>
          <p className="text-sm text-gray-400">Issues that need your attention right now</p>
        </div>
        <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
          3 alerts
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {actions.map((item, i) => (
          <div key={i} className={`p-6 flex flex-col justify-between border-gray-100 
            ${i !== 0 ? 'md:border-l' : ''} relative`}>
            
            {/* The thin vertical accent line on the very left */}
            <div className={`absolute left-0 top-1/4 bottom-1/4 border-l-4 rounded-r-lg ${item.accent}`} />

            <div className="flex gap-4 mb-6">
              <div className={`p-3 rounded-full h-fit ${item.iconBg}`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button className={`px-6 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-80 ${item.btnBg}`}>
                {item.btnText}
              </button>
              <button className="flex items-center gap-1 text-gray-400 text-xs font-medium bg-gray-50 px-3 py-2 rounded-full hover:bg-gray-100">
                <X size={14} /> Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionRequired;