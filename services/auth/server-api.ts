import axios from 'axios'
import { cookies } from 'next/headers'
import type { User } from '@/types/index'

export const getCurrentUserServer =
  async (): Promise<User | null> => {
    const cookieStore = await cookies()

    const token = cookieStore.get('access_token')?.value

    if (!token) return null

    try {
      const { data } =
        await axios.get<User>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/account-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

      return data
    } catch {
      return null
    }
  }