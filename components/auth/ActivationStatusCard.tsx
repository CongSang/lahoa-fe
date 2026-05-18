'use client'

import Link from 'next/link'
import { Button } from '@/components/index'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react'

type Status = 'SUCCESS' | 'EXPIRED' | 'INVALID'

type Props = {
  status: Status
}

const config = {
  SUCCESS: {
    icon: CheckCircle2,
    title: 'Kích hoạt thành công',
    desc: 'Tài khoản LA HOA của bạn đã sẵn sàng để bắt đầu trải nghiệm.',
    color: 'text-green-600',
    button: 'Đăng nhập',
    href: '/login'
  },

  EXPIRED: {
    icon: AlertTriangle,
    title: 'Liên kết đã hết hạn',
    desc: 'Hãy đăng nhập lại để nhận email xác thực mới.',
    color: 'text-amber-600',
    button: 'Đăng nhập',
    href: '/login'
  },

  INVALID: {
    icon: XCircle,
    title: 'Liên kết không hợp lệ',
    desc: 'Token không tồn tại hoặc đã được sử dụng.',
    color: 'text-rose-600',
    button: 'Về trang chủ',
    href: '/'
  }
}

export function ActivationStatusCard({
  status
}: Props) {
  const item = config[status] ?? config.INVALID
  const Icon = item.icon

  return (
    <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl p-10 text-center border border-rose-100">

      <div className="flex justify-center mb-6">
        <Icon className={`w-12 h-12 ${item.color}`} />
      </div>

      <h1 className={`text-2xl font-semibold mb-4 ${item.color}`}>
        {item.title}
      </h1>

      <p className="text-muted-foreground leading-7 mb-8">
        {item.desc}
      </p>

      <Button
        asChild
        variant="outline"
      >
        <Link href={item.href}>
          {item.button}
        </Link>
      </Button>
    </div>
  )
}