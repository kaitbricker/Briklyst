'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { Loader2, Settings2, Plus, X, Edit2, Save, Trash, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'

interface Storefront {
  id: string
  title: string
  description: string | null
  logoUrl: string | null
  bannerUrl: string | null
  primaryColor: string | null
  accentColor: string | null
  backgroundColor: string | null
  textColor: string | null
  fontFamily: string | null
}

interface Collection {
  id: string
  name: string
  description?: string
  tags: string[]
}

const SettingsPage: React.FC = () => {
  const router = useRouter()
  const { storefront, isLoading, error } = useStorefront()
  const [isCreating, setIsCreating] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [newCollection, setNewCollection] = useState({ name: '', description: '', tags: [] as string[] })
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections')
      if (!response.ok) {
        throw new Error('Failed to fetch collections')
      }
      const data = await response.json()
      setCollections(data)
    } catch (error) {
      console.error('Error fetching collections:', error)
      toast({
        title: 'Error',
        description: 'Failed to load collections. Please try again.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const handleCreateStorefront = async () => {
    try {
      setIsCreating(true)
      const response = await fetch('/api/storefronts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'My Storefront',
          description: 'Welcome to my storefront',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create storefront')
      }

      const data = await response.json()
      toast({
        title: 'Success',
        description: 'Your storefront has been created!',
      })
      router.push('/dashboard/storefront')
    } catch (error) {
      console.error('Error creating storefront:', error)
      toast({
        title: 'Error',
        description: 'Failed to create storefront. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddCollection = async () => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCollection),
      })

      if (!response.ok) throw new Error('Failed to add collection')

      toast({
        title: 'Success',
        description: 'Collection added successfully',
      })
      setNewCollection({ name: '', description: '', tags: [] })
      fetchCollections()
    } catch (error) {
      console.error('Error adding collection:', error)
      toast({
        title: 'Error',
        description: 'Failed to add collection',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateCollection = async () => {
    if (!editingCollection) return

    try {
      const response = await fetch('/api/collections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCollection),
      })

      if (!response.ok) throw new Error('Failed to update collection')

      toast({
        title: 'Success',
        description: 'Collection updated successfully',
      })
      setEditingCollection(null)
      fetchCollections()
    } catch (error) {
      console.error('Error updating collection:', error)
      toast({
        title: 'Error',
        description: 'Failed to update collection',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return

    try {
      const response = await fetch(`/api/collections?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete collection')

      toast({
        title: 'Success',
        description: 'Collection deleted successfully',
      })
      fetchCollections()
    } catch (error) {
      console.error('Error deleting collection:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete collection',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        />
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-4"
      >
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </motion.div>
    )
  }

  if (!storefront) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-4"
      >
        <h2 className="text-2xl font-bold mb-4">Create Your Storefront</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Get started by creating your storefront. You can customize it later.
        </p>
        <Button 
          onClick={handleCreateStorefront}
          disabled={isCreating}
          className="flex items-center gap-2"
        >
          {isCreating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Create Storefront
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#1C1C2E]">Settings</h1>
          <p className="text-[#5F5F73]">Customize your storefront appearance and collections</p>
        </div>
        <Button className="flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          Save Changes
        </Button>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Storefront Details</CardTitle>
            </CardHeader>
            <CardContent>
              <StorefrontForm defaultValues={storefront} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Collections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Collection name"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddCollection}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {collections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Card className="group bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
                            <h3 className="font-medium text-[#1C1C2E] group-hover:text-[#2D2D44] transition-colors">
                              {collection.name}
                            </h3>
                            {collection.description && (
                              <p className="text-sm text-[#5F5F73]">{collection.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-[#1C1C2E]/5 rounded-lg transition-colors"
                              onClick={() => setEditingCollection(collection)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-500/5 text-red-500 rounded-lg transition-colors"
                              onClick={() => handleDeleteCollection(collection.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage 