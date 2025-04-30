'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function VerifyEmailPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setError('No verification token provided')
      setLoading(false)
      return
    }

    async function verifyEmail() {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed')
        }

        toast({
          title: 'Email verified successfully',
          description: 'You can now sign in to your account.',
        })

        router.push('/auth/sign-in')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed')
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [searchParams, router, toast])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
          <p className="text-gray-600">Please wait while we verify your email address.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.push('/auth/sign-in')}>
            Return to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return null
} 