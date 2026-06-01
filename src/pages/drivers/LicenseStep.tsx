import { Controller, useFormContext } from "react-hook-form";
import Toggle from "@/components/ui/Toggle";
import FormInput from "@/components/FormInput";

export default function LicenseStep() {
  const { control } = useFormContext();
  return (
    <div className="space-y-6">
      <FormInput name="licenseNumber" label="FRSC license number" />
      <FormInput name="expiryDate" label="Expiry Date" type="date" />
      
      <div className="flex justify-between gap-2 p-2 border rounded-xl">
        <div className="flex gap-2">
          <img src="/humbleicons_verified.svg" alt="" className="w-5"/>
          <div>
            <h6 className="font-semibold">Background check verified</h6>
            <p className="text-sm">Toggle on once compliance approves the driver.</p>
          </div>
        </div>

        <Controller
            name="isVerified"
            control={control}
            render={({ field }) => (
            <Toggle checked={field.value} onChange={field.onChange} />
            )}
        />
     </div>
    </div>
  );
}


