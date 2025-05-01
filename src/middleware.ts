import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request })

  // Check if the path is a protected route
  const isProtectedRoute = pathname.startsWith('/dashboard')
  const isAuthRoute = pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up')

  // If it's a protected route and there's no token, redirect to sign in
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/auth/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If it's an auth route and there's a token, redirect to dashboard
  if (isAuthRoute && token) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
    const redirectUrl = new URL(callbackUrl || '/dashboard', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If it's the root path and there's a token, redirect to dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/sign-in', '/auth/sign-up'],
} 