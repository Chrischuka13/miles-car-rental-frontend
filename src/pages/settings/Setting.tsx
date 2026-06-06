import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { updateAdminSettingsApi } from "@/api/admin";
import { deleteWorkspaceApi } from "@/api/admin";
import { Building2, ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

interface SettingsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
}

export default function Setting() {
  const { user } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for confirmation modal
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<SettingsForm>({
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: updateAdminSettingsApi,
    onSuccess: async (res) => {
      toast.success(res?.data?.message || "Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["authuser"] });
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
        toast.error(
          error?.response?.data?.message || "Failed to update settings",
        );
      } else {
        toast.error("Failed to update settings");
      }
    },
  });

  const deleteWorkspaceMutation = useMutation({
    mutationFn: deleteWorkspaceApi,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Workspace deleted successfully");
      setIsDeleteModalOpen(false);
      window.location.href = "/auth/login";
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Failed to delete workspace",
        );
      } else {
        toast.error("Failed to delete workspace");
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
    <main className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10 overflow-y-auto relative">
      {/* Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:pt-20 lg:pt-30 pb-8 lg:pb-20">
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

        <form
          className="space-y-6 mt-8 lg:mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:px-5">
            <div>
              <label className="block mb-2">First name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
            <div>
              <label className="block mb-2">Last name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 lg:px-5">
            <div>
              <label className="block mb-2">Admin email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full py-3 px-5 rounded-[15px] border bg-[#E6E6E6] placeholder:text-DarkBlue placeholder:text-sm"
              />
            </div>
            <div>
              <label className="block mb-2">Admin phone</label>
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
                <span className="text-gray-400 text-xs ml-2">
                  (leave blank to keep current)
                </span>
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
              onClick={() =>
                reset({
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  password: "",
                })
              }
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
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-white bg-red-500 hover:bg-red-600 cursor-pointer p-2 rounded-[5px] transition"
          >
            Delete workspace
          </button>
        </div>
      </section>

      {/* Workspace Deletion Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[15px] max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="p-2 bg-red-50 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Workspace?
              </h3>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="font-medium text-gray-800">
                Are you sure you want to delete this workspace?
              </p>
              <p className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-700 font-medium">
                Warning: You cannot undo this action or recover this account
                data once removed.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-[25px] text-sm font-medium hover:bg-gray-50 transition"
                disabled={deleteWorkspaceMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteWorkspaceMutation.mutate()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-[25px] transition disabled:opacity-50"
                disabled={deleteWorkspaceMutation.isPending}
              >
                {deleteWorkspaceMutation.isPending
                  ? "Deleting..."
                  : "Yes, Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
