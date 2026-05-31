type Props = {
  activeTab: string;

  setActiveTab: (
    value: string
  ) => void;

  stats: {
    total: number;
    available: number;
    onTrip: number;
    offDuty: number;
    inactive: number;
  };
};

const tabs = [
  {
    label: "All",
    value: "all",
    key: "total",
  },

  {
    label: "Available",
    value: "available",
    key: "available",
  },

  {
    label: "On trip",
    value: "on-trip",
    key: "onTrip",
  },

  {
    label: "Off duty",
    value: "off-duty",
    key: "offDuty",
  },

  {
    label: "Inactive",
    value: "inactive",
    key: "inactive",
  },
];

export default function DriverStatusTabs({
  activeTab,
  setActiveTab,
  stats,
}: Props) {
  return (
    <div className="flex gap-8 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() =>
            setActiveTab(tab.value)
          }
          className={`border-b-2 pb-2 text-sm font-medium transition ${
            activeTab === tab.value
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500"
          }`}
        >
          {tab.label} (
          {
            stats[
              tab.key as keyof typeof stats
            ]
          }
          )
        </button>
      ))}
    </div>
  );
}