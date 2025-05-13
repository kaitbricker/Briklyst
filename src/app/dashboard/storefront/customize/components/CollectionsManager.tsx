'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Collection {
  id: string
  name: string
  products: string[]
}

interface CollectionsManagerProps {
  collections: any[]
  onUpdateCollections: (collections: any[]) => void
}

export default function CollectionsManager({ collections, onUpdateCollections }: CollectionsManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  const handleAddCollection = async () => {
    if (!newCollectionName.trim()) {
      toast({
        title: 'Error',
        description: 'Collection name cannot be empty',
        variant: 'destructive',
      })
      return
    }

    try {
      const newCollection = {
        id: crypto.randomUUID(),
        name: newCollectionName.trim(),
        products: [],
      }
      onUpdateCollections([...collections, newCollection])
      setIsAddDialogOpen(false)
      setNewCollectionName('')
      toast({
        title: 'Success',
        description: 'Collection added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add collection',
        variant: 'destructive',
      })
    }
  }

  const handleEditCollection = async () => {
    if (!selectedCollection || !newCollectionName.trim()) {
      toast({
        title: 'Error',
        description: 'Collection name cannot be empty',
        variant: 'destructive',
      })
      return
    }

    try {
      const updatedCollections = collections.map(collection =>
        collection.id === selectedCollection.id
          ? { ...collection, name: newCollectionName.trim() }
          : collection
      )
      onUpdateCollections(updatedCollections)
      setIsEditDialogOpen(false)
      setSelectedCollection(null)
      setNewCollectionName('')
      toast({
        title: 'Success',
        description: 'Collection updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update collection',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteCollection = async (collectionId: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return

    try {
      const updatedCollections = collections.filter(collection => collection.id !== collectionId)
      onUpdateCollections(updatedCollections)
      toast({
        title: 'Success',
        description: 'Collection deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete collection',
        variant: 'destructive',
      })
    }
  }

  const handleAddProductToCollection = async (collectionId: string, productId: string) => {
    try {
      const updatedCollections = collections.map(collection =>
        collection.id === collectionId
          ? { ...collection, products: [...collection.products, productId] }
          : collection
      )
      onUpdateCollections(updatedCollections)
      toast({
        title: 'Success',
        description: 'Product added to collection',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add product to collection',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveProductFromCollection = async (collectionId: string, productId: string) => {
    try {
      const updatedCollections = collections.map(collection =>
        collection.id === collectionId
          ? { ...collection, products: collection.products.filter(id => id !== productId) }
          : collection
      )
      onUpdateCollections(updatedCollections)
      toast({
        title: 'Success',
        description: 'Product removed from collection',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove product from collection',
        variant: 'destructive',
      })
    }
  }

  const filteredProducts = collections.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Collections</h2>
          <p className="text-muted-foreground">Manage your product collections</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Collection</DialogTitle>
              <DialogDescription>
                Create a new collection to organize your products.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <Button onClick={handleAddCollection} className="w-full">
                Create Collection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{collection.name}</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCollection(collection)
                        setNewCollectionName(collection.name)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteCollection(collection.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {collection.products.map((productId) => {
                      const product = collections.find(p => p.id === productId)
                      if (!product) return null
                      return (
                        <Badge
                          key={productId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {product.title}
                          <button
                            onClick={() => handleRemoveProductFromCollection(collection.id, productId)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Add Products</h4>
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-2"
                    />
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        {filteredProducts
                          .filter(product => !collection.products.includes(product.id))
                          .map(product => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                            >
                              <span className="text-sm">{product.title}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAddProductToCollection(collection.id, product.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
            <DialogDescription>
              Update the name of your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <Button onClick={handleEditCollection} className="w-full">
              Update Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 