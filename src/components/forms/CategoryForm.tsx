'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  initialData?: {
    id?: string
    name: string
    description?: string
  }
  onSuccess?: () => void
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
  })

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/categories', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          id: initialData?.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save category')
      }

      toast({
        title: 'Success',
        description: `Category ${initialData?.id ? 'updated' : 'created'} successfully`,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast({
        title: 'Error',
        description: 'Failed to save category',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : initialData?.id ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  )
} 