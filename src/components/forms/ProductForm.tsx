'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface Collection {
  id: string
  name: string
}

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  imageUrl: z.string().url('Must be a valid URL').optional(),
  affiliateUrl: z.string().url('Must be a valid URL'),
  collectionId: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: {
    id?: string
    title: string
    description?: string
    price: number
    imageUrl?: string
    affiliateUrl: string
    collectionId?: string
    tags?: string[]
  }
  onSuccess?: () => void
  onSubmit?: (data: ProductFormData) => void
}

export function ProductForm({ initialData, onSuccess, onSubmit }: ProductFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      imageUrl: initialData?.imageUrl || '',
      affiliateUrl: initialData?.affiliateUrl || '',
      collectionId: initialData?.collectionId || '',
      tags: initialData?.tags || [],
    },
  })

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections')
      if (!response.ok) throw new Error('Failed to fetch collections')
      const data = await response.json()
      setCollections(data)
    } catch (error) {
      console.error('Error fetching collections:', error)
      toast({
        title: 'Error',
        description: 'Failed to load collections',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload image to your storage service
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload image')
      
      const { url } = await response.json()
      setValue('imageUrl', url)
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    }
  }

  const onSubmitForm = async (data: ProductFormData) => {
    if (onSubmit) {
      onSubmit(data)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          id: initialData?.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      toast({
        title: 'Success',
        description: `Product ${initialData?.id ? 'updated' : 'created'} successfully`,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving product:', error)
      toast({
        title: 'Error',
        description: 'Failed to save product',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          {...register('description')}
          className={errors.description ? 'border-red-500' : ''}
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className={errors.price ? 'border-red-500' : ''}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="mt-2">
          {imagePreview && (
            <div className="relative w-full h-48">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>
        {errors.imageUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="affiliateUrl">Affiliate URL</Label>
        <Input
          id="affiliateUrl"
          {...register('affiliateUrl')}
          className={errors.affiliateUrl ? 'border-red-500' : ''}
        />
        {errors.affiliateUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.affiliateUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="collectionId">Collection (Optional)</Label>
        <Select
          onValueChange={(value) => setValue('collectionId', value)}
          defaultValue={initialData?.collectionId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {collections.map((collection) => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tags">Tags (Optional)</Label>
        <Input
          id="tags"
          placeholder="Enter tags separated by commas"
          onChange={(e) => {
            const tags = e.target.value.split(',').map(tag => tag.trim())
            setValue('tags', tags)
          }}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : initialData?.id ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  )
} 