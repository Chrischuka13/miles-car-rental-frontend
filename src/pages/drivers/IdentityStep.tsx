import FormInput from "@/components/FormInput";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const LANGUAGES = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Yoruba",
    value: "yoruba",
  },
  {
    label: "Igbo",
    value: "igbo",
  },
  {
    label: "Hausa",
    value: "hausa",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "Pidgin",
    value: "pidgin",
  },
];

export default function IdentityStep() {
  const { setValue, control, register, formState: {errors}, } = useFormContext();

    useEffect(() => {
    register("languages")
  }, [register]);

  const selectedLanguage = useWatch({control, name: "languages"})  || [];
  const toggleLanguage = (language: string) => {
    if (selectedLanguage.includes(language)) {
      setValue(
        "languages",
        selectedLanguage.filter((l: string) => l !== language),
        {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        }
      );
    } else {
      setValue("languages", [...selectedLanguage, language],
        {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        }
      );
    }
  };

  



  return (
    <div className="space-y-5">
      {" "}
      <FormInput name="fullName" label="Full Name" />{" "}
      <FormInput name="phoneNumber" label="Phone Number" />{" "}
      <FormInput name="email" label="Email" />{" "}
      <FormInput name="baseCity" label="Base City" />{" "}
      <FormInput
        name="yearsOfExperience"
        label="Years Of Experience"
        type="number"
      />
      <div>

        <label className="mb-3 block"> Languages </label>{" "}
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => {
            const active = selectedLanguage.includes(
              lang.value
            );

            return (
              <button
                type="button"
                key={lang.value}
                onClick={() =>
                  toggleLanguage(lang.value)
                }
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {lang.label}
              </button>
              
            );
            
          })}
            {errors.languages && (
            <p className="mt-2 text-sm text-red-500">
              {errors.languages.message as string}
            </p>
            )}
        </div>
      </div>
    </div>
  );
}
