"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Save, RefreshCw, Settings, LayoutGrid, User, Image as ImageIcon } from 'lucide-react'
import ThemeSelector from './components/ThemeSelector'
import ThemePreview from './components/ThemePreview'
import CollectionsManager from './components/CollectionsManager'
import { Theme } from '@/lib/themes'
import { themes } from '@/lib/themes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import StorefrontPreview from '@/components/storefront/StorefrontPreview'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Storefront {
  id: string
  name: string
  description: string
  logoUrl: string
  bannerUrl: string
  socials: {
    instagram: string
    twitter: string
    tiktok: string
  }
  products: {
    id: string
    title: string
    price: number
    imageUrl: string
  }[]
  collections: any[]
  theme: Theme
}

export default function CustomizePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('theme')
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefront')
        if (!response.ok) {
          throw new Error('Failed to fetch storefront')
        }
        const data = await response.json()
        setStorefront(data)
        setSelectedTheme(themes[0])
      } catch (error) {
        console.error('Error fetching storefront:', error)
        toast({
          title: 'Error',
          description: 'Failed to load storefront data',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStorefront()
  }, [toast])

  const handleSaveTheme = async () => {
    if (!storefront) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/storefront/theme', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId: storefront.id,
          themeId: selectedTheme.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save theme')
      }

      // Update local storefront state with new theme
      setStorefront(prev => ({
        ...prev!,
        theme: selectedTheme
      }))

      toast({
        title: 'Success',
        description: 'Theme saved successfully',
      })
    } catch (error) {
      console.error('Error saving theme:', error)
      toast({
        title: 'Error',
        description: 'Failed to save theme',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!storefront) return

    setIsUpdatingProfile(true)
    try {
      const response = await fetch('/api/storefront/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId: storefront.id,
          bio: storefront.description,
          logoUrl: storefront.logoUrl,
          socials: storefront.socials,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Create a derived previewStorefront for live preview
  const previewStorefront = storefront && selectedTheme ? {
    ...storefront,
    theme: selectedTheme,
  } : storefront

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your storefront...</p>
        </motion.div>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-4 rounded-lg"
        >
          Failed to load storefront data
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customize Storefront</h1>
          <p className="text-muted-foreground mt-1">
            Customize your storefront&apos;s appearance and layout
          </p>
        </div>
      </div>
      {/* Only show Sleek Noir theme info and preview */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <ThemeSelector />
        </div>
        <div className="flex-1">
          <ThemePreview theme={selectedTheme} storefrontData={previewStorefront} />
        </div>
      </div>
    </div>
  )
} 