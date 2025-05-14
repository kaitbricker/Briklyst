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
  socials?: {
    tiktok: string
    instagram: string
    spotify: string
    youtube: string
    twitter: string
    facebook: string
    pinterest: string
    linkedin: string
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
  const [socials, setSocials] = useState({
    tiktok: '',
    instagram: '',
    spotify: '',
    youtube: '',
    twitter: '',
    facebook: '',
    pinterest: '',
    linkedin: '',
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [isSavingSocials, setIsSavingSocials] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

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
        setSocials({
          tiktok: data.socials?.tiktok || '',
          instagram: data.socials?.instagram || '',
          spotify: data.socials?.spotify || '',
          youtube: data.socials?.youtube || '',
          twitter: data.socials?.twitter || '',
          facebook: data.socials?.facebook || '',
          pinterest: data.socials?.pinterest || '',
          linkedin: data.socials?.linkedin || '',
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

  const handleSaveSocials = async () => {
    if (!storefront) return
    setIsSavingSocials(true)
    try {
      const response = await fetch('/api/storefronts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storefrontId: storefront.id,
          socials,
        }),
      })
      if (!response.ok) throw new Error('Failed to update socials')
      toast({ title: 'Success', description: 'Social links updated!' })
      triggerUpdate()
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update socials', variant: 'destructive' })
    } finally {
      setIsSavingSocials(false)
    }
  }

  const handleSavePassword = async () => {
    if (!storefront) return
    setIsSavingPassword(true)
    try {
      const response = await fetch('/api/storefronts/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storefrontId: storefront.id,
          ...passwords,
        }),
      })
      if (!response.ok) throw new Error('Failed to update password')
      toast({ title: 'Success', description: 'Password updated!' })
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update password', variant: 'destructive' })
    } finally {
      setIsSavingPassword(false)
      setPasswords({ current: '', new: '', confirm: '' })
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings Card */}
        <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your storefront name and email address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Storefront Name</Label>
                <Input id="name" value={profileData.name} onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your storefront name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={profileData.email} onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email address" />
              </div>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full bg-gradient-to-r from-[#4F8CFF] to-[#A259E6] text-white font-bold shadow-md hover:shadow-lg transition-all duration-150 border border-white/10">
                {isSaving ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving Changes...</>) : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Social Links Card */}
        <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Add or update your social media links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(socials).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Label htmlFor={key} className="capitalize w-24">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input id={key} value={value} onChange={e => setSocials(prev => ({ ...prev, [key]: e.target.value }))} placeholder={`Enter your ${key} link`} />
                </div>
              ))}
              <Button onClick={handleSaveSocials} disabled={isSavingSocials} className="w-full bg-gradient-to-r from-[#E04FD4] to-[#FEC8E4] text-white font-bold shadow-md hover:shadow-lg transition-all duration-150 border border-white/10 mt-2">
                {isSavingSocials ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>) : 'Save Social Links'}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Change Password Card */}
        <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" value={passwords.current} onChange={e => setPasswords(prev => ({ ...prev, current: e.target.value }))} placeholder="Current password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" value={passwords.new} onChange={e => setPasswords(prev => ({ ...prev, new: e.target.value }))} placeholder="New password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" value={passwords.confirm} onChange={e => setPasswords(prev => ({ ...prev, confirm: e.target.value }))} placeholder="Confirm new password" />
              </div>
              <Button onClick={handleSavePassword} disabled={isSavingPassword} className="w-full bg-gradient-to-r from-[#23232A] to-[#2D2D32] text-white font-bold shadow-md hover:shadow-lg transition-all duration-150 border border-white/10 mt-2">
                {isSavingPassword ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>) : 'Change Password'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 