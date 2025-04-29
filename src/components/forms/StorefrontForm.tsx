'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const storefrontSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  logo: z.string().url('Must be a valid URL').optional(),
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
})

type StorefrontFormData = z.infer<typeof storefrontSchema>

interface StorefrontFormProps {
  onSubmit: (data: StorefrontFormData) => void
  defaultValues?: Partial<StorefrontFormData>
}

export function StorefrontForm({ onSubmit, defaultValues }: StorefrontFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StorefrontFormData>({
    resolver: zodResolver(storefrontSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Storefront Name</Label>
        <Input
          id="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
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
        <Label htmlFor="logo">Logo URL (optional)</Label>
        <Input
          id="logo"
          type="url"
          {...register('logo')}
        />
        {errors.logo && (
          <p className="text-sm text-red-500">{errors.logo.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="primaryColor">Primary Color (optional)</Label>
        <Input
          id="primaryColor"
          type="color"
          {...register('primaryColor')}
        />
        {errors.primaryColor && (
          <p className="text-sm text-red-500">{errors.primaryColor.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="accentColor">Accent Color (optional)</Label>
        <Input
          id="accentColor"
          type="color"
          {...register('accentColor')}
        />
        {errors.accentColor && (
          <p className="text-sm text-red-500">{errors.accentColor.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  )
} 