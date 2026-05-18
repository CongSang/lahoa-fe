import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  const protectedRoutes = [
    '/admin',
    '/account',
    '/checkout',
  ]

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  if(pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/account/:path*', '/login', '/register', "/"], 
}
