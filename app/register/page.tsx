import { Logo, RegisterForm } from '@/components/index'
import Link from 'next/link'

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans bg-third">
      <div
        className="w-full max-w-120 bg-white rounded-3xl shadow-md p-6 md:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className="w-38 md:w-45 h-16 md:h-20 mb-12" />

          <RegisterForm />

          <p className="text-xs text-[#9CA3AF] mt-4">
            By signing up, you agree to our <Link href="#" className="font-semibold text-gray-500 hover:underline">Terms of Service</Link>.
          </p>

          <div className="w-full border-t border-[#F3F4F6] mt-4 pt-4">
            <p className="text-sm text-gray-500">
              Bạn đã có tài khoản? <Link href="/login" className="font-bold hover:underline text-secondary-ec">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register