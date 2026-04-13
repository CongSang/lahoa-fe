import { LoginForm } from '@/components/index'
import Image from 'next/image'
import Link from 'next/link'

interface LoginProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

const Login = async ({ searchParams } : LoginProps) => {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans bg-third">
      <div
        className="w-full max-w-125 bg-white rounded-3xl shadow-md p-6 md:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <Image 
            loading='eager'
            src="/images/logo.png" 
            alt="Logo" 
            width={200} 
            height={200}
            className='w-38 md:w-45 h-16 md:h-20 object-cover mb-12' 
          />

          <LoginForm searchParams={params} />

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Bạn chưa có tài khoản? {" "}
              <Link href="/register" className="font-bold text-secondary-ec hover:underline transition-colors">
                Đăng kí
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login