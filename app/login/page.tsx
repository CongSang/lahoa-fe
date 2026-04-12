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
    <div className="min-h-screen flex flex-col items-center justify-center pt-12 px-4 font-sans bg-third">
      <div
        className="w-full max-w-125 bg-white rounded-3xl shadow-md px-8 md:px-10 pb-8 md:pb-10"
      >
        <div className="flex flex-col items-center text-center">
          <Image 
            loading='eager'
            src="/images/logo.png" 
            alt="Logo" 
            width={200} 
            height={200}
            className='w-60 h-30 object-cover my-8' 
          />

          <LoginForm searchParams={params} />

          <div className="mt-6 text-center">
            <p className="text-[#6B7280] opacity-80 text-sm">
              Don&apos;t have an account? <Link href="/register" className="font-bold text-secondary hover:underline underline-offset-4 transition-colors">Sign Up</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login