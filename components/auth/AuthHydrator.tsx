'use client'

import { useEffect } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUserStore } from '@/stores/useUserStore'

export function AuthHydrator() {
  const { data } = useCurrentUser()

  const setUser =
    useUserStore(
      (s) => s.setUser
    )

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  return null
}