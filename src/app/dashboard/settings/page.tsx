'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { Loader2, Settings2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { useStorefrontUpdate } from '@/context/StorefrontUpdateContext'

interface Storefront {
  id: string
  title: string
  user: {
    name: string
    email: string
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { triggerUpdate } = useStorefrontUpdate()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/storefronts')
        
        if (!response.ok) {
          throw new Error('Failed to fetch storefront')
        }

        const data = await response.json()
        setStorefront(data)
        setProfileData({
          name: data.user.name,
          email: data.user.email,
        })
      } catch (err) {
        console.error('Error fetching storefront:', err)
        setError(err instanceof Error ? err.message : 'Failed to load storefront')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStorefront()
  }, [])

  const handleSaveProfile = async () => {
    if (!storefront) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/storefronts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId: storefront.id,
          name: profileData.name,
          email: profileData.email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      })
      triggerUpdate()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!storefront) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-4"
      >
        <h2 className="text-2xl font-bold mb-4">Create Your Storefront</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Get started by creating your storefront. You can customize it later.
        </p>
        <Button 
          onClick={() => router.push('/dashboard/storefront')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Storefront
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] space-y-8 p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F8CFF] to-[#A259E6]">Settings</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>
      </motion.div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your storefront name and email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Storefront Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your storefront name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 