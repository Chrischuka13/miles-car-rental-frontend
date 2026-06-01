import { AlertCircle, MessageCircle, Settings, X } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  title: string;
  details: string;
}

interface ActionRequiredProps {
  data: { alertCount: number; alerts: Alert[] };
}

const alertConfig = [
  { icon: <AlertCircle className="text-red-500" size={20} />, iconBg: "bg-red-50", accent: "border-red-500", btnBg: "bg-red-50 text-red-600", btnText: "View all" },
  { icon: <MessageCircle className="text-blue-500" size={20} />, iconBg: "bg-blue-50", accent: "border-blue-500", btnBg: "bg-blue-50 text-blue-600", btnText: "Reply" },
  { icon: <Settings className="text-yellow-500" size={20} />, iconBg: "bg-yellow-50", accent: "border-yellow-500", btnBg: "bg-yellow-50 text-yellow-600", btnText: "Schedule" },
];

const ActionRequired = ({ data = { alertCount: 0, alerts: [] } }: ActionRequiredProps) => {
  const [alerts, setAlerts] = useState(data.alerts ?? []);
  const [dismissingId, setDismissingId] = useState<string | null>(null);

  const handleDismissClick = (id: string) => {
    setDismissingId(id);
  };

  const handleConfirmDismiss = () => {
    setAlerts((prev) => prev.filter((a) => a.id !== dismissingId));
    setDismissingId(null);
  };

  const handleCancelDismiss = () => {
    setDismissingId(null);
  };

  const alertBeingDismissed = alerts.find((a) => a.id === dismissingId);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:mx-6 my-6">
        <div className="p-6 flex justify-between items-center border-b border-gray-300">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Action Required</h2>
            <p className="text-sm text-gray-400">Issues that need your attention right now</p>
          </div>
          <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
            {alerts.length} alerts
          </span>
        </div>

        {alerts.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            No action required at this time 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {alerts.map((item, i) => {
              const config = alertConfig[i % alertConfig.length];
              return (
                <div
                  key={item.id}
                  className={`p-6 flex flex-col justify-between border-gray-100 ${i !== 0 ? 'md:border-l' : ''} relative`}
                >
                  <div className={`absolute left-0 top-1/4 bottom-1/4 border-l-4 rounded-r-lg ${config.accent}`} />
                  <div className="flex gap-4 mb-6">
                    <div className={`p-3 rounded-full h-fit ${config.iconBg}`}>
                      {config.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button className={`px-6 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-80 ${config.btnBg}`}>
                      {config.btnText}
                    </button>
                    <button
                      onClick={() => handleDismissClick(item.id)}
                      className="flex items-center gap-1 text-gray-400 text-xs font-medium bg-gray-50 px-3 py-2 rounded-full hover:bg-gray-100"
                    >
                      <X size={14} /> Dismiss
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm Dismiss Modal */}
      {dismissingId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <X size={20} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Dismiss Alert</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Are you sure you want to dismiss this alert?
            </p>
            <p className="text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-xl mb-6">
              "{alertBeingDismissed?.title}"
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDismiss}
                className="flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDismiss}
                className="flex-1 bg-red-500 text-white rounded-full py-3 text-sm font-medium hover:bg-red-600 transition"
              >
                Yes, Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionRequired;