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
import { Plus, Settings, Layout, Globe, Palette, Tag, Filter, Flame, ShoppingBag, Info, Folder } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSelector from '@/components/dashboard/ThemeSelector'
import StorefrontHeader from '@/components/storefront/StorefrontHeader'
import StorefrontDescriptionCard from '@/components/storefront/StorefrontDescriptionCard'
import ProductGrid from '@/components/storefront/ProductGrid'
import Link from 'next/link'
import { ImageUpload } from '@/components/ui/image-upload'
import { useStorefrontUpdate } from '@/context/StorefrontUpdateContext'
import StorefrontPreview from '@/components/storefront/StorefrontPreview'
import { themes } from '@/lib/themes'

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
  tags?: string[]
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
  tagline?: string
}

interface Collection {
  id: string
  name: string
  description?: string
  tags: string[]
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
  const [collections, setCollections] = useState<Collection[]>([])
  const [newCollection, setNewCollection] = useState<{ name: string; description: string; tags: string[] }>({ name: '', description: '', tags: [] })
  const { triggerUpdate } = useStorefrontUpdate()

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefronts')
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
        const response = await fetch('/api/collections')
        if (!response.ok) throw new Error('Failed to fetch collections')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch collections:', error)
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
    triggerUpdate()
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
    if (!localStorefront) return;
    
    // Update local state immediately for instant preview
    setLocalStorefront({ ...localStorefront, [field]: value });
    
    // Show saving state
    setSaving((prev) => ({ ...prev, [field]: true }));
    setSaveSuccess((prev) => ({ ...prev, [field]: false }));
    setSaveError((prev) => ({ ...prev, [field]: '' }));

    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...localStorefront, [field]: value }),
      });

      if (!response.ok) throw new Error('Failed to save');

      // Update success state
      setSaving((prev) => ({ ...prev, [field]: false }));
      setSaveSuccess((prev) => ({ ...prev, [field]: true }));
      
      // Trigger preview update
      triggerUpdate();

      // Clear success state after delay
      setTimeout(() => setSaveSuccess((prev) => ({ ...prev, [field]: false })), 1500);
    } catch (err: any) {
      setSaving((prev) => ({ ...prev, [field]: false }));
      setSaveError((prev) => ({ ...prev, [field]: err.message || 'Save failed' }));
      
      // Revert local state on error
      setLocalStorefront(localStorefront);
    }
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    toast({
      title: 'Success',
      description: 'Product updated successfully',
    })
    triggerUpdate()
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId))
    toast({
      title: 'Success',
      description: 'Product deleted successfully',
    })
    triggerUpdate()
  }

  // Check for live drop
  const hasLiveDrop = products.some(p => p.tags?.some(tag => tag.toLowerCase().includes('drop')));
  const bannerColor = 'bg-gradient-to-r from-orange-400 to-pink-500';
  const liveDropText = hasLiveDrop ? '🔥 Live Drop Happening Now!' : '';

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Customization Form */}
        <div className="space-y-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
            <TabsList className="flex gap-6 mb-8 border-b pb-2">
              <TabsTrigger value="design" className="text-lg font-semibold flex items-center gap-2 text-gray-700"><Palette className="w-5 h-5" /> Design & Theme</TabsTrigger>
              <TabsTrigger value="products" className="text-lg font-semibold flex items-center gap-2 text-gray-700"><ShoppingBag className="w-5 h-5" /> Products</TabsTrigger>
              <TabsTrigger value="details" className="text-lg font-semibold flex items-center gap-2 text-gray-700"><Info className="w-5 h-5" /> Storefront Details</TabsTrigger>
              <TabsTrigger value="collections" className="text-lg font-semibold flex items-center gap-2 text-gray-700"><Folder className="w-5 h-5" /> Collections</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              <Card className="p-8 rounded-2xl bg-white/90 shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">Theme & Colors</h3>
                <ThemeSelector
                  currentThemeId={localStorefront?.themeId || 'bubblegum-pop'}
                  onThemeChange={themeId => {
                    const theme = themes.find(t => t.id === themeId);
                    if (!theme || !localStorefront) return;
                    setLocalStorefront({
                      ...localStorefront,
                      themeId: theme.id,
                      primaryColor: theme.primaryColor,
                      accentColor: theme.accentColor,
                      backgroundColor: theme.backgroundColor,
                      textColor: theme.textColor,
                      fontFamily: JSON.stringify(theme.fontFamily),
                    });
                  }}
                />
              </Card>
            </TabsContent>
            <TabsContent value="products">
              <Card className="p-8 rounded-2xl bg-white/90 shadow-md">
                <h3 className="text-xl font-bold mb-4">Manage Products</h3>
                <ProductGrid products={products.map(p => ({ ...p, tags: [] }))} />
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card className="p-8 rounded-2xl bg-white/90 shadow-md">
                <h3 className="text-xl font-bold mb-4">Storefront Details</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="title">Storefront Title</Label>
                    <Input
                      id="title"
                      value={localStorefront?.title || ''}
                      onChange={e => setLocalStorefront({ ...localStorefront, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={localStorefront?.description || ''}
                      onChange={e => setLocalStorefront({ ...localStorefront, description: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={localStorefront?.tagline || ''}
                      onChange={e => setLocalStorefront({ ...localStorefront, tagline: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600 text-lg py-3 rounded-xl sticky bottom-0">Save Changes</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="collections">
              <Card className="p-8 rounded-2xl bg-white/90 shadow-md">
                <h3 className="text-xl font-bold mb-4">Collections</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">Your Collections</h4>
                    <Button 
                      onClick={() => setNewCollection({ name: '', description: '', tags: [] })}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Collection
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {collections.map((collection) => (
                      <div key={collection.id} className="p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-medium">{collection.name}</h4>
                        {collection.description && (
                          <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="sticky top-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="relative">
              <StorefrontPreview storefront={localStorefront} isEditing={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 