/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { uploadImageApi } from "@/services/index";
import { UploadSignatureResponse } from "@/types/index";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Xóa tất cả ký tự không phải số (ví dụ: "1,200.50" -> "1200.50")
export const cleanAmount = (val: string) => val.replace(/,/g, "");

// Thêm dấu phẩy ngăn cách hàng nghìn
export const formatDisplay = (val: string) => {
  if (!val) return "";
  const parts = val.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const toastApiError = (error: unknown, errorMsg: string) => {
  let errorMessage = errorMsg;
  if (axios.isAxiosError(error)) {
    errorMessage = errorMsg + ": " + error.response?.data?.message;
  }
  toast.error(errorMessage, { duration: 5000 });
}

export async function uploadToCloudinary(
  file: File, 
  getSignature: () => Promise<UploadSignatureResponse>
) : Promise<{ 
  url: string, 
  publicId: string 
}> {
  try {
    const signature = await getSignature();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signature.apiKey);
    formData.append("timestamp", signature.timestamp.toString());
    formData.append("signature", signature.signature);
    formData.append("folder", signature.folder);

    const response = await uploadImageApi(formData, signature.cloudName);

    return {
      url: response.secure_url as string,
      publicId: response.public_id as string
    };
  } catch {
    throw new Error("Upload image failed");
  }
};

export function cleanObject<T extends object>(obj: T): Partial<T> {
  const result: any = {};
  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      result[key] = value;
    }
  });
  return result;
}

export const isObjectChange = (current: Record<string, any>, initial: Record<string, any>): boolean => {
  const result = Object.keys(initial).every((key) => {
    const currentValue = current[key];

    return currentValue === null ||
           currentValue === undefined ||
           currentValue === "";
  });

  return !result
};


export const objectToQueryParams = (obj: Record<string, string | number | null>) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    // property for product
    if (key === "propertyValueIds" && value) {
      Object.entries(value as unknown as Record<string, number[] | null>).forEach(
        ([k, values]) => {
          if (!k.startsWith("p_")) return;

          if (!values || values.length === 0) {
            params.delete(k);
          } else {
            params.set(k, values.join(","));
          }
        }
      );
      return;
    }

    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value.toString());
    }
  });

  return params.toString();
};

export function getCaretPosition(
  oldValue: string,
  newValue: string,
  caret: number
) {
  const diff = newValue.length - oldValue.length;
  return caret + diff;
}

export const parseValueSelect = (value: string) => {
  if (isNaN(Number(value))) return value
  return Number(value)
}

export const transformProperty = (
  data?: Record<string, string[] | null>
) => {
  if (!data) return {}

  return Object.entries(data).reduce<Record<number, string[]>>(
    (acc, [key, value]) => {
      if (!Array.isArray(value) || value.length === 0) return acc

      const id = Number(key.replace("p_", ""))
      if (Number.isNaN(id)) return acc

      acc[id] = value
      return acc
    },
    {}
  )
}

export const buildApiParams = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;

    if (key === "propertyValueIds") {
      Object.entries(value).forEach(([propId, arr]) => {
        if (!Array.isArray(arr)) return;

        arr.forEach((v) => {
          searchParams.append(`propertyValueIds[${propId}]`, String(v));
        });
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
};