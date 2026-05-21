import { axiosInstance } from "@/lib/index"
import { Option } from "@/types/index"


export const getUserByKeywordApi = async (
  keyword?: string
) => {
  const res =
    await axiosInstance.get(
      '/admin/users/search',
      {
        params: { keyword }
      }
    )

  return res.data as Option[]
}