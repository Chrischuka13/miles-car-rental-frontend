interface Props {
  status: string;
}
export default function DriverStatusBadge({ status }: Props) {
  const colors = {
    available: "bg-green-100 text-green-700",
    "on-trip": "bg-blue-100 text-blue-700",
    "off-duty": "bg-yellow-100 text-yellow-700",
    inactive: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm ${colors[status as keyof typeof colors]}`}
    >
      {" "}
      {status}{" "}
    </span>
  );
}
