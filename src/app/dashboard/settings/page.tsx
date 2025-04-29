'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface Storefront {
  id: string
  title: string
  description: string
  logoUrl: string
  primaryColor: string
  accentColor: string
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchStorefront = useCallback(async () => {
    try {
      const response = await fetch('/api/storefronts')
      const data = await response.json()
      setStorefront(data)
    } catch (error) {
      console.error('Failed to fetch storefront:', error)
      setError('Failed to fetch storefront')
    }
  }, [])

  useEffect(() => {
    fetchStorefront()
  }, [fetchStorefront])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const settings = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      logoUrl: formData.get('logoUrl') as string,
      primaryColor: formData.get('primaryColor') as string,
      accentColor: formData.get('accentColor') as string,
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
          <Input
            id="title"
            name="title"
            required
            defaultValue={storefront.title}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={storefront.description}
          />
        </div>

        <div>
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            type="url"
            defaultValue={storefront.logoUrl}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              name="primaryColor"
              type="color"
              defaultValue={storefront.primaryColor}
            />
          </div>

          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <Input
              id="accentColor"
              name="accentColor"
              type="color"
              defaultValue={storefront.accentColor}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>

      {storefront?.logoUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Logo Preview</h3>
          <div className="relative mt-2 h-32 w-32">
            <Image
              src={storefront.logoUrl}
              alt="Storefront logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="mb-2 text-sm font-medium">Theme Preview</h2>
        <div
          className="rounded-lg border p-4"
          style={{
            backgroundColor: storefront.primaryColor,
            color: storefront.accentColor,
          }}
        >
          <h3 className="text-lg font-medium">Sample Heading</h3>
          <p className="mt-2">
            This is a sample text to preview your theme colors.
          </p>
          <Button
            className="mt-4"
            style={{
              backgroundColor: storefront.accentColor,
              color: storefront.primaryColor,
            }}
          >
            Sample Button
          </Button>
        </div>
      </div>
    </div>
  )
} 