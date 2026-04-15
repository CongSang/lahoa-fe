'use client'

import { useEffect } from 'react'
import { Button } from '@/components/index'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Lỗi hệ thống:', error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-3 p-5'>
      <h2>Đã có lỗi xảy ra!</h2>
      <p className='mb-3'>{error.message || "Chúng tôi đang khắc phục sự cố này."}</p>
      
      <Button
        onClick={() => reset()} // Re-render error segment
        variant="outline"
      >
        Thử lại
      </Button>
    </div>
  )
}