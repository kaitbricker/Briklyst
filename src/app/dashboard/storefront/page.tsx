'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { ProductForm } from '@/components/forms/ProductForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Temporary mock data - will be replaced with actual data from the database
const mockProducts = [
  {
    id: '1',
    title: 'Sample Product',
    description: 'This is a sample product description',
    link: 'https://example.com',
    image: 'https://via.placeholder.com/300',
    clicks: 0,
  },
]

export default function DashboardStorefront() {
  const [products, setProducts] = useState(mockProducts)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const handleAddProduct = (data: any) => {
    // TODO: Implement API call to add product
    setProducts([...products, { ...data, id: String(products.length + 1), clicks: 0 }])
    setIsAddProductOpen(false)
  }

  const handleProductClick = (productId: string) => {
    // TODO: Implement API call to track click
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, clicks: product.clicks + 1 }
        : product
    ))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Storefront</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            link={product.link}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  )
} 