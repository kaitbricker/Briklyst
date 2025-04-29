import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is a protected route
  const isProtectedRoute = pathname.startsWith('/dashboard')

  // Get the session token from cookies
  const sessionToken = request.cookies.get('session-token')

  // If it's a protected route and there's no session token, redirect to sign in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL('/auth/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If it's an auth route and there's a session token, redirect to dashboard
  if (
    (pathname.startsWith('/auth/sign-in') ||
      pathname.startsWith('/auth/sign-up')) &&
    sessionToken
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/sign-in', '/auth/sign-up'],
} 