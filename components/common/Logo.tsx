'use client'

import Image from "next/image"
import Link from "next/link"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <Link className="flex flex-col items-center gap-0" href="/">
        <Image 
          loading="eager"
          src="/images/logo.svg" 
          alt="Logo" 
          width={200} 
          height={200}
          className={`object-cover ${className || ''}`}
        />
      </Link>
    </div>
  )
}
