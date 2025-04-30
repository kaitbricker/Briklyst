'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/storefronts?userId=current')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError('Failed to load products')
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = async (product: Omit<Product, 'id' | 'clicks'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (!response.ok) throw new Error('Failed to add product')

      toast({
        title: 'Success',
        description: 'Product added successfully',
      })
      setIsAddProductOpen(false)
      fetchProducts()
    } catch (err) {
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
      fetchProducts()
    } catch (err) {
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
      fetchProducts()
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      })
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.clicks}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsEditProductOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
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

      <Button type="submit" className="w-full">
        {defaultValues ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  )
} 