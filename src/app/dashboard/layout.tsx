'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const navItems = [
  {
    title: 'Overview',
    href: '/dashboard',
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
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()

        if (!response.ok) {
          router.push('/login')
          return
        }

        setUser(data.user)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  async function handleSignOut() {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to sign out')
      }

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 border-r bg-gray-50/50 lg:block">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span>Briklyst</span>
            </Link>
          </div>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
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
          <nav className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link href="/dashboard" className="text-xl font-bold">
                    Briklyst
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Storefront Settings
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 