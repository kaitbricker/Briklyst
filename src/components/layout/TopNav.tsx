'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Plus, Search, Store, User, Settings, Mail, CreditCard, HelpCircle, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { gradients, colors } from '@/lib/colors'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ProductForm } from '@/components/forms/ProductForm'

export function TopNav() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const { toast } = useToast()

  const handleAddProduct = async (data: {
    title: string
    description: string
    price: number
    imageUrl: string
    affiliateUrl: string
    collectionId?: string
  }) => {
    try {
      // First, fetch the user's storefront
      const storefrontResponse = await fetch('/api/storefronts?userId=current')
      if (!storefrontResponse.ok) {
        throw new Error('Failed to fetch storefront')
      }
      const storefront = await storefrontResponse.json()
      
      if (!storefront?.id) {
        throw new Error('No storefront found')
      }

      // Then create the product
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          storefrontId: storefront.id
        }),
      })

      if (!response.ok) throw new Error('Failed to add product')

      toast({
        title: 'Success',
        description: 'Product added successfully',
      })
      setIsAddProductOpen(false)
    } catch (error) {
      console.error('Error adding product:', error)
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.nav 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/briklyst-logo.png" alt="Briklyst Logo" width={110} height={44} className="h-11 w-auto" priority />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* My Storefront Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                  <Store className="w-4 h-4 mr-2" />
                  My Storefront
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Storefront Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/storefront" className="flex items-center w-full">
                    <Store className="w-4 h-4 mr-2" />
                    Edit Storefront
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/preview" className="flex items-center w-full" target="_blank">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Storefront
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" className="text-gray-500 hover:text-gray-900 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Add Product Button */}
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <ProductForm onSubmit={handleAddProduct} />
              </DialogContent>
            </Dialog>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Image
                    src="/placeholder-avatar.jpg"
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/settings/profile" className="flex items-center w-full">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings/email" className="flex items-center w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Lists
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings/billing" className="flex items-center w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/help" className="flex items-center w-full">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 