'use client'

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { Loading } from '@/components/index';

interface GoogleLoginRedirectProps {
  searchParams: {
    token: string;
    refreshToken: string;
  }
}

export const GoogleLoginRedirect = ({ searchParams } : GoogleLoginRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.token;
    const refreshToken = searchParams.refreshToken;

    if (accessToken && refreshToken) {
      Cookies.set('access_token', accessToken, { path: '/' });
      Cookies.set('refresh_token', refreshToken, { path: '/' });
      router.replace('/');
    } else {
      router.replace('/login?error=oauth2_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
}
