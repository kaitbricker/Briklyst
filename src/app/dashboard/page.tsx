'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [storefront, setStorefront] = useState<{ id: string } | null>(null)

  useEffect(() => {
    // Fetch user data
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
          // Fetch storefront data
          const storefrontResponse = await fetch(`/api/storefronts?userId=${data.user.id}`)
          const storefrontData = await storefrontResponse.json()
          if (storefrontData) {
            setStorefront(storefrontData)
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    fetchUser()
  }, [])

  const fetchProducts = useCallback(async () => {
    if (!storefront?.id) return
    try {
      const response = await fetch(`/api/products?storefrontId=${storefront.id}`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setProducts(data)
      } else if (Array.isArray(data.products)) {
        setProducts(data.products)
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setError('Failed to fetch products')
      setProducts([])
    }
  }, [storefront?.id])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user?.id || !storefront?.id) {
      setError('User or storefront not found')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const product = {
      userId: user.id,
      storefrontId: storefront.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      imageUrl: formData.get('imageUrl') as string,
      affiliateUrl: formData.get('affiliateUrl') as string,
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create product')
      }

      toast({
        title: 'Success',
        description: 'Product created successfully',
      })
      fetchProducts()
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      })
      fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Button onClick={() => setEditingProduct(null)}>Add Product</Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={editingProduct?.title}
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={editingProduct?.price}
              autoComplete="off"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={editingProduct?.description}
              autoComplete="off"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={editingProduct?.imageUrl}
              autoComplete="off"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="affiliateUrl">Affiliate URL</Label>
            <Input
              id="affiliateUrl"
              name="affiliateUrl"
              type="url"
              required
              defaultValue={editingProduct?.affiliateUrl}
              autoComplete="off"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(products) && products.map((product) => (
          <Card key={product.id} className="p-4">
            {product.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-medium">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{product.description}</p>
            <p className="mt-2 font-medium">${product.price}</p>
            <p className="mt-1 text-sm text-gray-500">
              Clicks: {product.clicks}
            </p>
            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 