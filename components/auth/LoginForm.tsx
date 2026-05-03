'use client'

import { useEffect } from 'react'
import { AutoForm, Button, Spinner } from '@/components/index'
import { AuthRequest } from '@/types/index';
import { toastApiError } from '@/lib/index';
import toast from 'react-hot-toast';
import { useUserStore } from 'store/useUserStore';
import { useRouter } from 'next/navigation';
import { loginApi } from '@/services/index';
import { useForm } from 'react-hook-form';
import { AuthFormValues, authSchema, FieldConfig } from '@/schema/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

interface LoginFormProps {
  searchParams?: {
    error?: string;
  }
}

export const LoginForm = ({ searchParams } : LoginFormProps) => {
  const { login } = useUserStore();
  const router = useRouter()

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = form;
  
  const sectionFormConfig: FieldConfig<AuthFormValues>[] = [
    { name: "email", type: "text", placeholder: "Địa chỉ email" },
    { name: "password", type: "password", placeholder: "Mật khẩu" },
  ];

  const mutation = useMutation({
    mutationFn: (request: AuthRequest) => loginApi(request),
    onSuccess: (data) => {
      login(data);
      router.replace('/');
    },
    onError: (error) => {
      console.error('Login failed', error);
      toastApiError(error, 'Đăng nhập thất bại. Vui lòng thử lại.');
    },
  });

  const handleLoginWithGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`);
  }

  useEffect(() => {
    if (searchParams?.error === 'oauth2_cancelled') {
      toast.error('Bạn đã hủy đăng nhập với Google.');
      router.replace('/login');
    } else if (searchParams?.error === 'oauth2_failed') {
      toast.error('Đăng nhập Google thất bại. Vui lòng thử lại.');
      router.replace('/login');
    }

  }, [searchParams?.error, router]);

  return (
    <>
      <form 
        id='form-login' 
        className="w-full space-y-2 text-left"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <AutoForm<AuthFormValues>
          form={form}
          config={sectionFormConfig}
          disabledAll={mutation.isPending}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full btn-ec uppercase"
          size="lg"
        >
          {mutation.isPending ? <Spinner /> : 'Đăng nhập'}
        </Button>
      </form>

      {/* Separator */}
      <div className="relative my-4 w-full">
        <div className="absolute inset-0 w-full flex items-center">
          <div className="w-full border-t border-gray-200 z-1"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest z-2">
          <span className="bg-white px-4 text-gray-500">hoặc</span>
        </div>
      </div>

      {/* Social Provider */}
      <Button 
        onClick={handleLoginWithGoogle}
        type="button"
        disabled={mutation.isPending}
        size="lg"
        variant="outline"
        className="w-full uppercase font-semibold text-gray-800 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Đăng nhập với Google
      </Button>
    </>
  )
}
