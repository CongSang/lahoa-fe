import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './lib/auth'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl
  const adminRoles = ['ADMIN', 'STAFF'];

  if (pathname === '/') {
    if (token) {
      const decoded = decodeToken(token);

      if (decoded?.roles?.some(r => adminRoles.includes(r))) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  if (pathname.startsWith('/checkout') || pathname.startsWith('/account')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if(pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/account/:path*', '/login', '/register', "/"], 
}
