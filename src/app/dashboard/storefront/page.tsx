'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { ProductForm } from '@/components/forms/ProductForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ColorPicker } from '@/components/ui/color-picker'
import { gradients, colors } from '@/lib/colors'
import { Plus, Settings, Layout, Globe, Palette, Tag, Filter } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSelector from '@/components/dashboard/ThemeSelector'
import StorefrontHeader from '@/components/storefront/StorefrontHeader'
import StorefrontDescriptionCard from '@/components/storefront/StorefrontDescriptionCard'
import ProductGrid from '@/components/storefront/ProductGrid'
import Link from 'next/link'
import { ImageUpload } from '@/components/ui/image-upload'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
  categoryId?: string
  category?: {
    id: string
    name: string
  }
}

interface Storefront {
  id: string
  title: string
  description: string
  domain: string
  logoUrl: string
  bannerUrl: string
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  fontFamily?: string
  layoutStyle?: string
  themeId?: string
}

export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('design')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [localStorefront, setLocalStorefront] = useState<Storefront | null>(null)
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({})
  const [saveSuccess, setSaveSuccess] = useState<{ [key: string]: boolean }>({})
  const [saveError, setSaveError] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefronts?userId=current')
        if (!response.ok) throw new Error('Failed to fetch storefront')
        const data = await response.json()
        setStorefront(data)
      } catch {
        setError('Failed to load storefront settings')
        toast({
          title: 'Error',
          description: 'Failed to load storefront settings',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?storefrontId=${storefront?.id}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setError('Failed to fetch products')
        setProducts([])
      }
    }
    
    fetchStorefront()
    fetchCategories()
    if (storefront?.id) {
      fetchProducts()
    }
  }, [toast, storefront?.id])

  useEffect(() => {
    if (storefront) setLocalStorefront(storefront)
  }, [storefront])

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products

  const handleAddProduct = (data: {
    title: string
    description: string
    price: number
    imageUrl: string
    affiliateUrl: string
    categoryId?: string
  }) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      clicks: 0,
    }
    setProducts([...products, newProduct])
    setIsAddProductOpen(false)
    toast({
      title: 'Success',
      description: 'Product added successfully',
    })
  }

  const handleProductClick = async (productId: string) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
    } catch (error) {
      console.error('Failed to track click:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!localStorefront) return

    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localStorefront),
      })

      if (!response.ok) throw new Error('Failed to update storefront')

      toast({
        title: 'Success',
        description: 'Storefront settings updated successfully',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update storefront settings',
        variant: 'destructive',
      })
    }
  }

  const handleFieldChange = async (field: keyof Storefront, value: any) => {
    if (!localStorefront) return
    setLocalStorefront({ ...localStorefront, [field]: value })
    setSaving((prev) => ({ ...prev, [field]: true }))
    setSaveSuccess((prev) => ({ ...prev, [field]: false }))
    setSaveError((prev) => ({ ...prev, [field]: '' }))
    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...localStorefront, [field]: value }),
      })
      if (!response.ok) throw new Error('Failed to save')
      setSaving((prev) => ({ ...prev, [field]: false }))
      setSaveSuccess((prev) => ({ ...prev, [field]: true }))
      setTimeout(() => setSaveSuccess((prev) => ({ ...prev, [field]: false })), 1500)
    } catch (err: any) {
      setSaving((prev) => ({ ...prev, [field]: false }))
      setSaveError((prev) => ({ ...prev, [field]: err.message || 'Save failed' }))
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1C2E] mx-auto"></div>
          <p className="mt-4 text-[#5F5F73]">Loading your storefront...</p>
        </motion.div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-4 rounded-lg"
        >
          {error}
        </motion.div>
      </div>
    )
  }

  if (!localStorefront) return null

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Settings Form */}
      <div className="w-full md:w-1/2 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Storefront Settings</h1>
          {localStorefront && (
            <Link href={`/${localStorefront.domain || ''}`} target="_blank">
              <Button variant="outline">View Storefront</Button>
            </Link>
          )}
        </div>
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          {/* Title */}
          <div className="flex items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Displayed at the top of your storefront">?</span>
            {saving.title && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.title && <span className="ml-2 text-green-500">✔</span>}
            {saveError.title && <span className="ml-2 text-red-500">{saveError.title}</span>}
          </div>
          <Input
            id="title"
            value={localStorefront.title}
            onChange={e => handleFieldChange('title', e.target.value)}
          />
          {/* Domain */}
          <div className="flex items-center gap-2">
            <Label htmlFor="domain">Domain</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Custom domain for your storefront (optional)">?</span>
            {saving.domain && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.domain && <span className="ml-2 text-green-500">✔</span>}
            {saveError.domain && <span className="ml-2 text-red-500">{saveError.domain}</span>}
          </div>
          <Input
            id="domain"
            value={localStorefront.domain}
            onChange={e => handleFieldChange('domain', e.target.value)}
            placeholder="your-store.com"
          />
          {/* Description */}
          <div className="flex items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Describe your storefront">?</span>
            {saving.description && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.description && <span className="ml-2 text-green-500">✔</span>}
            {saveError.description && <span className="ml-2 text-red-500">{saveError.description}</span>}
          </div>
          <Textarea
            id="description"
            value={localStorefront.description}
            onChange={e => handleFieldChange('description', e.target.value)}
            placeholder="Describe your storefront..."
          />
          {/* Logo URL */}
          <div className="flex items-center gap-2">
            <Label htmlFor="logoUrl">Logo</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Upload your storefront logo image">?</span>
            {saving.logoUrl && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.logoUrl && <span className="ml-2 text-green-500">✔</span>}
            {saveError.logoUrl && <span className="ml-2 text-red-500">{saveError.logoUrl}</span>}
          </div>
          <ImageUpload
            value={localStorefront.logoUrl}
            onChange={url => handleFieldChange('logoUrl', url)}
          />
          {/* Banner URL */}
          <div className="flex items-center gap-2">
            <Label htmlFor="bannerUrl">Banner</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Upload your storefront banner image">?</span>
            {saving.bannerUrl && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.bannerUrl && <span className="ml-2 text-green-500">✔</span>}
            {saveError.bannerUrl && <span className="ml-2 text-red-500">{saveError.bannerUrl}</span>}
          </div>
          <ImageUpload
            value={localStorefront.bannerUrl}
            onChange={url => handleFieldChange('bannerUrl', url)}
          />
          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <Label>Theme</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Choose a color and style theme for your storefront">?</span>
            {saving.themeId && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.themeId && <span className="ml-2 text-green-500">✔</span>}
            {saveError.themeId && <span className="ml-2 text-red-500">{saveError.themeId}</span>}
          </div>
          <ThemeSelector
            currentThemeId={localStorefront.themeId || 'bubblegum-pop'}
            storefrontId={localStorefront.id || ''}
            onThemeChange={themeId => setLocalStorefront(ls => ls ? { ...ls, themeId } : ls)}
          />
          {/* Colors */}
          <div className="flex items-center gap-2">
            <Label>Primary Color</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Primary color for your storefront">?</span>
            {saving.primaryColor && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.primaryColor && <span className="ml-2 text-green-500">✔</span>}
            {saveError.primaryColor && <span className="ml-2 text-red-500">{saveError.primaryColor}</span>}
          </div>
          <Input
            id="primaryColor"
            value={localStorefront.primaryColor}
            onChange={e => handleFieldChange('primaryColor', e.target.value)}
            placeholder="#FF6D00"
          />
          <div className="flex items-center gap-2">
            <Label>Accent Color</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Accent color for your storefront">?</span>
            {saving.accentColor && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.accentColor && <span className="ml-2 text-green-500">✔</span>}
            {saveError.accentColor && <span className="ml-2 text-red-500">{saveError.accentColor}</span>}
          </div>
          <Input
            id="accentColor"
            value={localStorefront.accentColor}
            onChange={e => handleFieldChange('accentColor', e.target.value)}
            placeholder="#E85F00"
          />
          <div className="flex items-center gap-2">
            <Label>Background Color</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Background color for your storefront">?</span>
            {saving.backgroundColor && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.backgroundColor && <span className="ml-2 text-green-500">✔</span>}
            {saveError.backgroundColor && <span className="ml-2 text-red-500">{saveError.backgroundColor}</span>}
          </div>
          <Input
            id="backgroundColor"
            value={localStorefront.backgroundColor}
            onChange={e => handleFieldChange('backgroundColor', e.target.value)}
            placeholder="#FFFFFF"
          />
          <div className="flex items-center gap-2">
            <Label>Text Color</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Text color for your storefront">?</span>
            {saving.textColor && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.textColor && <span className="ml-2 text-green-500">✔</span>}
            {saveError.textColor && <span className="ml-2 text-red-500">{saveError.textColor}</span>}
          </div>
          <Input
            id="textColor"
            value={localStorefront.textColor}
            onChange={e => handleFieldChange('textColor', e.target.value)}
            placeholder="#1C1C2E"
          />
          <div className="flex items-center gap-2">
            <Label>Font Family</Label>
            <span className="ml-1 text-gray-400 cursor-pointer" title="Font family for your storefront">?</span>
            {saving.fontFamily && <span className="ml-2 animate-spin">⏳</span>}
            {saveSuccess.fontFamily && <span className="ml-2 text-green-500">✔</span>}
            {saveError.fontFamily && <span className="ml-2 text-red-500">{saveError.fontFamily}</span>}
          </div>
          <Input
            id="fontFamily"
            value={localStorefront.fontFamily || ''}
            onChange={e => handleFieldChange('fontFamily', e.target.value)}
            placeholder="e.g. Inter, Arial, sans-serif"
          />
        </form>
      </div>
      {/* Live Preview Panel */}
      <div className="w-full md:w-1/2 bg-gray-50 rounded-xl shadow-lg p-6">
        {localStorefront && (
          <>
            <StorefrontHeader storefront={localStorefront} user={{ name: "Preview" }} isOwner={true} />
            <StorefrontDescriptionCard description={localStorefront.description || ''} tags={[]} category="" />
            <main className="flex-1 container mx-auto px-4 py-8">
              <ProductGrid products={products as any[]} />
            </main>
          </>
        )}
      </div>
    </div>
  )
} 