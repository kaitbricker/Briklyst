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
import { Plus, Settings, Layout, Globe, Palette } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
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
}

export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('design')

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
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setError('Failed to fetch products')
      }
    }
    fetchProducts()
    fetchStorefront()
  }, [toast])

  const handleAddProduct = (data: {
    title: string
    description: string
    price: number
    imageUrl: string
    affiliateUrl: string
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
    if (!storefront) return

    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storefront),
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

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1C2E] mx-auto"></div>
          <p className="mt-4 text-[#5F5F73]">Loading your storefront...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    )
  }

  if (!storefront) return null

  return (
    <div className={`min-h-screen ${gradients.primary} p-8`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1C1C2E]">Storefront Customization</h1>
            <p className="text-[#5F5F73] mt-2">Customize your storefront&apos;s appearance and manage your products</p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1C1C2E] hover:bg-[#2D2D44] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                onSubmit={(data) => {
                  handleAddProduct({
                    title: data.title,
                    description: data.description || '',
                    price: 0,
                    imageUrl: data.image || '',
                    affiliateUrl: data.link,
                  })
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full border-b bg-gray-50 p-0">
              <TabsTrigger
                value="design"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:text-[#1C1C2E] data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C2E]"
              >
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger
                value="layout"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:text-[#1C1C2E] data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C2E]"
              >
                <Layout className="w-4 h-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:text-[#1C1C2E] data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C2E]"
              >
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#1C1C2E] font-medium">Storefront Title</Label>
                    <Input
                      id="title"
                      value={storefront.title}
                      onChange={(e) => setStorefront({ ...storefront, title: e.target.value })}
                      className="border-[#E5E7EB] focus:border-[#1C1C2E] focus:ring-[#1C1C2E]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain" className="text-[#1C1C2E] font-medium">
                      Custom Domain
                      <span className="text-[#5F5F73] ml-2 text-sm">(optional)</span>
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F5F73]" />
                      <Input
                        id="domain"
                        value={storefront.domain || ''}
                        onChange={(e) => setStorefront({ ...storefront, domain: e.target.value })}
                        className="pl-10 border-[#E5E7EB] focus:border-[#1C1C2E] focus:ring-[#1C1C2E]"
                        placeholder="your-store.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#1C1C2E] font-medium">Description</Label>
                  <Textarea
                    id="description"
                    value={storefront.description || ''}
                    onChange={(e) => setStorefront({ ...storefront, description: e.target.value })}
                    className="min-h-[100px] border-[#E5E7EB] focus:border-[#1C1C2E] focus:ring-[#1C1C2E]"
                    placeholder="Describe your storefront..."
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[#1C1C2E] font-medium">Primary Color</Label>
                    <ColorPicker
                      color={storefront.primaryColor}
                      onChange={(color) => setStorefront({ ...storefront, primaryColor: color })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1C1C2E] font-medium">Accent Color</Label>
                    <ColorPicker
                      color={storefront.accentColor}
                      onChange={(color) => setStorefront({ ...storefront, accentColor: color })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#1C1C2E] hover:bg-[#2D2D44] text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="layout" className="p-6">
              {/* Layout settings content */}
              <div className="text-[#5F5F73]">Layout customization coming soon...</div>
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              {/* Additional settings content */}
              <div className="text-[#5F5F73]">Additional settings coming soon...</div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1C2E]">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 