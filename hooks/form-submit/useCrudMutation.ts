/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PageResponse } from "@/types/index";
import toast from "react-hot-toast";
import { toastApiError } from "@/lib/index";

type CrudAction = "create" | "update" | "delete" | "bulk-delete";

type Id = number | string;

type CrudVariables<T> = {
  action: CrudAction;
  data?: T;
  id?: Id;
  ids?: Id[];

  meta?: {
    successMessage?: string;
    errorMessage?: string;
    silent?: boolean
  };
};

type CrudMutationOptions<T extends { id?: Id }> = {
  queryKey: string[];

  mutationFn: (variables: CrudVariables<T>) => Promise<any>;

  getId?: (item: T) => Id;

  onSuccess?: (data: any, vars: CrudVariables<T>) => void;
  onError?: (err: unknown, vars: CrudVariables<T>) => void;
};

function getDefaultSuccessMessage(action: CrudAction) {
  switch (action) {
    case "create":
      return "Tạo thành công";
    case "update":
      return "Cập nhật thành công";
    case "delete":
      return "Xoá thành công";
    case "bulk-delete":
      return "Xoá nhiều thành công";
    default:
      return "Thành công";
  }
}

export function useCrudMutation<T extends { id?: Id }>({
  queryKey,
  mutationFn,
  getId = (item) => item.id as Id,
  onSuccess,
  onError,
}: CrudMutationOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onMutate: async (variables: CrudVariables<T>) => {
      await queryClient.cancelQueries({ queryKey });

      const prev = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: PageResponse<T>) => {
        if (!old) return old;

        switch (variables.action) {
          // CREATE
          case "create":
            return {
              ...old,
              content: [variables.data!, ...old.content],
              totalElements: old.totalElements + 1,
            };

          // UPDATE
          case "update":
            return {
              ...old,
              content: old.content.map((item) =>
                getId(item) === getId(variables.data!)
                  ? { ...item, ...variables.data }
                  : item
              ),
            };

          // DELETE
          case "delete":
            return {
              ...old,
              content: old.content.filter(
                (item) => getId(item) !== variables.id
              ),
              totalElements: old.totalElements - 1,
            };

          // BULK DELETE
          case "bulk-delete":
            return {
              ...old,
              content: old.content.filter(
                (item) => !variables.ids?.includes(getId(item))
              ),
              totalElements: old.totalElements - (variables.ids?.length || 0),
            };

          default:
            return old;
        }
      });

      return { prev };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.prev);

      if (!variables.meta?.silent) {
        const message =
          variables.meta?.errorMessage ||
          "Có lỗi xảy ra";
        toastApiError(err, message)
      }

      onError?.(err, variables);
    },

    onSuccess: (data, variables) => {
      if (!variables.meta?.silent) {
        const message =
          variables.meta?.successMessage ||
          getDefaultSuccessMessage(variables.action);

        toast.success(message);
      }

      onSuccess?.(data, variables);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}