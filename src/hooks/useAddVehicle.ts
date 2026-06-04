import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import type { VehicleFormState } from "@/constants/Fleets";

const createVehicle = async (formDataState: VehicleFormState) => {
  const dataToSend = new FormData();

  // Map text fields out of state
  dataToSend.append("brand", formDataState.brand || "");
  dataToSend.append("modelName", formDataState.modelName || "");
  dataToSend.append("slug", formDataState.slug || "");
  dataToSend.append("category", formDataState.category || "");
  dataToSend.append("year", `${formDataState.year}`);
  dataToSend.append("pricePerDay", String(formDataState.pricePerDay || 0));
  dataToSend.append("seats", String(formDataState.seats || ""));
  dataToSend.append("tripsCount", String(formDataState.tripsCount || 0));
  dataToSend.append("transmission", formDataState.transmission || "");
  dataToSend.append("fuelType", formDataState.fuelType || "");
  dataToSend.append("pickupLocation", formDataState.pickupLocation || "");
  dataToSend.append("description", formDataState.description || "");

  // Features Array handling
  if (formDataState.features) {
    dataToSend.append("features", JSON.stringify(formDataState.features));
  }

  const formTags = (formDataState as any).tags;
  if (formTags && Array.isArray(formTags)) {
    dataToSend.append("tags", JSON.stringify(formTags));
  }

  interface CarSpecs {
    engine: string;
    topSpeed: string;
    mileage: string;
    boot: string;
  }

  const layoutSpecs = (formDataState as { carSpecs?: CarSpecs }).carSpecs || {
    engine: "3.5L V6",
    topSpeed: "230 km/h",
    mileage: "22 km/L",
    boot: "454 L",
  };
  dataToSend.append("carSpecs", JSON.stringify(layoutSpecs));

  if (formDataState.images && formDataState.images.length > 0) {
    formDataState.images.forEach((imageFile: File | Blob) => {
      if (imageFile instanceof File) {
        dataToSend.append("images", imageFile);
      }
    });
  }

  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/create-car`,
    dataToSend,
    {
      withCredentials: true,
    },
  );
};

export function useAddVehicle(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: (res) => {
      toast.success(
        res.data?.message || "Vehicle added to your fleet successfully!",
      );

      queryClient.invalidateQueries({ queryKey: ["cars"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error creating your vehicle listing",
      );
    },
  });

  return mutation;
}
