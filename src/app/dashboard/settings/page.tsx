'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
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

const SettingsPage: React.FC = () => {
  const router = useRouter()
  const { storefront, isLoading, error } = useStorefront()
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateStorefront = async () => {
    try {
      setIsCreating(true)
      const response = await fetch('/api/storefronts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'My Storefront',
          description: 'Welcome to my storefront',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create storefront')
      }

      const data = await response.json()
      toast({
        title: 'Success',
        description: 'Your storefront has been created!',
      })
      router.push('/dashboard/storefront')
    } catch (error) {
      console.error('Error creating storefront:', error)
      toast({
        title: 'Error',
        description: 'Failed to create storefront. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="min-h-[60vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Briklyst</h1>
            <p className="text-lg text-gray-600 mb-8">
              Let&apos;s get your storefront set up. This will only take a moment.
            </p>
            <Button
              onClick={handleCreateStorefront}
              disabled={isCreating}
              className="inline-flex items-center px-6 py-3"
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your storefront...
                </>
              ) : (
                'Create My Storefront'
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Storefront Settings</h2>
        <p className="text-gray-600">Your storefront is ready! You can now customize it in the Storefront section.</p>
        <Button
          onClick={() => router.push('/dashboard/storefront')}
          className="mt-4"
        >
          Go to Storefront
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage 