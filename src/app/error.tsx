'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="mt-4 text-lg text-gray-600">
        {error.message || 'An unexpected error occurred'}
      </p>
      <div className="mt-8 flex space-x-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/">
          <Button variant="outline">Go back home</Button>
        </Link>
      </div>
    </div>
  )
} 