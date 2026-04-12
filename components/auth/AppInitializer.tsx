'use client'

import { useUserStore } from '@/store/index';
import React, { useEffect } from 'react'

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return <>{children}</>;
}
