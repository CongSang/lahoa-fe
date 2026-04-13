import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/checkout') || pathname.startsWith('/admin') || pathname.startsWith('/account')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if(pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/account/:path*', '/login', '/register'], 
}
