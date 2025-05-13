import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { StorefrontSettings } from '@/types/storefront'

export function useStorefrontSettings() {
  const [settings, setSettings] = useState<StorefrontSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/storefront/settings')
      
      if (!response.ok) {
        throw new Error('Failed to fetch storefront settings')
      }

      const data = await response.json()
      setSettings(data)
    } catch (err) {
      console.error('Error fetching storefront settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to load settings')
      toast.error('Failed to load storefront settings')
    } finally {
      setIsLoading(false)
    }
  }

  const updateSettings = async (updates: Partial<StorefrontSettings>) => {
    try {
      setError(null)
      const response = await fetch('/api/storefront/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          ...updates,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update settings')
      }

      const data = await response.json()
      setSettings(data)
      toast.success('Storefront settings updated')
      return data
    } catch (err) {
      console.error('Error updating storefront settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to update settings')
      toast.error('Failed to update storefront settings')
      throw err
    }
  }

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    refresh: fetchSettings,
  }
} 