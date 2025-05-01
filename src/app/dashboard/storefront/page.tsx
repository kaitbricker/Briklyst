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
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] space-y-8 p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">Storefront Customization</h1>
          <p className="text-gray-500">Edit your storefront&apos;s look, feel, and content</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6">
        <TabsList className="flex gap-4 mb-6">
          <TabsTrigger value="design" className="text-lg font-semibold text-gray-700">Design</TabsTrigger>
          <TabsTrigger value="products" className="text-lg font-semibold text-gray-700">Products</TabsTrigger>
          <TabsTrigger value="settings" className="text-lg font-semibold text-gray-700">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="design">
          <Card className="p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-md mb-8">
            <ThemeSelector
              currentThemeId={localStorefront?.themeId || 'bubblegum-pop'}
              storefrontId={localStorefront?.id || ''}
            />
          </Card>
          <Card className="p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-md">
            <StorefrontHeader storefront={storefront} user={{ name: 'You' }} isOwner={true} />
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <Card className="p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-md">
            <ProductGrid products={products.map(p => ({ ...p, tags: [] }))} />
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card className="p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Storefront Title</Label>
                <Input
                  id="title"
                  value={localStorefront?.title || ''}
                  onChange={e => setLocalStorefront({ ...localStorefront, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600">Save Settings</Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 