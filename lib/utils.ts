import axios from "axios";
import toast from "react-hot-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { uploadImageApi } from "@/services/index";

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
    errorMessage = error.response?.data?.message || errorMsg;
  }
  toast.error(errorMessage);
}

export const uploadToCloudinary = async (file: File) => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await uploadImageApi(formData);
    return response.secure_url;
  } catch (error) {
    console.error("Upload failed", error);
  }
};

export function cleanObject<T extends object>(obj: T): Partial<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      result[key] = value;
    }
  });
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value.toString());
    }
  });

  return params.toString();
};