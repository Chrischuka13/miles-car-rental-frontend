import { useFormContext } from "react-hook-form";
interface Props {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}
export default function FormSelect({ name, label, options }: Props) {
  const { register } = useFormContext();
  return (
    <div>
      {" "}
      <label className="mb-2 block text-sm font-medium"> {label} </label>{" "}
      <select
        {...register(name)}
        className="w-full rounded-xl border px-4 py-3"
      >
        {" "}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {" "}
            {option.label}{" "}
          </option>
        ))}{" "}
      </select>{" "}
    </div>
  );
}
