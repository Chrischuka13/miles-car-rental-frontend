type Props = {
  stats: {
    total: number;
    onTrip: number;
    available: number;
    avgRating: string;
  };
};

export default function DriverStats({
  stats,
}: Props) {
  const cards = [
    {
      label: "ACTIVE DRIVERS",
      value: stats.total,
    },

    {
      label: "ON TRIP NOW",
      value: stats.onTrip,
    },

    {
      label: "AVAILABLE TODAY",
      value: stats.available,
    },

    {
      label: "AVG RATING",
      value: stats.avgRating,
    },
  ];

  return (
    <div className="grid grid-cols space-y-3 md:grid-cols-4 gap-5 mb-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-white p-3"
        >
          <p className="text-sm text-gray-500">
            {card.label}
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}