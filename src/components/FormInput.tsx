import { useFormContext, type FieldError } from "react-hook-form";

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

  const error = errors[name] as FieldError | undefined;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-xl border px-4 py-3 ${
          error
            ? "border-red-500"
            : "border-gray-300"
        }`}
      />

      {error?.message && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}