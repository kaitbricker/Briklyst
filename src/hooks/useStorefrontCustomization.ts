import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface StorefrontCustomization {
  templateId: string
  templateOverrides?: {
    colors?: {
      primary?: string
      secondary?: string
      accent?: string
      background?: string
      text?: string
    }
    fonts?: {
      heading?: string
      body?: string
    }
    layout?: {
      spacing?: string
      containerWidth?: string
      borderRadius?: string
    }
  }
  customSections?: Array<{
    id: string
    type: string
    content: any
    order: number
  }>
  brandingAssets?: {
    logo?: string
    banner?: string
    favicon?: string
    buttonStyles?: {
      primary?: string
      secondary?: string
    }
    colorPalette?: string[]
  }
  customCSS?: string
  socialLinks?: Array<{
    platform: string
    url: string
    order: number
  }>
  collabHighlights?: Array<{
    id: string
    title: string
    description: string
    imageUrl: string
    link?: string
  }>
  subscriberBlock?: {
    enabled: boolean
    title?: string
    description?: string
    buttonText?: string
    successMessage?: string
  }
}

export function useStorefrontCustomization() {
  const [customization, setCustomization] = useState<StorefrontCustomization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomization()
  }, [])

  const fetchCustomization = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/storefront/customize')
      
      if (!response.ok) {
        throw new Error('Failed to fetch storefront customization')
      }

      const data = await response.json()
      setCustomization(data)
    } catch (err) {
      console.error('Error fetching storefront customization:', err)
      setError(err instanceof Error ? err.message : 'Failed to load customization')
      toast.error('Failed to load storefront customization')
    } finally {
      setIsLoading(false)
    }
  }

  const updateCustomization = async (updates: Partial<StorefrontCustomization>) => {
    try {
      setError(null)
      const response = await fetch('/api/storefront/customize', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...customization,
          ...updates,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update customization')
      }

      const data = await response.json()
      setCustomization(data)
      toast.success('Storefront customization updated')
      return data
    } catch (err) {
      console.error('Error updating storefront customization:', err)
      setError(err instanceof Error ? err.message : 'Failed to update customization')
      toast.error('Failed to update storefront customization')
      throw err
    }
  }

  const updateTemplate = async (templateId: string) => {
    return updateCustomization({ templateId })
  }

  const updateColors = async (colors: StorefrontCustomization['templateOverrides']['colors']) => {
    return updateCustomization({
      templateOverrides: {
        ...customization?.templateOverrides,
        colors,
      },
    })
  }

  const updateFonts = async (fonts: StorefrontCustomization['templateOverrides']['fonts']) => {
    return updateCustomization({
      templateOverrides: {
        ...customization?.templateOverrides,
        fonts,
      },
    })
  }

  const updateLayout = async (layout: StorefrontCustomization['templateOverrides']['layout']) => {
    return updateCustomization({
      templateOverrides: {
        ...customization?.templateOverrides,
        layout,
      },
    })
  }

  const updateCustomSections = async (sections: StorefrontCustomization['customSections']) => {
    return updateCustomization({ customSections: sections })
  }

  const updateBrandingAssets = async (assets: StorefrontCustomization['brandingAssets']) => {
    return updateCustomization({ brandingAssets: assets })
  }

  const updateCustomCSS = async (css: string) => {
    return updateCustomization({ customCSS: css })
  }

  const updateSocialLinks = async (links: StorefrontCustomization['socialLinks']) => {
    return updateCustomization({ socialLinks: links })
  }

  const updateCollabHighlights = async (highlights: StorefrontCustomization['collabHighlights']) => {
    return updateCustomization({ collabHighlights: highlights })
  }

  const updateSubscriberBlock = async (block: StorefrontCustomization['subscriberBlock']) => {
    return updateCustomization({ subscriberBlock: block })
  }

  return {
    customization,
    isLoading,
    error,
    updateTemplate,
    updateColors,
    updateFonts,
    updateLayout,
    updateCustomSections,
    updateBrandingAssets,
    updateCustomCSS,
    updateSocialLinks,
    updateCollabHighlights,
    updateSubscriberBlock,
    refresh: fetchCustomization,
  }
} 