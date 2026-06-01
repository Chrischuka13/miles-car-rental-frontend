import { Search } from "lucide-react";

type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;
};

export default function DriverSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative flex items-center md:gap-2 md:justify-end mb-4">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search name, license..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-DeepOrange w-36 md:w-64"
      />
    </div>
  );
}