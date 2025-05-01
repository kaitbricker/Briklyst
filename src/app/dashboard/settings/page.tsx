'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useStorefront } from '@/hooks/useStorefront'
import { StorefrontForm } from '@/components/forms/StorefrontForm'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, X, Edit2, Save, Trash } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

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
}

const SettingsPage: React.FC = () => {
  const router = useRouter()
  const { storefront, isLoading, error } = useStorefront()
  const [isCreating, setIsCreating] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [newCollection, setNewCollection] = useState({ name: '', description: '' })
  const [editingCollection, setEditingCollection] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast: useToastToast } = useToast()

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

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections')
        if (!response.ok) throw new Error('Failed to fetch collections')
        const data = await response.json()
        setCollections(data)
      } catch (error) {
        console.error('Error fetching collections:', error)
        useToastToast({
          title: 'Error',
          description: 'Failed to load collections',
          variant: 'destructive',
        })
      }
    }
    fetchCollections()
  }, [])

  const handleAddCollection = async () => {
    if (!newCollection.name.trim()) return
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCollection.name,
          description: newCollection.description,
        }),
      })
      if (!res.ok) throw new Error('Failed to add collection')
      setNewCollection({ name: '', description: '' })
      useToastToast({
        title: 'Success',
        description: 'Collection added successfully',
      })
      const data = await res.json()
      setCollections([...collections, data])
    } catch (error) {
      console.error('Error adding collection:', error)
      useToastToast({
        title: 'Error',
        description: 'Failed to add collection',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateCollection = async (collection: Collection) => {
    try {
      const res = await fetch(`/api/collections/${collection.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
      })
      if (!res.ok) throw new Error('Failed to update collection')
      setEditingCollection(null)
      useToastToast({
        title: 'Success',
        description: 'Collection updated successfully',
      })
      const data = await res.json()
      setCollections(collections.map(c => c.id === data.id ? data : c))
    } catch (error) {
      console.error('Error updating collection:', error)
      useToastToast({
        title: 'Error',
        description: 'Failed to update collection',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteCollection = async (id: string) => {
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete collection')
      useToastToast({
        title: 'Success',
        description: 'Collection deleted successfully',
      })
      setCollections(collections.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting collection:', error)
      useToastToast({
        title: 'Error',
        description: 'Failed to delete collection',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="min-h-[60vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Briklyst</h1>
            <p className="text-lg text-gray-600 mb-8">
              Let&apos;s get your storefront set up. This will only take a moment.
            </p>
            <Button
              onClick={handleCreateStorefront}
              disabled={isCreating}
              className="inline-flex items-center px-6 py-3"
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your storefront...
                </>
              ) : (
                'Create My Storefront'
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Collections</h2>
        <p className="text-muted-foreground">
          Organize your products into collections
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Collection name"
            value={newCollection.name}
            onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
          />
          <Input
            placeholder="Description (optional)"
            value={newCollection.description}
            onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
          />
          <Button onClick={handleAddCollection}>Add Collection</Button>
        </div>

        <div className="space-y-2">
          {collections.map((collection) => (
            <div key={collection.id} className="flex items-center gap-4 p-4 border rounded-lg">
              {editingCollection === collection.id ? (
                <>
                  <Input
                    value={collection.name}
                    onChange={(e) => setCollections(collections.map(c => 
                      c.id === collection.id ? { ...c, name: e.target.value } : c
                    ))}
                  />
                  <Input
                    value={collection.description || ''}
                    onChange={(e) => setCollections(collections.map(c => 
                      c.id === collection.id ? { ...c, description: e.target.value } : c
                    ))}
                  />
                  <Button onClick={() => handleUpdateCollection(collection)}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingCollection(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="font-medium">{collection.name}</h3>
                    {collection.description && (
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                    )}
                  </div>
                  <Button variant="outline" onClick={() => setEditingCollection(collection.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteCollection(collection.id)}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage 