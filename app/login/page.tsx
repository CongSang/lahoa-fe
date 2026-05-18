import { LoginForm, Logo } from '@/components/index'

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
        className="w-full max-w-120 bg-white rounded-3xl shadow-md p-6 md:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className='w-38 md:w-45 h-auto mb-10' />

          <LoginForm searchParams={params} />
        </div>
      </div>
    </div>
  )
}

export default Login