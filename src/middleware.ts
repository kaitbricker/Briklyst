import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  })

  // Check if the path is a protected route
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname === '/settings' ||
                          pathname === '/storefront'

  // Check if it's an auth route
  const isAuthRoute = pathname.startsWith('/auth/') || 
                     pathname === '/login' ||
                     pathname === '/signup'

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

  // Redirect old routes to new ones
  if (pathname === '/signup') {
    return NextResponse.redirect(new URL('/auth/sign-up', request.url))
  }

  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (pathname === '/settings') {
    return NextResponse.redirect(new URL('/dashboard/settings', request.url))
  }

  // If it's the root path and there's a token, redirect to dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/auth/:path*',
    '/login',
    '/signup',
    '/settings',
    '/storefront'
  ]
} 