'use client'

import { useQuery } from '@tanstack/react-query'
import { getAccountInfoApi } from '@/services/index'
import { useUserStore } from '@/stores/index'
import Cookies from 'js-cookie'

export const ACCOUNT_QUERY_KEY =
  ['account-info']

export function useCurrentUser() {
  const setUser = useUserStore(
    (s) => s.setUser
  )

  const token = Cookies.get('access_token')

  return useQuery({
    queryKey: ACCOUNT_QUERY_KEY,

    queryFn: async () => {
      const user =
        await getAccountInfoApi()

      setUser(user)

      return user
    },
    enabled: !!token,

    retry: false,

    staleTime: 5 * 60 * 1000,
  })
}