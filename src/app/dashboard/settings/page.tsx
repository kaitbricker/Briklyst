'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { Loader2, Settings2, Plus, X, Edit2, Save, Trash, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useStorefrontUpdate } from '@/context/StorefrontUpdateContext'

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
  user: {
    name: string
    email: string
    bio: string | null
    emailAlerts: boolean
    weeklyReport: boolean
    monthlyReport: boolean
  }
}

interface Collection {
  id: string
  name: string
  description?: string
  tags: string[]
}

export default function SettingsPage() {
  const router = useRouter()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { triggerUpdate } = useStorefrontUpdate()

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
      } catch (err) {
        console.error('Error fetching storefront:', err)
        setError(err instanceof Error ? err.message : 'Failed to load storefront')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStorefront()
  }, [])

  const handleFieldChange = async (field: string, value: string) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      triggerUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        />
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-4"
      >
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </motion.div>
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
        className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">Account Settings</h1>
          <p className="text-gray-500">Manage your account preferences and notifications</p>
        </div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={storefront?.user?.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={storefront?.user?.email || ''}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={storefront?.user?.bio || ''}
                    onChange={(e) => handleFieldChange('bio', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600">
                  Save Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Alerts</h3>
                    <p className="text-sm text-gray-500">Receive notifications about your storefront activity</p>
                  </div>
                  <Switch
                    checked={storefront?.user?.emailAlerts}
                    onCheckedChange={(checked) => handleFieldChange('emailAlerts', checked.toString())}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-gray-500">Get weekly summaries of your storefront performance</p>
                  </div>
                  <Switch
                    checked={storefront?.user?.weeklyReport}
                    onCheckedChange={(checked) => handleFieldChange('weeklyReport', checked.toString())}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Monthly Reports</h3>
                    <p className="text-sm text-gray-500">Receive detailed monthly analytics reports</p>
                  </div>
                  <Switch
                    checked={storefront?.user?.monthlyReport}
                    onCheckedChange={(checked) => handleFieldChange('monthlyReport', checked.toString())}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 