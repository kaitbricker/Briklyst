'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { ProductForm } from '@/components/forms/ProductForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ColorPicker } from '@/components/ui/color-picker'

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
  const router = useRouter()
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setError('Failed to fetch products')
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchStorefront()
  }, [fetchProducts])

  const fetchStorefront = async () => {
    try {
      const response = await fetch('/api/storefronts?userId=current')
      if (!response.ok) throw new Error('Failed to fetch storefront')
      const data = await response.json()
      setStorefront(data)
    } catch (err) {
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
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update storefront settings',
        variant: 'destructive',
      })
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!storefront) return <div>No storefront found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Storefront Title</Label>
            <Input
              id="title"
              value={storefront.title}
              onChange={(e) =>
                setStorefront({ ...storefront, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Custom Domain (optional)</Label>
            <Input
              id="domain"
              value={storefront.domain || ''}
              onChange={(e) =>
                setStorefront({ ...storefront, domain: e.target.value })
              }
              placeholder="your-store.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={storefront.description || ''}
            onChange={(e) =>
              setStorefront({ ...storefront, description: e.target.value })
            }
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              type="url"
              value={storefront.logoUrl || ''}
              onChange={(e) =>
                setStorefront({ ...storefront, logoUrl: e.target.value })
              }
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bannerUrl">Banner URL</Label>
            <Input
              id="bannerUrl"
              type="url"
              value={storefront.bannerUrl || ''}
              onChange={(e) =>
                setStorefront({ ...storefront, bannerUrl: e.target.value })
              }
              placeholder="https://example.com/banner.png"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <ColorPicker
              color={storefront.primaryColor}
              onChange={(color) =>
                setStorefront({ ...storefront, primaryColor: color })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <ColorPicker
              color={storefront.accentColor}
              onChange={(color) =>
                setStorefront({ ...storefront, accentColor: color })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker
              color={storefront.backgroundColor}
              onChange={(color) =>
                setStorefront({ ...storefront, backgroundColor: color })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Text Color</Label>
            <ColorPicker
              color={storefront.textColor}
              onChange={(color) =>
                setStorefront({ ...storefront, textColor: color })
              }
            />
          </div>
        </div>

        {/* Font Family Selector */}
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <select
            id="fontFamily"
            className="w-full border rounded px-3 py-2"
            value={storefront.fontFamily || 'sans-serif'}
            onChange={e => setStorefront({ ...storefront, fontFamily: e.target.value })}
          >
            <option value="sans-serif">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
          </select>
        </div>

        {/* Layout Style Selector */}
        <div className="space-y-2">
          <Label htmlFor="layoutStyle">Layout Style</Label>
          <select
            id="layoutStyle"
            className="w-full border rounded px-3 py-2"
            value={storefront.layoutStyle || 'grid'}
            onChange={e => setStorefront({ ...storefront, layoutStyle: e.target.value })}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.imageUrl}
            link={product.affiliateUrl}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  )
} 