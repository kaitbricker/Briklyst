'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { themes } from '@/lib/themes'

interface Storefront {
  id: string
  title: string
  description: string
  logoUrl: string
  bannerUrl: string
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  themeId: string
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const fetchStorefront = useCallback(async () => {
    try {
      const response = await fetch('/api/storefronts')
      const data = await response.json()
      setStorefront(data)
      setSelectedTheme(data.themeId)
    } catch (error) {
      console.error('Failed to fetch storefront:', error)
      setError('Failed to fetch storefront')
    }
  }, [])

  useEffect(() => {
    fetchStorefront()
  }, [fetchStorefront])

  function handleThemeSelect(themeId: string) {
    setSelectedTheme(themeId)
    const theme = themes.find(t => t.id === themeId)
    if (theme && storefront) {
      setStorefront({
        ...storefront,
        themeId: theme.id,
        primaryColor: theme.primaryColor,
        backgroundColor: theme.backgroundColor,
        textColor: theme.textColor,
        accentColor: theme.accentColor,
        fontFamily: theme.fontFamily.heading,
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const settings = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      logoUrl: formData.get('logoUrl') as string,
      bannerUrl: formData.get('bannerUrl') as string,
      primaryColor: formData.get('primaryColor') as string,
      accentColor: formData.get('accentColor') as string,
      backgroundColor: formData.get('backgroundColor') as string,
      textColor: formData.get('textColor') as string,
      fontFamily: formData.get('fontFamily') as string,
      themeId: selectedTheme || storefront?.themeId,
    }

    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to update storefront settings')
      }

      toast({
        title: 'Success',
        description: 'Storefront settings updated successfully',
      })
      fetchStorefront()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast({
        title: 'Error',
        description: 'Failed to update storefront settings',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!storefront) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Storefront Settings</h1>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Storefront Title</Label>
          <Input id="title" name="title" required defaultValue={storefront.title} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={storefront.description} />
        </div>
        <div>
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input id="logoUrl" name="logoUrl" type="url" defaultValue={storefront.logoUrl} />
        </div>
        <div>
          <Label htmlFor="bannerUrl">Banner URL</Label>
          <Input id="bannerUrl" name="bannerUrl" type="url" defaultValue={storefront.bannerUrl} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input id="primaryColor" name="primaryColor" type="text" defaultValue={storefront.primaryColor} />
          </div>
          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <Input id="accentColor" name="accentColor" type="text" defaultValue={storefront.accentColor} />
          </div>
          <div>
            <Label htmlFor="backgroundColor">Background</Label>
            <Input id="backgroundColor" name="backgroundColor" type="text" defaultValue={storefront.backgroundColor} />
          </div>
          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <Input id="textColor" name="textColor" type="text" defaultValue={storefront.textColor} />
          </div>
          <div>
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input id="fontFamily" name="fontFamily" type="text" defaultValue={storefront.fontFamily} />
          </div>
        </div>
        <div>
          <Label>Theme</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {themes.map((theme) => (
              <button
                type="button"
                key={theme.id}
                className={`border rounded-lg p-4 flex flex-col items-center transition-all ${selectedTheme === theme.id ? 'ring-2 ring-primary border-primary' : 'border-gray-200'}`}
                onClick={() => handleThemeSelect(theme.id)}
                style={{ background: theme.backgroundColor }}
              >
                <span className="font-bold mb-1" style={{ color: theme.primaryColor }}>{theme.name}</span>
                <span className="text-xs mb-2 text-gray-500">{theme.description}</span>
                <span className="w-8 h-8 rounded-full mb-2" style={{ background: theme.primaryColor, display: 'inline-block' }}></span>
                <span className="text-xs font-mono">{theme.id}</span>
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>

      {storefront?.logoUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Logo Preview</h3>
          <div className="relative mt-2 h-32 w-32">
            <Image src={storefront.logoUrl} alt="Storefront logo" fill className="object-contain" />
          </div>
        </div>
      )}
      {storefront?.bannerUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Banner Preview</h3>
          <div className="relative mt-2 h-32 w-full max-w-xl">
            <Image src={storefront.bannerUrl} alt="Storefront banner" fill className="object-cover rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
} 