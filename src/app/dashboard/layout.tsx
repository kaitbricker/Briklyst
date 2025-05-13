'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import { TopNav } from '@/components/layout/TopNav'
import { HomeIcon, BarChart2, ShoppingBag, LayoutGrid, Settings, Store, Mail, User, LogOut, HelpCircle, Palette, Bookmark } from 'lucide-react'
import OnboardingModal from '@/components/OnboardingModal'
import Image from 'next/image'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { title: 'Products', href: '/dashboard/products', icon: ShoppingBag },
  { title: 'Customize storefront', href: '/dashboard/storefront', icon: Palette },
  { title: 'Email', href: '/dashboard/email', icon: Mail },
]

const accountItems = [
  { title: 'My Profile', href: '/dashboard/profile', icon: User },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
  { title: 'Sign Out', href: '/auth/sign-in', icon: LogOut },
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
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user && typeof window !== 'undefined') {
      const onboardingComplete = localStorage.getItem('onboardingComplete')
      if (!onboardingComplete) {
        setShowOnboarding(true)
      }
    }
  }, [session?.user])

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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    localStorage.setItem('onboardingComplete', 'true')
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
      <OnboardingModal
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={() => setShowOnboarding(false)}
        user={session?.user || {}}
      />
      <TopNav />
      <div className="flex flex-1 pt-0">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen px-0 py-0">
          <div className="flex items-center gap-2 px-8 py-8">
            <Image
              src={session?.user?.image || '/default-avatar.png'}
              alt={session?.user?.name || 'User avatar'}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-all',
                    isActive ? 'bg-gradient-to-r from-[#A259E6] to-[#4F8CFF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#A259E6]'}`} />
                  {item.title}
                </Link>
              );
            })}
            <div className="my-4 border-t border-gray-200" />
            {accountItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-all',
                  pathname === item.href ? 'bg-gradient-to-r from-[#A259E6] to-[#4F8CFF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-white' : 'text-[#A259E6]'}`} />
                {item.title}
              </Link>
            ))}
            <div className="mt-auto mb-4" />
            <Link
              href="/help"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-all',
                pathname === '/help' ? 'bg-gradient-to-r from-[#A259E6] to-[#4F8CFF] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100',
              )}
            >
              <HelpCircle className={`h-5 w-5 ${pathname === '/help' ? 'text-white' : 'text-[#A259E6]'}`} />
              Help
            </Link>
          </nav>
          <div className="px-8 py-6">
            {session?.user?.name && (
              <Button 
                className="w-full bg-gradient-to-r from-[#4F8CFF] to-[#A259E6] text-white font-bold shadow-none hover:from-[#3a6fd8] hover:to-[#7d3fc7] transition-all"
                onClick={() => router.push(`/storefronts/${session.user.name}`)}
              >
                View My Storefront
              </Button>
            )}
          </div>
        </aside>
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