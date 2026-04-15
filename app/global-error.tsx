'use client'

import { Button } from "@/components/index"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
		<div className="text-center p-5 flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-black">
        Hệ thống gặp sự cố nghiêm trọng
      </h1>

      <p className="my-4">
        Chúng tôi rất tiếc vì sự gián đoạn này. Vui lòng thử lại.
        <br/><br/>
        {error.message}
      </p>
      
      <Button 
        onClick={() => reset()}
        variant="destructive"
      >
        Khởi động lại ứng dụng
      </Button>
    </div>
  )
}