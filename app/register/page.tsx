import { RegisterForm } from '@/components/index'
import Image from 'next/image'
import Link from 'next/link'

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans bg-third">
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