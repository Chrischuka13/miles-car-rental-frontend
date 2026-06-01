import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDriverApi } from "../api/driver.api";
import { toast } from "react-toastify";

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDriverApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
        onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create driver"
      );
    },
  });
};