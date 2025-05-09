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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <TopNav />
      <div className="flex flex-1 pt-16">
        <div className="hidden w-64 border-r bg-white/70 backdrop-blur-md shadow-lg lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:shadow-md',
                    pathname === item.href && 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            {session?.user?.name && (
              <Link
                href={`/storefronts/${encodeURIComponent(session.user.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-md hover:from-orange-600 hover:to-pink-600 transition-all">
                  View My Storefront
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="min-h-screen bg-white/60 backdrop-blur-lg rounded-tl-3xl shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 