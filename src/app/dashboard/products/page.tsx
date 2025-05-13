'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { Pencil, Trash2, Plus, Search, Filter, ArrowUpRight, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageUpload } from '@/components/ui/image-upload'
import BulkImportProducts from '@/components/BulkImportProducts'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
  tags?: string[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast({
          title: 'Error',
          description: 'Failed to load products. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  const handleAddProduct = async (product: Omit<Product, 'id' | 'clicks'>) => {
    try {
      // Fetch the current user's storefront
      const storefrontRes = await fetch('/api/storefronts?userId=current');
      if (!storefrontRes.ok) throw new Error('Failed to fetch storefront');
      const storefront = await storefrontRes.json();
      if (!storefront?.id) throw new Error('No storefront found');

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, storefrontId: storefront.id }),
      })

      if (!response.ok) throw new Error('Failed to add product')

      toast({
        title: 'Success',
        description: 'Product added successfully',
      })
      setIsAddProductOpen(false)
      // Refresh products
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      })
    }
  }

  const handleEditProduct = async (data: Omit<Product, 'id' | 'clicks'>) => {
    if (!selectedProduct) return
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedProduct.id,
          ...data,
        }),
      })

      if (!response.ok) throw new Error('Failed to update product')

      toast({
        title: 'Success',
        description: 'Product updated successfully',
      })
      setIsEditProductOpen(false)
      // Refresh products
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete product')

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      })
      // Refresh products
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      })
    }
  }

  // Add bulk submit handler
  const handleBulkSubmit = async (bulkProducts) => {
    try {
      const response = await fetch('/api/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: bulkProducts }),
      });
      if (!response.ok) throw new Error('Bulk import failed');
      toast({ title: 'Success', description: 'Products imported successfully!' });
      // Refresh products
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      toast({ title: 'Error', description: 'Bulk import failed', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] space-y-8 p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F8CFF] to-[#A259E6]">Product Management</h1>
          <p className="text-gray-500">Add, edit, and manage your products</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-[#4F8CFF] to-[#A259E6] text-white shadow-md hover:from-[#3a6fd8] hover:to-[#7d3fc7] hover:shadow-lg transition-all duration-300">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100/50">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
          <BulkImportProducts onBulkSubmit={handleBulkSubmit} />
        </div>
      </motion.div>

      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              {product.imageUrl && (
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    onError={e => { e.currentTarget.src = '/placeholder-product.jpg'; }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-orange-600">
                    ${product.price}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {product.clicks} clicks
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-orange-100 rounded-lg transition-colors"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsEditProductOpen(true)
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              onSubmit={handleEditProduct}
              defaultValues={selectedProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProductForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: Omit<Product, 'id' | 'clicks'>) => void
  defaultValues?: Product
}) {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [price, setPrice] = useState(defaultValues?.price || 0)
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl || '')
  const [affiliateUrl, setAffiliateUrl] = useState(defaultValues?.affiliateUrl || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      price,
      imageUrl,
      affiliateUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Product Image</Label>
        <div className="space-y-2">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL or upload above"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="affiliateUrl">Affiliate URL</Label>
        <Input
          id="affiliateUrl"
          type="url"
          value={affiliateUrl}
          onChange={(e) => setAffiliateUrl(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full flex items-center justify-center gap-2">
        {defaultValues ? (
          <>
            <Pencil className="w-4 h-4" />
            Update Product
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Product
          </>
        )}
      </Button>
    </form>
  )
} 