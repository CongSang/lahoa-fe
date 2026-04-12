import axios from "axios";
import toast from "react-hot-toast";

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