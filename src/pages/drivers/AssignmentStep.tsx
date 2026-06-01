import FormSelect from "@/components/FormSelect";
import { useFormContext } from "react-hook-form";

export default function AssignmentStep() {
  const { watch } = useFormContext();
  const values = watch();

  return (
    <div className="space-y-6">
      {" "}
      <FormSelect
        name="status"
        label="Status"
        options={[
          {
            label: "Available",
            value: "available",
          },
          {
            label: "On Trip",
            value: "on-trip",
          },
          {
            label: "Off Duty",
            value: "off-duty",
          },
          {
            label: "Inactive",
            value: "inactive",
          },
        ]}
      />
      
      <div className="rounded-2xl bg-gray-100 p-4">
        
        <h3 className="mb-4 font-semibold"> Summary </h3>
        <div className="space-y-2 mt-3">
            <div className="flex justify-between">
                <p>Name:</p>
                <p>{values.fullName}</p>
            </div>
            <div className="flex justify-between">
                <p>Phonenumber:</p>
                <p>{values.phoneNumber}</p>
            </div>
            <div className="flex justify-between">
                <p>License:</p>
                <p>{values.licenseNumber}</p>
            </div>
            <div className="flex justify-between">
                <p>Language:</p>
                <p>{values.LANGUAGES}</p>
            </div>
            <div className="flex justify-between">
                <p>Status:</p>
                <p>{values.status}</p>
            </div>
            <div className="flex justify-between">
                <p>Verified:</p>
                <p>{values.isVerified}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
