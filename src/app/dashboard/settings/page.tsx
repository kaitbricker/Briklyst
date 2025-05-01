'use client'

import { useEffect, useState } from 'react'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { useToast } from '@/components/ui/use-toast'

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
    return <div>Loading...</div>
  }

  if (!storefront) {
    return <div>No storefront found</div>
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