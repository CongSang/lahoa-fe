'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react'
import { Loading } from '@/components/index';
import { useUserStore } from '@/stores/index'
import { decodeToken } from '@/lib/auth';
 
const OAuth2RedirectPage = () => {
  const router = useRouter();
  const params = useSearchParams()
  const { login } = useUserStore();

  useEffect(() => {
    const accessToken = params.get("token") as string;
    const refreshToken = params.get("refreshToken") as string;

    if (!accessToken && !refreshToken) {
      router.replace('/login?error=oauth2_failed');
      return
    }

    login({ token: accessToken, refreshToken })
    
    const decoded = decodeToken(accessToken)
    
    const isAdmin =
      decoded?.permissions?.includes(
        'ACCESS_ADMIN_PANEL'
      )

    router.replace(
      isAdmin
        ? '/admin'
        : '/'
    )

    router.refresh()
  }, [router, params, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
}

export default OAuth2RedirectPage
