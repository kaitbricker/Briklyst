'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  link: z.string().url('Must be a valid URL'),
  image: z.string().url('Must be a valid URL').optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  defaultValues?: Partial<ProductFormData>
}

export function ProductForm({ onSubmit, defaultValues }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="link">Product Link</Label>
        <Input
          id="link"
          type="url"
          {...register('link')}
        />
        {errors.link && (
          <p className="text-sm text-red-500">{errors.link.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input
          id="image"
          type="url"
          {...register('image')}
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {defaultValues ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  )
} 