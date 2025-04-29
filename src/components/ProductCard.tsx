'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  title: string
  description?: string
  image?: string
  link: string
  onClick: () => void
}

export function ProductCard({
  title,
  description,
  image,
  link,
  onClick,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        {image && (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        {description && (
          <p className="mt-4 text-sm text-gray-600">{description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onClick}
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Product
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
} 