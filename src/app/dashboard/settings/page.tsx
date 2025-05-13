'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { Loader2, Settings2, Plus, X, Edit2, Save, Trash, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useStorefrontUpdate } from '@/context/StorefrontUpdateContext'
import Image from 'next/image'

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
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    avatarUrl: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifications, setNotifications] = useState({
    email: false,
    marketing: false,
  })

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
          bio: data.user.bio || '',
          avatarUrl: data.logoUrl || '',
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

  const handleRestartOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('onboardingComplete');
      router.push('/dashboard'); // reload dashboard to trigger onboarding
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
        className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F8CFF] to-[#A259E6]">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <Card className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4F8CFF] shadow-lg">
                      <Image
                        src={profileData.avatarUrl || '/placeholder-avatar.jpg'}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        className="text-[#4F8CFF] hover:text-[#3a6fd8] hover:border-[#3a6fd8] transition-colors duration-200"
                      >
                        Change Avatar
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200 min-h-[100px]"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#4F8CFF] to-[#A259E6] text-white shadow-md hover:from-[#3a6fd8] hover:to-[#7d3fc7] hover:shadow-lg transition-all duration-300"
                >
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4F8CFF] focus:ring-[#4F8CFF]/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#4F8CFF] to-[#A259E6] text-white shadow-md hover:from-[#3a6fd8] hover:to-[#7d3fc7] hover:shadow-lg transition-all duration-300"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-8"
        >
          <Card className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your account</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  className="data-[state=checked]:bg-[#4F8CFF]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-gray-500">Receive marketing communications</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  className="data-[state=checked]:bg-[#4F8CFF]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => {/* Handle account deletion */}}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 