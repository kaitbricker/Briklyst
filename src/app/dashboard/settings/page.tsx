'use client'

import { useEffect, useState } from 'react'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface Storefront {
  id: string
  title: string
  description: string | null
  logoUrl: string | null
  bannerUrl: string | null
  primaryColor: string | null
  accentColor: string | null
  backgroundColor: string | null
  textColor: string | null
  fontFamily: string | null
}

export default function SettingsPage() {
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefronts')
        if (!response.ok) {
          throw new Error('Failed to fetch storefront')
        }
        const data = await response.json()
        setStorefront(data)
      } catch (error) {
        console.error('Error fetching storefront:', error)
        toast({
          title: 'Error',
          description: 'Failed to load storefront settings',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStorefront()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <p className="text-lg text-gray-600">Creating your storefront...</p>
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Storefront Settings</h1>
      <div className="max-w-2xl">
        <StorefrontForm defaultValues={storefront} />
      </div>
    </div>
  )
} 