import { useFormContext } from "react-hook-form";
interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}
export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name as keyof typeof errors];
  return (
    <div>
      {" "}
      <label className="mb-2 block text-sm font-medium"> {label} </label>{" "}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
        className={`w-full rounded-xl px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{String(error.message)}</p>
      )}
    </div>
  );
}
