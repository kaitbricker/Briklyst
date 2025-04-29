'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Not authenticated')
        }

        setUser(data.user)
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Please sign in to access the dashboard',
          variant: 'destructive',
        })
        router.push('/auth/sign-in')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, toast])

  async function handleSignOut() {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to sign out')
      }

      router.push('/auth/sign-in')
    } catch (err) {
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
  )
} 