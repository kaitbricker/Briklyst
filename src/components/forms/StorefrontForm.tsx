'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import { useToast } from '@/components/ui/use-toast'

const storefrontSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  logoUrl: z.string().url('Must be a valid URL').optional(),
  bannerUrl: z.string().url('Must be a valid URL').optional(),
  headerImageUrl: z.string().url('Must be a valid URL').optional(),
  tagline: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  fontFamily: z.string().optional(),
})

type StorefrontFormData = z.infer<typeof storefrontSchema>

interface StorefrontFormProps {
  defaultValues?: Partial<StorefrontFormData>
}

export function StorefrontForm({ defaultValues }: StorefrontFormProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StorefrontFormData>({
    resolver: zodResolver(storefrontSchema),
    defaultValues,
  })

  const logoUrl = watch('logoUrl')
  const bannerUrl = watch('bannerUrl')
  const headerImageUrl = watch('headerImageUrl')

  const onSubmit = async (data: StorefrontFormData) => {
    try {
      const response = await fetch('/api/storefronts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update storefront')
      }

      toast({
        title: 'Success',
        description: 'Storefront settings updated successfully',
      })
    } catch (error) {
      console.error('Update error:', error)
      toast({
        title: 'Error',
        description: 'Failed to update storefront settings',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Storefront Name</Label>
        <Input
          id="title"
          {...register('title')}
          className="w-full"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          className="w-full min-h-[100px]"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="max-w-[200px]">
          <ImageUpload
            value={logoUrl}
            onChange={(url) => setValue('logoUrl', url)}
          />
        </div>
        {errors.logoUrl && (
          <p className="text-sm text-red-500">{errors.logoUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Header Image</Label>
        <ImageUpload
          value={headerImageUrl}
          onChange={(url) => setValue('headerImageUrl', url)}
        />
        {errors.headerImageUrl && (
          <p className="text-sm text-red-500">{errors.headerImageUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          {...register('tagline')}
          className="w-full"
        />
        {errors.tagline && (
          <p className="text-sm text-red-500">{errors.tagline.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          id="instagram"
          {...register('instagram')}
          className="w-full"
        />
        {errors.instagram && (
          <p className="text-sm text-red-500">{errors.instagram.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          id="twitter"
          {...register('twitter')}
          className="w-full"
        />
        {errors.twitter && (
          <p className="text-sm text-red-500">{errors.twitter.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tiktok">TikTok</Label>
        <Input
          id="tiktok"
          {...register('tiktok')}
          className="w-full"
        />
        {errors.tiktok && (
          <p className="text-sm text-red-500">{errors.tiktok.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="youtube">YouTube</Label>
        <Input
          id="youtube"
          {...register('youtube')}
          className="w-full"
        />
        {errors.youtube && (
          <p className="text-sm text-red-500">{errors.youtube.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryColor">Primary Color</Label>
        <Input
          id="primaryColor"
          type="color"
          {...register('primaryColor')}
          className="h-10 w-full cursor-pointer"
        />
        {errors.primaryColor && (
          <p className="text-sm text-red-500">{errors.primaryColor.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accentColor">Accent Color</Label>
        <Input
          id="accentColor"
          type="color"
          {...register('accentColor')}
          className="h-10 w-full cursor-pointer"
        />
        {errors.accentColor && (
          <p className="text-sm text-red-500">{errors.accentColor.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          {...register('backgroundColor')}
          className="h-10 w-full cursor-pointer"
        />
        {errors.backgroundColor && (
          <p className="text-sm text-red-500">{errors.backgroundColor.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="textColor">Text Color</Label>
        <Input
          id="textColor"
          type="color"
          {...register('textColor')}
          className="h-10 w-full cursor-pointer"
        />
        {errors.textColor && (
          <p className="text-sm text-red-500">{errors.textColor.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <select
          id="fontFamily"
          className="w-full border rounded px-3 py-2"
          {...register('fontFamily')}
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Mono</option>
        </select>
        {errors.fontFamily && (
          <p className="text-sm text-red-500">{errors.fontFamily.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
} 