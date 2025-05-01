'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import { TopNav } from '@/components/layout/TopNav'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
  },
  {
    title: 'Products',
    href: '/dashboard/products',
  },
  {
    title: 'Storefront',
    href: '/dashboard/storefront',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in')
    }
  }, [status, router])

  async function handleSignOut() {
    try {
      await signOut({ redirect: false })
      router.push('/auth/sign-in')
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      })
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1 pt-16">
        <div className="hidden w-64 border-r bg-white/80 backdrop-blur-sm lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-50',
                    pathname === item.href && 'bg-gray-100 text-gray-900'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-1">
          <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 