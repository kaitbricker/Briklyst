import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found</p>
      <p className="mt-2 text-sm text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-8">
        <Button>Go back home</Button>
      </Link>
    </div>
  )
} 