// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import type { Resolver } from "react-hook-form";

// import { validateDriverSchema, type DriverFormValues } from "@/lib/schemaTypes";
// import { useState } from "react";
// import { useCreateDriver } from "@/hooks/useCreateDriver";
// import IdentityStep from "./IdentityStep";
// import LicenseStep from "./LicenseStep";
// import AssignmentStep from "./AssignmentStep";

// interface Props {
//   onClose: () => void;
//  }

// export default function DriverForm({ onClose }: Props) {
//   const methods = useForm<DriverFormValues>({
//     // cast resolver to the exact form value type to satisfy TS
//     resolver: zodResolver(validateDriverSchema) as unknown as Resolver<DriverFormValues>,
//     // ...existing code...
//     defaultValues: {
//       fullName: "",
//       phoneNumber: "",
//       email: "",
//       baseCity: "",
//       yearsOfExperience: 0,
//       languages: ["en"],
//       licenseNumber: "",
//       expiryDate: "",
//       isVerified: false,
//       status: "available",
//       trips: 0,
//     },

//     mode: "onChange",
//   });

//   const {
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = methods;

//   const [step, setStep] = useState(1);

//   const { mutate, isPending } = useCreateDriver();

//   const nextStep = async () => {
//     let valid = false;

//     if (step === 1) {
//       valid = await trigger([
//         "fullName",
//         "phoneNumber",
//         "email",
//         "baseCity",
//         "yearsOfExperience",
//         "languages",
//       ]);
//     }

//     if (step === 2) {
//       valid = await trigger([
//         "licenseNumber",
//         "expiryDate",
//       ]);
//     }

//     if (!valid) return;

//     setStep((prev) => prev + 1);
//   };

//   const onSubmit = (data: DriverFormValues) => {
//     mutate(data, { onSuccess: () =>{
//       onClose()
//       },
//     });
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {step === 1 && <IdentityStep />}
//         {step === 2 && <LicenseStep />}
//         {step === 3 && <AssignmentStep />}

//         <button type="button" onClick={nextStep}>
//           Continue
//         </button>

//         {step === 3 && (
//           <button type="submit">
//             {isPending ? "Creating..." : "Create Driver"}
//           </button>
//         )}
//       </form>
//     </FormProvider>
//   );
// }

import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateDriverSchema,
  type DriverFormValues,
} from "@/lib/schemaTypes";
import IdentityStep from "./IdentityStep";
import LicenseStep from "./LicenseStep";
import AssignmentStep from "./AssignmentStep";
import { useCreateDriver } from "@/hooks/useCreateDriver";


interface Props {
  onClose: () => void;
}
export default function DriverForm({ onClose }: Props) {
  const [step, setStep] = useState(1);
const methods = useForm<DriverFormValues>({
  resolver: zodResolver(validateDriverSchema) as unknown as Resolver<DriverFormValues>,
  mode: "onChange",
  reValidateMode: "onChange",
  shouldFocusError: true,
  shouldUnregister: false,

  defaultValues: {
    fullName: "",
    phoneNumber: "",
    email: "",
    baseCity: "",
    yearsOfExperience: undefined,
    languages: [],
    licenseNumber: "",
    expiryDate: "",
    isVerified: false,
    status: "available",
    trips: 0,
  },
});
  const { handleSubmit, trigger } = methods;
  const { mutate, isPending } = useCreateDriver();

  const nextStep = async () => {
    let fields: any[] = [];

    if (step === 1) {
      fields = [
        "fullName",
        "phoneNumber",
        "email",
        "baseCity",
        "yearsOfExperience",
        "languages",
      ];
    }

    if (step === 2) {
      fields = [
        "licenseNumber",
        "expiryDate",
      ];
  }


  const valid = await trigger(fields);

  if (!valid) {
    toast.error(
      "Please fix the highlighted fields before continuing"
    );
    return;
  }

  console.log("valid:", valid);
console.log(methods.formState.errors);

  

  setStep((prev) => prev + 1);
};
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  
const onSubmit = (
  data: DriverFormValues
) => {

  const payload = {
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    baseCity: data.baseCity,
    yearsOfExperience:
      Number(
        data.yearsOfExperience
      ),

    languages: data.languages,

    licenseNumber:
      data.licenseNumber,

    expiryDate:
      data.expiryDate,

    isVerified:
      data.isVerified,

    status: data.status,

    trips: 0,
  };

   import.meta.env.DEV && console.log(payload);

  mutate(payload);
};

function StepItem({
  active,
  completed,
  label,
  step,
}: {
  active: boolean;
  completed: boolean;
  label: string;
  step: number;
})

 {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
        ${
          active
            ? "bg-DeepOrange text-white" : completed
            ? "bg-green-500 text-white" : "border border-gray-300 text-gray-500"
        }`}
      >
        {completed ? "✓" : step}
      </div>

      <span
        className={`text-sm font-medium ${
          active ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
function Line() {
  return <div className="mx-4 h-px flex-1 bg-gray-200" />;
}

  return (
  <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
        {/* Steps Header */}
        <div className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start md:items-center justify-between ">
            <StepItem active={step === 1} completed={step > 1} label="Identity" step={1} />
            <Line />
            <StepItem active={step === 2} completed={step > 2} label="License" step={2} />
            <Line />
            <StepItem active={step === 3} completed={false} label="Assignment" step={3} />
          </div>
        </div>

        {/* Step Views */}
        {step === 1 && <IdentityStep />}
        {step === 2 && <LicenseStep />}
        {step === 3 && <AssignmentStep />}

        {/* Action Controls */}
          <div className="flex justify-between gap-6 w-full">
            <button 
              type="button" 
              onClick={step === 1 ? onClose : prevStep}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition" 
            >
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 bg-[#F97316] text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition shadow-sm"
              >
                Continue
              </button>
            ) : (
              /* Submit Button - This is the ONLY one allowed to submit the form */
              <button 
                type="submit" 
                disabled={isPending} 
                className="flex-1 py-3 bg-[#F97316] text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition shadow-sm disabled:opacity-50"
              >
                {isPending ? "Creating..." : "Create Driver"}
              </button>
            )}
          </div>
      </form>
    </FormProvider>
  );
}
