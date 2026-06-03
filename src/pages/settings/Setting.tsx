import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { updateAdminSettingsApi } from "@/api/admin";
import { Building2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

interface SettingsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
}

export default function Setting() {
  const { user, refetchUser } = useAuth();

  const { register, handleSubmit, reset } = useForm<SettingsForm>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: updateAdminSettingsApi,
    onSuccess: async (res) => {
      toast.success(res?.data?.message || "Settings updated successfully!");
      if (refetchUser) await refetchUser();
      reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        password: "",
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Failed to update settings");
      } else {
        toast.error("Failed to update settings");
      }
    },
  });

  const onSubmit = (data: SettingsForm) => {
    const payload: Partial<SettingsForm> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    if (data.password?.trim()) {
      payload.password = data.password;
    }
    updateSettingsMutation.mutate(payload as SettingsForm);
  };

  return (
    <main className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10 overflow-y-auto">
      {/* Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pt-20 lg:pt-30 pb-8 lg:pb-20">
        <div>
          <h1 className="text-2xl lg:text-[28px] font-bold">Setting</h1>
          <p className="text-[#656565] text-sm lg:text-[16px]">
            Manage your business profile and account security
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 border rounded-full py-2 px-4 w-fit">
          <img src="/confirm.svg" alt="" />
          <p className="text-sm">All changes saved</p>
        </div>
      </section>

      {/* Business Profile */}
      <section className="bg-white rounded-[15px] p-4 sm:p-6 lg:p-7.5">
        <div className="flex items-start gap-4 px-0 lg:px-5 mb-5">
          <div className="rounded-full p-1 bg-[#E9E9E9]">
            <Building2 />
          </div>
          <div>
            <p className="text-lg lg:text-[20px] font-semibold text-[#1E1E1E]">
              Business profile
            </p>
            <p className="text-sm text-gray-600">
              Used on invoices, receipts and customer-facing communication.
            </p>
          </div>
        </div>

        <hr />

        <form className="space-y-6 mt-8 lg:mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:px-5">
            <div>
              <label className="block mb-2">First name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                defaultValue={user?.firstName}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
            <div>
              <label className="block mb-2">Last name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                 defaultValue={user?.lastName}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:px-5">
            <div>
              <label className="block mb-2">Support email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                defaultValue={user?.email}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
            <div>
              <label className="block mb-2">Support phone</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:px-5">
            <div>
              <label className="block mb-2">
                Password
                <span className="text-gray-400 text-xs ml-2">(leave blank to keep current)</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
          </div>

          <hr className="mt-10" />

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-5 pt-4">
            <button
              type="button"
              onClick={() => reset({
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                phone: user?.phone || "",
                password: "",
              })}
              className="px-6 py-3 border rounded-[25px] w-full sm:w-auto hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F97316] text-white rounded-[25px] w-full sm:w-auto hover:bg-orange-600 transition disabled:opacity-50"
              disabled={updateSettingsMutation.isPending}
            >
              {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-[15px] p-4 sm:p-6 lg:p-7.5 mt-5">
        <div className="flex items-start gap-4 px-0 lg:px-5 mb-5">
          <div>
            <ShieldCheck />
          </div>
          <div>
            <p className="text-lg lg:text-[20px] font-semibold text-[#1E1E1E]">
              Danger zone
            </p>
            <p className="text-sm text-gray-600">
              Irreversible actions for this workspace.
            </p>
          </div>
        </div>
        <hr />
        <div className="border rounded-[15px] p-4 md:p-5 mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm md:text-base">Delete workspace</p>
            <p className="text-[11px] md:text-[12px] text-[#656565]">
              Permanently remove all bookings, vehicles, drivers and customers.
            </p>
          </div>
          <button className="text-white bg-red-500 hover:bg-red-600 cursor-pointer p-2 rounded-[5px] transition">
            Delete workspace
          </button>
        </div>
      </section>
    </main>
  );
}